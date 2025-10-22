import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';
import { deleteMultipleFromImgBB } from '@/lib/imgbb';

// DELETE - удалить пример работы
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

    // Удаляем изображения из ImgBB
    if (existingPortfolio.images.length > 0) {
      try {
        await deleteMultipleFromImgBB(existingPortfolio.images);
      } catch (error) {
        console.error('Ошибка удаления изображений из ImgBB:', error);
        // Продолжаем удаление записи даже если не удалось удалить изображения
      }
    }

    // Удаляем запись из базы данных
    await prisma.portfolio.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Пример работы успешно удален'
    });

  } catch (error) {
    console.error('Ошибка удаления портфолио:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

// PUT - обновить пример работы
export async function PUT(
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
    const { title, description } = await request.json();

    // Валидация данных
    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: 'Некорректные данные' },
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

    // Обновляем запись
    const updatedPortfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        title,
        description
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Пример работы успешно обновлен',
      data: updatedPortfolio
    });

  } catch (error) {
    console.error('Ошибка обновления портфолио:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
