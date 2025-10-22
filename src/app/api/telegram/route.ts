import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, phone, service, message } = await request.json();

    // Валидация обязательных полей
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: 'Имя и телефон обязательны для заполнения' },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram credentials not found in environment variables');
      return NextResponse.json(
        { success: false, message: 'Ошибка конфигурации сервера' },
        { status: 500 }
      );
    }

    // Формируем сообщение для Telegram
    const telegramMessage = `
🏗️ *Новая заявка с сайта NUR STROY*

👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
${service ? `🔧 *Услуга:* ${service}` : ''}
${message ? `💬 *Сообщение:*\n${message}` : ''}

⏰ *Время:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Bishkek' })}
    `.trim();

    // Отправляем сообщение в Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    });

    const telegramData = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', telegramData);
      return NextResponse.json(
        { success: false, message: 'Ошибка отправки сообщения' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
    });

  } catch (error) {
    console.error('Error sending telegram message:', error);
    return NextResponse.json(
      { success: false, message: 'Произошла ошибка при отправке заявки' },
      { status: 500 }
    );
  }
}
