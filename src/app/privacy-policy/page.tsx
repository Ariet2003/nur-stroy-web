'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Image src="/logo-bw.svg" alt="NUR STROY" width={32} height={32} className="h-8 w-auto mr-3" />
              <span className="text-2xl font-bold text-black">NUR STROY</span>
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              ← На главную
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Политика конфиденциальности
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Мы серьезно относимся к защите ваших персональных данных и соблюдаем все требования законодательства
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Последнее обновление: 22 октября 2025 г.
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Общие положения */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">1. Общие положения</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Настоящая Политика конфиденциальности определяет порядок обработки персональных данных 
                  пользователей веб-сайта NUR STROY (далее — «Сайт») и регулирует отношения между 
                  ОсОО «НУР СТРОЙ» (далее — «Компания») и пользователями Сайта.
                </p>
                <p>
                  Используя Сайт, вы соглашаетесь с условиями настоящей Политики конфиденциальности.
                </p>
              </div>
            </section>

            {/* Какие данные мы собираем */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">2. Какие данные мы собираем</h2>
              <div className="space-y-4 text-gray-700">
                <p>Мы можем собирать следующие категории персональных данных:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Контактная информация:</strong> имя, номер телефона</li>
                  <li><strong>Информация о проекте:</strong> описание услуг, требования к проекту, предпочтения</li>
                </ul>
              </div>
            </section>

            {/* Как мы используем данные */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">3. Как мы используем ваши данные</h2>
              <div className="space-y-4 text-gray-700">
                <p>Мы используем собранные данные для следующих целей:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Предоставление архитектурных, дизайнерских и строительных услуг</li>
                  <li>Связь с клиентами и консультации по проектам</li>
                  <li>Улучшение качества наших услуг и пользовательского опыта</li>
                  <li>Отправка информации о новых услугах и специальных предложениях</li>
                  <li>Соблюдение правовых обязательств</li>
                </ul>
              </div>
            </section>

            {/* Защита данных */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">4. Защита персональных данных</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Мы принимаем все необходимые технические и организационные меры для защиты 
                  ваших персональных данных от несанкционированного доступа, изменения, 
                  раскрытия или уничтожения:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Шифрование данных при передаче (SSL/TLS)</li>
                  <li>Ограниченный доступ к персональным данным только уполномоченных сотрудников</li>
                  <li>Регулярное обновление систем безопасности</li>
                  <li>Резервное копирование и защищенное хранение данных</li>
                </ul>
              </div>
            </section>

            {/* Передача данных третьим лицам */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">5. Передача данных третьим лицам</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Мы не продаем, не обмениваем и не передаем ваши персональные данные третьим лицам 
                  без вашего согласия, за исключением следующих случаев:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Партнеры и подрядчики, участвующие в выполнении ваших проектов</li>
                  <li>Поставщики технических услуг (хостинг, аналитика)</li>
                  <li>Случаи, предусмотренные законодательством Кыргызской Республики</li>
                </ul>
              </div>
            </section>

            {/* Ваши права */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">6. Ваши права</h2>
              <div className="space-y-4 text-gray-700">
                <p>В отношении ваших персональных данных вы имеете следующие права:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Право на доступ к своим персональным данным</li>
                  <li>Право на исправление неточных данных</li>
                  <li>Право на удаление персональных данных</li>
                  <li>Право на ограничение обработки</li>
                  <li>Право на отзыв согласия на обработку</li>
                </ul>
                <p>
                  Для реализации своих прав обращайтесь к нам по адресу: 
                  <a href="mailto:nurstroy.company@gmail.com" className="text-black hover:underline">
                    nurstroy.company@gmail.com
                  </a>
                </p>
              </div>
            </section>

            {/* Изменения в политике */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">7. Изменения в Политике конфиденциальности</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. 
                  Все изменения будут опубликованы на данной странице с указанием даты последнего обновления.
                </p>
                <p>
                  Рекомендуем периодически просматривать эту страницу для ознакомления с актуальной версией Политики.
                </p>
              </div>
            </section>

            {/* Контактная информация */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">8. Контактная информация</h2>
              <div className="bg-gray-50 rounded-2xl p-8">
                <p className="text-gray-700 mb-4">
                  Если у вас есть вопросы относительно настоящей Политики конфиденциальности или 
                  обработки ваших персональных данных, свяжитесь с нами:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>ОсОО «НУР СТРОЙ»</strong></p>
                  <p>Адрес: Улица Бакаева, 140/3, Бизнес центр - SKY PLAZA</p>
                  <p>Телефон: <a href="tel:+996500010136" className="text-black hover:underline">+996 500 010 136</a></p>
                  <p>Email: <a href="mailto:nurstroy.company@gmail.com" className="text-black hover:underline">nurstroy.company@gmail.com</a></p>
                  <p>Режим работы: Пн-Пт: 9:00-20:00, Сб: 10:00-15:00</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Image src="/logo-bw.svg" alt="NUR STROY" width={32} height={32} className="h-8 w-auto mr-3" />
              <span className="text-2xl font-bold">NUR STROY</span>
            </div>
            <p className="text-gray-400 mb-4">
              Профессиональные архитектурные, дизайнерские и строительные услуги
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">
                Главная
              </Link>
              <Link href="/terms-of-use" className="hover:text-white transition-colors">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

