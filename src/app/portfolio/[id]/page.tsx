'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, LoaderIcon, ImageIcon } from '@/components/Icons';
import ContactModal from '@/components/ContactModal';

interface Portfolio {
  id: string;
  title: string;
  description: string;
  images: string[];
  createdAt: string;
}

export default function PortfolioDetailPage() {
  const params = useParams();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [allPortfolios, setAllPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchPortfolio(params.id as string);
    }
  }, [params.id]);

  const fetchPortfolio = async (id: string) => {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      
      if (data.success) {
        setAllPortfolios(data.data);
        const foundPortfolio = data.data.find((p: Portfolio) => p.id === id);
        if (foundPortfolio) {
          setPortfolio(foundPortfolio);
        } else {
          setError('Работа не найдена');
        }
      } else {
        setError('Ошибка загрузки данных');
      }
    } catch (error) {
      console.error('Ошибка загрузки портфолио:', error);
      setError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (portfolio) {
      setCurrentImageIndex((prev) => 
        prev === portfolio.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (portfolio) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? portfolio.images.length - 1 : prev - 1
      );
    }
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/" className="text-2xl font-bold text-black">
                NUR STROY
              </Link>
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  ← На главную
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Loading */}
        <div className="flex justify-center items-center py-24">
          <div className="text-center">
            <LoaderIcon size={48} className="mx-auto text-black/70 animate-spin" />
            <p className="mt-4 text-gray-600">Загрузка проекта...</p>
          </div>
        </div>
      </div>
    );
  }

  // Получаем другие работы (исключая текущую)
  const otherPortfolios = allPortfolios.filter(p => p.id !== portfolio?.id).slice(0, 3);

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/" className="text-2xl font-bold text-black">
                NUR STROY
              </Link>
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  ← На главную
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Error */}
        <div className="flex justify-center items-center py-24">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <ImageIcon size={64} className="mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-black mb-4">
              {error || 'Проект не найден'}
            </h1>
            <p className="text-gray-600 mb-8">
              Возможно, проект был удален или ссылка неверна
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/portfolio"
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Все проекты
              </Link>
              <Link
                href="/"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← На главную
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="flex gap-4">
              <Link
                href="/"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                ← На главную
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Project Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              {portfolio.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span>
                Дата завершения: {new Date(portfolio.createdAt).toLocaleDateString('ru-RU')}
              </span>
              <span>•</span>
              <span>
                {portfolio.images.length} {portfolio.images.length === 1 ? 'изображение' : 'изображений'}
              </span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-12">
            {/* Main Image */}
            <div className="relative mb-6">
              <Image
                src={portfolio.images[currentImageIndex]}
                alt={`${portfolio.title} - ${currentImageIndex + 1}`}
                width={1200}
                height={600}
                className="w-full h-[60vh] object-cover rounded-2xl cursor-pointer hover:opacity-90 transition-opacity"
                onClick={openFullscreen}
              />
              
              {/* Navigation arrows */}
              {portfolio.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeftIcon size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRightIcon size={24} />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full">
                {currentImageIndex + 1} / {portfolio.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {portfolio.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4">
                {portfolio.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={120}
                    height={120}
                    className={`w-24 h-24 md:w-30 md:h-30 object-cover rounded-lg cursor-pointer flex-shrink-0 transition-all ${
                      index === currentImageIndex 
                        ? 'ring-4 ring-black scale-105' 
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Project Description */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
              О проекте
            </h2>
            <div className="prose prose-lg max-w-none">
              <pre className="text-gray-700 leading-relaxed whitespace-pre-wrap font-sans text-lg">
                {portfolio.description}
              </pre>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center bg-black rounded-2xl p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Хотите похожий проект?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для обсуждения вашего проекта. Мы создадим индивидуальное решение под ваши потребности.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openContactModal}
                className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Связаться с нами
              </button>
              <Link
                href="/portfolio"
                className="px-8 py-4 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-black transition-colors"
              >
                Другие проекты
              </Link>
            </div>
          </div>

          {/* Other Projects Section */}
          {otherPortfolios.length > 0 && (
            <div className="mt-24">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-black mb-4">
                  Другие наши работы
                </h3>
                <p className="text-gray-600">
                  Посмотрите другие проекты из нашего портфолио
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPortfolios.map((otherPortfolio) => (
                  <Link
                    key={otherPortfolio.id}
                    href={`/portfolio/${otherPortfolio.id}`}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={otherPortfolio.images[0]}
                        alt={otherPortfolio.title}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                      
                      {/* Image count badge */}
                      {otherPortfolio.images.length > 1 && (
                        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                          <ImageIcon size={12} />
                          {otherPortfolio.images.length}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-black mb-2 group-hover:text-gray-700 transition-colors">
                        {otherPortfolio.title}
                      </h4>
                      <p className="text-gray-600 line-clamp-2 mb-3 text-sm">
                        {otherPortfolio.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(otherPortfolio.createdAt).toLocaleDateString('ru-RU')}
                        </span>
                        <span className="text-black font-medium group-hover:underline text-sm">
                          Подробнее →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-8">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Посмотреть все работы
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Fullscreen Image Modal */}
      {isFullscreen && portfolio && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Main Fullscreen Image */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              src={portfolio.images[currentImageIndex]}
              alt={`${portfolio.title} - ${currentImageIndex + 1}`}
              width={1920}
              height={1080}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation arrows for fullscreen */}
            {portfolio.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeftIcon size={32} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRightIcon size={32} />
                </button>
              </>
            )}

            {/* Image counter for fullscreen */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-lg">
              {currentImageIndex + 1} / {portfolio.images.length}
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </div>
  );
}
