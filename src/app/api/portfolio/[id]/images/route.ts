import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';
import { deleteFromImgBB } from '@/lib/imgbb';

// DELETE - удалить изображение из портфолио
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, message: 'URL изображения не указан' },
        { status: 400 }
      );
    }

    // Проверяем существование записи
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id }
    });

    if (!existingPortfolio) {
      return NextResponse.json(
        { success: false, message: 'Пример работы не найден' },
        { status: 404 }
      );
    }

    // Проверяем, что изображение принадлежит этому портфолио
    if (!existingPortfolio.images.includes(imageUrl)) {
      return NextResponse.json(
        { success: false, message: 'Изображение не найдено в данной работе' },
        { status: 404 }
      );
    }

    // Проверяем, что не удаляем последнее изображение
    if (existingPortfolio.images.length <= 1) {
      return NextResponse.json(
        { success: false, message: 'Нельзя удалить последнее изображение. У работы должно быть минимум одно изображение.' },
        { status: 400 }
      );
    }

    // Удаляем изображение из ImgBB
    try {
      await deleteFromImgBB(imageUrl);
    } catch (error) {
      console.error('Ошибка удаления изображения из ImgBB:', error);
      // Продолжаем удаление из базы данных даже если не удалось удалить из ImgBB
    }

    // Обновляем запись, убирая изображение из массива
    const updatedImages = existingPortfolio.images.filter(img => img !== imageUrl);
    
    const updatedPortfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        images: updatedImages
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Изображение успешно удалено',
      data: updatedPortfolio
    });

  } catch (error) {
    console.error('Ошибка удаления изображения:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}


