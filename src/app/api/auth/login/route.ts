import { NextRequest, NextResponse } from 'next/server';
import { createToken } from '@/lib/jwt-edge';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Простая проверка логина и пароля (в продакшене должна быть проверка в БД)
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'nurstroy2025';
    
    if (username === adminUsername && password === adminPassword) {
      // Создаем JWT токен
      const token = await createToken({
        userId: 'admin-001',
        username: 'admin',
        role: 'administrator'
      });

      // Создаем response с токеном в куки
      const response = NextResponse.json(
        { 
          success: true, 
          message: 'Успешная аутентификация',
          user: {
            username: 'admin',
            role: 'administrator'
          }
        },
        { status: 200 }
      );

      // Устанавливаем JWT токен в httpOnly куки
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60, // 24 часа
        path: '/'
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: 'Неверный логин или пароль' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
