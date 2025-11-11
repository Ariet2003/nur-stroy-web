'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function TermsOfUsePage() {
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
              Условия использования
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Правила и условия использования веб-сайта и услуг компании NUR STROY
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Последнее обновление: 22 октября 2025 г.
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Принятие условий */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">1. Принятие условий</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Добро пожаловать на веб-сайт ОсОО «НУР СТРОЙ» (далее — «Компания», «мы», «наш»). 
                  Используя наш веб-сайт и услуги, вы соглашаетесь соблюдать настоящие Условия использования.
                </p>
              </div>
            </section>

            {/* Описание услуг */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">2. Описание услуг</h2>
              <div className="space-y-4 text-gray-700">
                <p>NUR STROY предоставляет следующие профессиональные услуги:</p>
                <div className="grid md:grid-cols-3 gap-6 my-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-black mb-3">Архитектурные услуги</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Разработка архитектурных проектов</li>
                      <li>• Проектирование зданий</li>
                      <li>• Генеральное планирование</li>
                      <li>• Согласование документации</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-black mb-3">Дизайнерские услуги</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Дизайн интерьера</li>
                      <li>• Концепции экстерьеров</li>
                      <li>• 3D-визуализация</li>
                      <li>• Мебельные решения</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-black mb-3">Строительные услуги</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Ремонт «под ключ»</li>
                      <li>• Строительство домов</li>
                      <li>• Реконструкция зданий</li>
                      <li>• Капитальный ремонт</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Права и обязанности пользователей */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">3. Права и обязанности пользователей</h2>
              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="text-xl font-semibold text-black mb-3">Ваши права:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Получать качественные услуги в соответствии с договором</li>
                    <li>Получать консультации по вопросам проектирования и строительства</li>
                    <li>Требовать соблюдения сроков выполнения работ</li>
                    <li>Получать гарантийное обслуживание</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-3">Ваши обязанности:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Предоставлять точную и полную информацию о проекте</li>
                    <li>Своевременно оплачивать услуги согласно договору</li>
                    <li>Соблюдать требования безопасности на строительной площадке</li>
                    <li>Не использовать веб-сайт в незаконных целях</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Заказ услуг и оплата */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">4. Заказ услуг и оплата</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Процедура заказа:</strong>
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Подача заявки через веб-сайт или по телефону</li>
                  <li>Консультация и обсуждение требований к проекту</li>
                  <li>Составление технического задания и сметы</li>
                  <li>Подписание договора на оказание услуг</li>
                  <li>Выполнение работ согласно утвержденному плану</li>
                </ol>
                <p>
                  <strong>Условия оплаты:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Оплата производится согласно условиям договора</li>
                  <li>Возможна поэтапная оплата для крупных проектов</li>
                  <li>Принимаются безналичные переводы и наличные платежи</li>
                  <li>НДС включен в стоимость услуг</li>
                </ul>
              </div>
            </section>

            {/* Гарантии и ответственность */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">5. Гарантии и ответственность</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Наши гарантии:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Качество выполненных работ в соответствии с проектной документацией</li>
                  <li>Соблюдение строительных норм и стандартов Кыргызской Республики</li>
                  <li>Гарантийное обслуживание на выполненные работы</li>
                  <li>Профессиональная квалификация наших специалистов</li>
                </ul>
                <p>
                  <strong>Ограничение ответственности:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ответственность ограничена стоимостью оказанных услуг</li>
                  <li>Не несем ответственности за задержки, вызванные форс-мажорными обстоятельствами</li>
                  <li>Не несем ответственности за решения, принятые на основе неточной информации клиента</li>
                </ul>
              </div>
            </section>

            {/* Интеллектуальная собственность */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">6. Интеллектуальная собственность</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Все материалы на веб-сайте, включая тексты, изображения, логотипы, дизайн, 
                  являются интеллектуальной собственностью ОсОО «НУР СТРОЙ» и защищены 
                  авторским правом.
                </p>
                <p>
                  Проектная документация, разработанная для клиента, передается в соответствии 
                  с условиями договора. Авторские права на архитектурные и дизайнерские решения 
                  остаются за Компанией, если не предусмотрено иное.
                </p>
              </div>
            </section>

            {/* Конфиденциальность */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">7. Конфиденциальность</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Мы обязуемся сохранять конфиденциальность информации о ваших проектах и 
                  не разглашать коммерческие тайны. Подробная информация о защите персональных 
                  данных содержится в нашей 
                  <Link href="/privacy-policy" className="text-black hover:underline font-medium">
                    Политике конфиденциальности
                  </Link>.
                </p>
              </div>
            </section>

            {/* Разрешение споров */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">8. Разрешение споров</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Мы стремимся решать все спорные вопросы путем переговоров. В случае 
                  невозможности досудебного урегулирования, споры подлежат рассмотрению 
                  в судах Кыргызской Республики в соответствии с действующим законодательством.
                </p>
                 <p>
                   Для урегулирования споров обращайтесь к нам по телефону{' '}
                   <a href="tel:+996500010136" className="text-black hover:underline">+996 500 010 136</a>{' '}
                   или электронной почте{' '}
                   <a href="mailto:nurstroy.company@gmail.com" className="text-black hover:underline">
                     nurstroy.company@gmail.com
                   </a>.
                 </p>
              </div>
            </section>

            {/* Изменения условий */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">9. Изменения условий</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Мы оставляем за собой право изменять настоящие Условия использования. 
                  Все изменения вступают в силу с момента их публикации на веб-сайте.
                </p>
                <p>
                  Продолжение использования веб-сайта после внесения изменений означает 
                  ваше согласие с новыми условиями.
                </p>
              </div>
            </section>

            {/* Контактная информация */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">10. Контактная информация</h2>
              <div className="bg-gray-50 rounded-2xl p-8">
                <p className="text-gray-700 mb-4">
                  По всем вопросам, связанным с настоящими Условиями использования, 
                  обращайтесь к нам:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-gray-700">
                    <p><strong>ОсОО «НУР СТРОЙ»</strong></p>
                    <p>Адрес: Улица Бакаева, 140/3</p>
                    <p>Бизнес центр - SKY PLAZA</p>
                    <p>Телефон: <a href="tel:+996500010136" className="text-black hover:underline">+996 500 010 136</a></p>
                    <p>Email: <a href="mailto:nurstroy.company@gmail.com" className="text-black hover:underline">nurstroy.company@gmail.com</a></p>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Режим работы:</strong></p>
                    <p>Понедельник - Пятница: 9:00 - 20:00</p>
                    <p>Суббота: 10:00 - 15:00</p>
                    <p>Воскресенье: выходной</p>
                    <p className="mt-4">
                      <strong>Социальные сети:</strong><br />
                      Instagram: <a href="https://instagram.com/nur.company_kg" target="_blank" rel="noopener noreferrer" className="text-black hover:underline">@nurstroy.company</a>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Заключительные положения */}
            <section className="mb-12">
              <div className="bg-black text-white rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold mb-4">Готовы начать ваш проект?</h3>
                <p className="mb-6 text-gray-300">
                  Свяжитесь с нами для бесплатной консультации по вашему архитектурному, 
                  дизайнерскому или строительному проекту
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="tel:+996500010136"
                    className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Позвонить сейчас
                  </a>
                  <Link
                    href="/"
                    className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-black transition-colors"
                  >
                    Вернуться на главную
                  </Link>
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
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
