import PortfolioSection from '@/components/PortfolioSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-black">NUR STROY</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition duration-200">Главная</a>
                <a href="#services" className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition duration-200">Услуги</a>
                <a href="#portfolio" className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition duration-200">Портфолио</a>
                <a href="#about" className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition duration-200">О нас</a>
                <a href="#contact" className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition duration-200">Контакты</a>
              </div>
            </div>
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-black focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0">
          {/* Clean background image without overlays */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/main-picture.jpg')",
            }}
          ></div>
          {/* Gradient overlay - darker at top, lighter at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/10"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>NUR STROY</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white drop-shadow-lg" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
            Профессиональные архитектурные, дизайнерские и строительные услуги полного цикла
          </p>
          <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
            Узнать больше
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-4">
              ПРОФЕССИОНАЛЬНЫЕ УСЛУГИ
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Наши услуги</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Полный спектр архитектурных, дизайнерских и строительных услуг от концепции до реализации. 
              Мы создаем пространства, которые вдохновляют и служат десятилетиями.
            </p>
          </div>

          {/* Services Grid */}
          <div className="space-y-16">
            {/* Архитектурные услуги */}
            <div className="group">
              <div className="bg-white border border-gray-200 rounded-2xl p-10 hover:shadow-2xl transition-all duration-500 hover:border-gray-300">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-3xl font-bold text-gray-900">Архитектурные услуги</h3>
                      <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                        ПРОЕКТИРОВАНИЕ
                      </div>
                    </div>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Создаем уникальные архитектурные решения, сочетающие функциональность, эстетику и инновационные технологии. 
                      От концептуального проекта до рабочей документации.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Архитектурное проектирование</h4>
                            <p className="text-sm text-gray-600">Разработка проектов любой сложности с учетом современных стандартов</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Проектирование зданий</h4>
                            <p className="text-sm text-gray-600">Жилые, коммерческие и общественные объекты</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Генеральное планирование</h4>
                            <p className="text-sm text-gray-600">Комплексное планирование территории и ландшафта</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Согласование документации</h4>
                            <p className="text-sm text-gray-600">Полное сопровождение согласований в государственных органах</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Авторский надзор</h4>
                            <p className="text-sm text-gray-600">Контроль качества реализации проекта на всех этапах</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Сметное планирование</h4>
                            <p className="text-sm text-gray-600">Точный расчет стоимости и оптимизация бюджета</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Дизайнерские услуги */}
            <div className="group">
              <div className="bg-white border border-gray-200 rounded-2xl p-10 hover:shadow-2xl transition-all duration-500 hover:border-gray-300">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-3xl font-bold text-gray-900">Дизайнерские услуги</h3>
                      <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                        ИНТЕРЬЕР & ЭКСТЕРЬЕР
                      </div>
                    </div>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Создаем гармоничные пространства, отражающие индивидуальность и стиль жизни наших клиентов. 
                      Современный дизайн с вниманием к каждой детали.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Дизайн интерьера</h4>
                            <p className="text-sm text-gray-600">Жилые и коммерческие пространства любой сложности</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Концепция экстерьера</h4>
                            <p className="text-sm text-gray-600">Разработка внешнего облика зданий и сооружений</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">3D-визуализация</h4>
                            <p className="text-sm text-gray-600">Фотореалистичные рендеры и подбор материалов</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Техническая документация</h4>
                            <p className="text-sm text-gray-600">Детальные чертежи и спецификации</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Декоративное оформление</h4>
                            <p className="text-sm text-gray-600">Концепция освещения и декоративных элементов</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Мебельные решения</h4>
                            <p className="text-sm text-gray-600">Индивидуальная мебель и предметы интерьера</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Авторский надзор</h4>
                            <p className="text-sm text-gray-600">Контроль реализации дизайн-проекта</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Бюджетирование</h4>
                            <p className="text-sm text-gray-600">Детальный расчет стоимости материалов и работ</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Строительные услуги */}
            <div className="group">
              <div className="bg-white border border-gray-200 rounded-2xl p-10 hover:shadow-2xl transition-all duration-500 hover:border-gray-300">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-3xl font-bold text-gray-900">Строительные услуги</h3>
                      <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                        РЕАЛИЗАЦИЯ
                      </div>
                    </div>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Воплощаем архитектурные и дизайнерские решения в жизнь. Используем современные технологии 
                      и качественные материалы для создания долговечных конструкций.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 text-lg">Ремонт «под ключ»</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-gray-900">Квартиры</p>
                              <p className="text-sm text-gray-600">Полный цикл ремонтных работ</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-gray-900">Коммерческие помещения</p>
                              <p className="text-sm text-gray-600">Офисы, магазины, рестораны</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-gray-900">Частные дома</p>
                              <p className="text-sm text-gray-600">Индивидуальные жилые объекты</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 text-lg">Строительство домов</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-gray-900">Коробка</p>
                              <p className="text-sm text-gray-600">Фундамент, стены, кровля</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-gray-900">ПСО</p>
                              <p className="text-sm text-gray-600">Планировочно-строительные работы</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-gray-900">White Box</p>
                              <p className="text-sm text-gray-600">Готовность к чистовой отделке</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-gray-900">Под ключ</p>
                              <p className="text-sm text-gray-600">Полная готовность к заселению</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 text-lg">Реконструкция</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-gray-900">Надстройка этажей</p>
                              <p className="text-sm text-gray-600">Увеличение площади здания</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-gray-900">Пристройки</p>
                              <p className="text-sm text-gray-600">Расширение существующих зданий</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-gray-900">Капитальный ремонт</p>
                              <p className="text-sm text-gray-600">Модернизация инженерных систем</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="bg-gray-50 rounded-2xl p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Готовы начать ваш проект?</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Свяжитесь с нами для бесплатной консультации и обсуждения деталей вашего проекта. 
                Мы поможем воплотить ваши идеи в реальность.
              </p>
              <button className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-xl text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 mb-4">
              О КОМПАНИИ
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">NUR STROY</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ведущая строительная компания Кыргызстана с 15-летним опытом создания архитектурных шедевров 
              и воплощения самых смелых дизайнерских идей в реальность.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            {/* Left Column - Story & Mission */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Наша история</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Основанная в 2009 году, компания NUR STROY начинала как небольшая архитектурная студия с большими амбициями. 
                  Сегодня мы — команда из более чем 50 высококвалифицированных специалистов, включающая архитекторов, 
                  дизайнеров, инженеров и строителей.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  За годы работы мы реализовали более 100 проектов различной сложности — от частных резиденций 
                  до крупных коммерческих комплексов, каждый из которых отражает наш профессионализм и внимание к деталям.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Наша миссия</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Создавать пространства, которые не просто функциональны, но и вдохновляют. Мы верим, что качественная 
                  архитектура и дизайн способны изменить жизнь людей к лучшему, создавая комфортную и гармоничную среду 
                  для работы, отдыха и творчества.
                </p>
              </div>
            </div>

            {/* Right Column - Values & Principles */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Наши принципы</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Качество превыше всего</h4>
                    <p className="text-gray-600">Используем только проверенные материалы и современные технологии строительства</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Соблюдение сроков</h4>
                    <p className="text-gray-600">Четкое планирование и контроль на каждом этапе гарантируют своевременную сдачу</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Индивидуальный подход</h4>
                    <p className="text-gray-600">Каждый проект уникален и создается с учетом потребностей конкретного клиента</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Гарантия качества</h4>
                    <p className="text-gray-600">Предоставляем расширенную гарантию на все виды выполненных работ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Наши достижения</h3>
              <p className="text-lg text-gray-600">Цифры, которые говорят о нашем профессионализме</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-black mb-2">100+</div>
                <div className="text-gray-600 font-medium">Завершенных проектов</div>
                <div className="text-sm text-gray-500 mt-1">За последние 5 лет</div>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-black mb-2">15+</div>
                <div className="text-gray-600 font-medium">Лет опыта</div>
                <div className="text-sm text-gray-500 mt-1">На рынке Казахстана</div>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-black mb-2">50+</div>
                <div className="text-gray-600 font-medium">Специалистов</div>
                <div className="text-sm text-gray-500 mt-1">В нашей команде</div>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-black mb-2">98%</div>
                <div className="text-gray-600 font-medium">Довольных клиентов</div>
                <div className="text-sm text-gray-500 mt-1">Рекомендуют нас друзьям</div>
              </div>
            </div>
          </div>

          {/* Team & Expertise */}
          <div className="mt-20 grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Архитектурное бюро</h4>
              <p className="text-gray-600">Команда лицензированных архитекторов с международным образованием и опытом работы в Европе</p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Дизайн-студия</h4>
              <p className="text-gray-600">Креативные дизайнеры интерьеров, специализирующиеся на современных и классических стилях</p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Строительный отдел</h4>
              <p className="text-gray-600">Опытные прорабы и мастера, владеющие современными технологиями строительства</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white/80 mb-4">
              СВЯЖИТЕСЬ С НАМИ
            </div>
            <h2 className="text-5xl font-bold mb-6">Начнем ваш проект</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Готовы воплотить ваши идеи в реальность? Свяжитесь с нами для бесплатной консультации 
              и обсуждения деталей вашего будущего проекта.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6">Отправить заявку</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Имя *</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition duration-300"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Телефон *</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition duration-300"
                      placeholder="+996700123456"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Тип проекта</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 transition duration-300">
                    <option value="" className="bg-gray-800">Выберите тип проекта</option>
                    <option value="architecture" className="bg-gray-800">Архитектурное проектирование</option>
                    <option value="design" className="bg-gray-800">Дизайн интерьера</option>
                    <option value="construction" className="bg-gray-800">Строительство</option>
                    <option value="renovation" className="bg-gray-800">Ремонт</option>
                    <option value="consultation" className="bg-gray-800">Консультация</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Сообщение</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition duration-300 resize-none"
                    placeholder="Расскажите подробнее о вашем проекте..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white hover:bg-gray-100 text-black font-bold py-4 px-8 rounded-lg text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Отправить заявку
                </button>
                
                <p className="text-sm text-gray-400 text-center">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Контактная информация</h3>
                <p className="text-lg text-gray-300 mb-8">
                  Мы работаем с понедельника по пятницу с 9:00 до 18:00. 
                  Ответим на ваше сообщение в течение часа в рабочее время.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition duration-300">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Телефон</h4>
                    <p className="text-gray-300 mb-1">+7 (727) 123-45-67</p>
                    <p className="text-gray-300">+7 (708) 987-65-43</p>
                    <p className="text-sm text-gray-400 mt-2">Звонки принимаем с 9:00 до 18:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition duration-300">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Email</h4>
                    <p className="text-gray-300 mb-1">info@nurstroy.kz</p>
                    <p className="text-gray-300">projects@nurstroy.kz</p>
                    <p className="text-sm text-gray-400 mt-2">Отвечаем в течение часа</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition duration-300">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Офис</h4>
                    <p className="text-gray-300 mb-1">г. Бишкек, ул. Чуй, 150/230</p>
                    <p className="text-gray-300 mb-1">БЦ &quot;Esentai Tower&quot;, 15 этаж</p>
                    <p className="text-sm text-gray-400 mt-2">Пн-Пт: 9:00-18:00, Сб: 10:00-15:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition duration-300">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">WhatsApp</h4>
                    <p className="text-gray-300 mb-1">+7 (708) 987-65-43</p>
                    <p className="text-sm text-gray-400 mt-2">Быстрая связь 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-4">NUR STROY</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Ведущая строительная компания Кыргызстана с 15-летним опытом создания 
                  архитектурных шедевров и воплощения дизайнерских идей в реальность.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm text-gray-400">Лицензированная компания</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm text-gray-400">Гарантия качества</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm text-gray-400">100+ проектов</span>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Мы в социальных сетях</h4>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.001 12.017.001z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Наши услуги</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#services" className="text-gray-300 hover:text-white transition duration-300 text-sm">
                    Архитектурное проектирование
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-300 hover:text-white transition duration-300 text-sm">
                    Дизайн интерьера
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-300 hover:text-white transition duration-300 text-sm">
                    Строительство домов
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-300 hover:text-white transition duration-300 text-sm">
                    Ремонт под ключ
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-300 hover:text-white transition duration-300 text-sm">
                    Реконструкция зданий
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-300 hover:text-white transition duration-300 text-sm">
                    Консультации
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Контакты</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-xs mb-1">ТЕЛЕФОН</p>
                  <p className="text-white text-sm">+7 (727) 123-45-67</p>
                  <p className="text-white text-sm">+7 (708) 987-65-43</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">EMAIL</p>
                  <p className="text-white text-sm">info@nurstroy.kz</p>
                  <p className="text-white text-sm">projects@nurstroy.kz</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">АДРЕС</p>
                  <p className="text-white text-sm">г. Бишкек, ул. Чуй, 150/230</p>
                  <p className="text-white text-sm">БЦ &quot;Esentai Tower&quot;, 15 этаж</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">РЕЖИМ РАБОТЫ</p>
                  <p className="text-white text-sm">Пн-Пт: 9:00-18:00</p>
                  <p className="text-white text-sm">Сб: 10:00-15:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
                <p>© 2025 NUR STROY. Все права защищены.</p>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-white transition duration-300">Политика конфиденциальности</a>
                  <a href="#" className="hover:text-white transition duration-300">Условия использования</a>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Разработано с</span>
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>в Бишкеке by Codevai</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
