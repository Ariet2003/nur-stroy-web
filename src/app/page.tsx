'use client';

import { useState } from 'react';
import Image from 'next/image';
import PortfolioSection from '@/components/PortfolioSection';
import ContactModal from '@/components/ContactModal';
import SuccessModal from '@/components/SuccessModal';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Закрытие мобильного меню при клике вне его области
  const handleClickOutside = (event: React.MouseEvent) => {
    if (isMobileMenuOpen && !(event.target as Element).closest('nav')) {
      closeMobileMenu();
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setSubmitMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(data.message);
        setIsSuccessModalOpen(true);
        setFormData({
          name: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        setSubmitMessage(data.message || 'Произошла ошибка при отправке заявки');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Произошла ошибка при отправке заявки');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white" onClick={handleClickOutside}>
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image src="/logo-bw.svg" alt="NUR STROY" width={32} height={32} className="h-6 w-auto mr-2 sm:h-8 sm:mr-3" />
              <h1 className="text-lg sm:text-2xl font-bold text-black">NUR STROY</h1>
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
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-black focus:outline-none"
                aria-label="Открыть меню"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            <a 
              href="#home" 
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-md text-base font-medium transition duration-200"
            >
              Главная
            </a>
            <a 
              href="#services" 
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-md text-base font-medium transition duration-200"
            >
              Услуги
            </a>
            <a 
              href="#portfolio" 
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-md text-base font-medium transition duration-200"
            >
              Портфолио
            </a>
            <a 
              href="#about" 
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-md text-base font-medium transition duration-200"
            >
              О нас
            </a>
            <a 
              href="#contact" 
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-md text-base font-medium transition duration-200"
            >
              Контакты
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0">
          {/* Clean background image without overlays */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/main-picture.png')",
            }}
          ></div>
          {/* Black overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6">
          <div className="mb-4 sm:mb-6 flex justify-center">
            <Image 
              src="/logo.svg" 
              alt="NUR STROY" 
              width={420} 
              height={297}
              className="w-auto h-32 sm:h-48 md:h-64 drop-shadow-2xl"
              style={{filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))'}}
              priority
            />
          </div>
          <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto text-white drop-shadow-lg leading-relaxed" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
            Профессиональные архитектурные, дизайнерские и строительные услуги полного цикла
          </p>
          <button 
            onClick={openContactModal}
            className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Узнать больше
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 rounded-full text-xs sm:text-sm font-medium text-gray-600 mb-3 sm:mb-4">
              ПРОФЕССИОНАЛЬНЫЕ УСЛУГИ
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Наши услуги</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Полный спектр архитектурных, дизайнерских и строительных услуг от концепции до реализации. 
              Мы создаем пространства, которые вдохновляют и служат десятилетиями.
            </p>
          </div>

          {/* Services Grid */}
          <div className="space-y-16">
            {/* Архитектурные услуги */}
            <div className="group">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-10 hover:shadow-2xl transition-all duration-500 hover:border-gray-300">
                <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Архитектурные услуги</h3>
                      <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 w-fit">
                        ПРОЕКТИРОВАНИЕ
                      </div>
                    </div>
                    <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                      Создаем уникальные архитектурные решения, сочетающие функциональность, эстетику и инновационные технологии. 
                      От концептуального проекта до рабочей документации.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
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
              <button 
                onClick={openContactModal}
                className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-xl text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <PortfolioSection limit={9} showViewAllButton={true} />

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-600 mb-3 sm:mb-4">
              О КОМПАНИИ
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">NUR STROY</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Ведущая строительная компания Кыргызстана с 5-летним опытом создания архитектурных шедевров 
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
                  Основанная в 2020 году, компания NUR STROY начинала как небольшая архитектурная студия с большими амбициями. 
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
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <AnimatedCounter 
                  end={100} 
                  suffix="+" 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-1 sm:mb-2"
                />
                <div className="text-sm sm:text-base text-gray-600 font-medium">Завершенных проектов</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">За последние 5 лет</div>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <AnimatedCounter 
                  end={10} 
                  suffix="+" 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-1 sm:mb-2"
                />
                <div className="text-sm sm:text-base text-gray-600 font-medium">Лет опыта</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">На рынке Кыргызстана</div>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <AnimatedCounter 
                  end={50} 
                  suffix="+" 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-1 sm:mb-2"
                />
                <div className="text-sm sm:text-base text-gray-600 font-medium">Специалистов</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">В нашей команде</div>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <AnimatedCounter 
                  end={98} 
                  suffix="%" 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-1 sm:mb-2"
                />
                <div className="text-sm sm:text-base text-gray-600 font-medium">Довольных клиентов</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">Рекомендуют нас друзьям</div>
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
      <section id="contact" className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-white/10 rounded-full text-xs sm:text-sm font-medium text-white/80 mb-3 sm:mb-4">
              СВЯЖИТЕСЬ С НАМИ
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Начнем ваш проект</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Готовы воплотить ваши идеи в реальность? Свяжитесь с нами для бесплатной консультации 
              и обсуждения деталей вашего будущего проекта.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Отправить заявку</h3>
              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Имя *</label>
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition duration-300"
                      placeholder="Ваше имя"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Телефон *</label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition duration-300"
                      placeholder="+996700123456"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Тип проекта</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 transition duration-300"
                  >
                    <option value="" className="bg-gray-800">Выберите тип проекта</option>
                    <option value="Архитектурное проектирование" className="bg-gray-800">Архитектурное проектирование</option>
                    <option value="Дизайн интерьера" className="bg-gray-800">Дизайн интерьера</option>
                    <option value="Строительство" className="bg-gray-800">Строительство</option>
                    <option value="Ремонт" className="bg-gray-800">Ремонт</option>
                    <option value="Консультация" className="bg-gray-800">Консультация</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Сообщение</label>
                  <textarea 
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition duration-300 resize-none"
                    placeholder="Расскажите подробнее о вашем проекте..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white hover:bg-gray-100 text-black font-bold py-4 px-8 rounded-lg text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
                </button>

                {submitMessage && !submitMessage.includes('успешно') && (
                  <div className="p-4 rounded-lg text-center bg-red-500/20 text-red-300 border border-red-500/30">
                    {submitMessage}
                  </div>
                )}
                
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
                    <p className="text-gray-300 mb-1">+996500010136</p>
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
                    <p className="text-gray-300 mb-1">nurstroy.company@gmail.com</p>
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
                    <p className="text-gray-300 mb-1">Улица Бакаева, 140/3</p>
                    <p className="text-gray-300 mb-1">Бизнес центр - SKY PLAZA</p>
                    <p className="text-sm text-gray-400 mt-2">Пн-Пт: 9:00-20:00, Сб: 10:00-15:00</p>
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
                    <p className="text-gray-300 mb-1">+996500010136</p>
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
          <div className="py-12 sm:py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Image src="/logo-bw.svg" alt="NUR STROY" width={40} height={40} className="h-8 w-auto mr-3 sm:h-10 sm:mr-4 filter invert" />
                  <h3 className="text-2xl sm:text-3xl font-bold">NUR STROY</h3>
                </div>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                  Ведущая строительная компания Кыргызстана с 5-летним опытом создания 
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
                  {/* Instagram */}
                  <a href="https://instagram.com/nur.company_kg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  
                  {/* Phone */}
                  <a href="tel:+996500010136" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </a>
                  
                  {/* WhatsApp */}
                  <a href="https://wa.me/996500010136" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
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
                  <p className="text-white text-sm">+996500010136</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">EMAIL</p>
                  <p className="text-white text-sm">nurstroy.company@gmail.com</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">АДРЕС</p>
                  <p className="text-white text-sm">Улица Бакаева, 140/3</p>
                  <p className="text-white text-sm">Бизнес центр - SKY PLAZA</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">РЕЖИМ РАБОТЫ</p>
                  <p className="text-white text-sm">Пн-Пт: 9:00-20:00</p>
                  <p className="text-white text-sm">Сб: 10:00-15:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 py-6 sm:py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
              <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400 text-center md:text-left">
                <p>© 2025 NUR STROY. Все права защищены.</p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <a href="/privacy-policy" className="hover:text-white transition duration-300">Политика конфиденциальности</a>
                  <a href="/terms-of-use" className="hover:text-white transition duration-300">Условия использования</a>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                <span>Разработано с</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>в Бишкеке by <a href="https://www.instagram.com/codevai/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Codevai</a></span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />

      {/* Success Modal */}
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={closeSuccessModal}
        message={successMessage}
      />
    </div>
  );
}
