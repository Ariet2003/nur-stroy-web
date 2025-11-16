import { NextRequest, NextResponse } from 'next/server';
import { getPortfolios, createPortfolio } from '@/lib/db';
import { uploadMultipleToImgBB } from '@/lib/imgbb';
import { verifyToken } from '@/lib/jwt';

// Конфигурация для App Router в Next.js 16
export const maxDuration = 60; // Максимальное время выполнения функции (секунды)
export const dynamic = 'force-dynamic'; // Отключаем кеширование

// GET - получить все примеры работ
export async function GET() {
  try {
    const portfolios = await getPortfolios();

    return NextResponse.json({
      success: true,
      data: portfolios
    });
  } catch (error) {
    console.error('Ошибка получения портфолио:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка получения данных' },
      { status: 500 }
    );
  }
}

// POST - добавить новый пример работы
export async function POST(request: NextRequest) {
  try {
    // Проверяем аутентификацию
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Не авторизован' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Недействительный токен' },
        { status: 401 }
      );
    }

    const { title, description, images } = await request.json();

    // Валидация данных
    if (!title || !description || !images || !Array.isArray(images)) {
      return NextResponse.json(
        { success: false, message: 'Некорректные данные' },
        { status: 400 }
      );
    }

    if (images.length === 0 || images.length > 10) {
      return NextResponse.json(
        { success: false, message: 'Количество изображений должно быть от 1 до 10' },
        { status: 400 }
      );
    }

    // Загружаем изображения в ImgBB
    const imageUrls = await uploadMultipleToImgBB(images, title.replace(/\s+/g, '_'));

    if (imageUrls.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Не удалось загрузить изображения' },
        { status: 500 }
      );
    }

    // Сохраняем в базу данных
    const portfolio = await createPortfolio(title, description, imageUrls);

    return NextResponse.json({
      success: true,
      message: 'Пример работы успешно добавлен',
      data: portfolio
    });

  } catch (error) {
    console.error('Ошибка создания портфолио:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
