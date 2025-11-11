// JWT утилиты для Edge Runtime (совместимые с Web Crypto API)

export interface JWTPayload {
  userId: string;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
  iss?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'nur-stroy-secret-key-2025';

/**
 * Кодирует строку в base64url
 */
function base64urlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Декодирует base64url строку
 */
function base64urlDecode(str: string): string {
  // Добавляем padding если нужно
  str += '='.repeat((4 - str.length % 4) % 4);
  // Заменяем URL-safe символы
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  return atob(str);
}

/**
 * Создает подпись для JWT используя Web Crypto API
 */
async function createSignature(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(JWT_SECRET);
  
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const signatureArray = new Uint8Array(signature);
  
  // Конвертируем в base64url
  let binary = '';
  for (let i = 0; i < signatureArray.length; i++) {
    binary += String.fromCharCode(signatureArray[i]);
  }
  
  return base64urlEncode(binary);
}

/**
 * Проверяет подпись JWT
 */
async function verifySignature(data: string, signature: string): Promise<boolean> {
  try {
    const expectedSignature = await createSignature(data);
    return expectedSignature === signature;
  } catch (error) {
    console.error('Signature verification failed:', error);
    return false;
  }
}

/**
 * Создает JWT токен (только для API routes, не для middleware)
 */
export async function createToken(payload: Omit<JWTPayload, 'iat' | 'exp' | 'iss'>): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const fullPayload: JWTPayload = {
    ...payload,
    iat: now,
    exp: now + (24 * 60 * 60), // 24 часа
    iss: 'nur-stroy-admin'
  };
  
  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(fullPayload));
  const data = `${encodedHeader}.${encodedPayload}`;
  
  const signature = await createSignature(data);
  
  return `${data}.${signature}`;
}

/**
 * Проверяет и декодирует JWT токен (совместимо с Edge Runtime)
 */
export async function verifyTokenEdge(token: string): Promise<JWTPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    const [encodedHeader, encodedPayload, signature] = parts;
    const data = `${encodedHeader}.${encodedPayload}`;
    
    // Проверяем подпись
    const isValidSignature = await verifySignature(data, signature);
    if (!isValidSignature) {
      return null;
    }
    
    // Декодируем payload
    const payloadJson = base64urlDecode(encodedPayload);
    const payload: JWTPayload = JSON.parse(payloadJson);
    
    // Проверяем истечение токена
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

/**
 * Декодирует токен без проверки подписи (для Edge Runtime)
 */
export function decodeTokenEdge(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    const [, encodedPayload] = parts;
    const payloadJson = base64urlDecode(encodedPayload);
    const payload: JWTPayload = JSON.parse(payloadJson);
    
    return payload;
  } catch (error) {
    console.error('JWT decode failed:', error);
    return null;
  }
}

