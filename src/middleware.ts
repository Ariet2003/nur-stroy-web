import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyTokenEdge } from '@/lib/jwt-edge';

export async function middleware(request: NextRequest) {
  // Проверяем админские маршруты
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const adminToken = request.cookies.get('admin_token')?.value;
    
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Проверяем JWT токен с помощью Edge-совместимой функции
    const payload = await verifyTokenEdge(adminToken);
    if (!payload) {
      // Если токен недействителен, удаляем куки и перенаправляем
      const response = NextResponse.redirect(new URL('/admin', request.url));
      response.cookies.set('admin_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*']
};
