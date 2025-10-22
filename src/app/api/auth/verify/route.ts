import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenEdge } from '@/lib/jwt-edge';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Токен не найден' },
        { status: 401 }
      );
    }

    const payload = await verifyTokenEdge(token);

    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Недействительный токен' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        user: {
          userId: payload.userId,
          username: payload.username,
          role: payload.role
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка проверки токена' },
      { status: 500 }
    );
  }
}
