import jwt from 'jsonwebtoken';

// Секретный ключ для подписи JWT (в продакшене должен быть в переменных окружения)
const JWT_SECRET = process.env.JWT_SECRET || 'nur-stroy-secret-key-2025';

export interface JWTPayload {
  userId: string;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Создает JWT токен
 */
export function createToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(
    payload,
    JWT_SECRET,
    { 
      expiresIn: '24h',
      issuer: 'nur-stroy-admin'
    }
  );
}

/**
 * Проверяет и декодирует JWT токен
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

/**
 * Декодирует токен без проверки (для получения информации из истекшего токена)
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('JWT decode failed:', error);
    return null;
  }
}

/**
 * Проверяет, истек ли токен
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  return Date.now() >= decoded.exp * 1000;
}
