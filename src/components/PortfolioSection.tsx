'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ImageIcon, ChevronLeftIcon, ChevronRightIcon, XIcon, LoaderIcon } from './Icons';

interface Portfolio {
  id: string;
  title: string;
  description: string;
  images: string[];
  createdAt: string;
}

export default function PortfolioSection() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      
      if (data.success) {
        setPortfolios(data.data);
      }
    } catch (error) {
      console.error('Ошибка загрузки портфолио:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedPortfolio(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedPortfolio) {
      setCurrentImageIndex((prev) => 
        prev === selectedPortfolio.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedPortfolio) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedPortfolio.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <section id="portfolio" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <LoaderIcon size={32} className="mx-auto text-black/70" />
            <p className="mt-4 text-gray-600">Загрузка портфолио...</p>
          </div>
        </div>
      </section>
    );
  }

  if (portfolios.length === 0) {
    return null; // Не показываем секцию, если нет работ
  }

  return (
    <>
      <section id="portfolio" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Наши работы
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Примеры реализованных проектов, которые демонстрируют наш профессионализм и качество работы
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => openModal(portfolio)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={portfolio.images[0]}
                    alt={portfolio.title}
                    width={400}
                    height={256}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  
                  {/* Image count badge */}
                  {portfolio.images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <ImageIcon size={14} />
                      {portfolio.images.length}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">
                    {portfolio.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {portfolio.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(portfolio.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                    <span className="text-black font-medium group-hover:underline">
                      Подробнее →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedPortfolio && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-bold text-black">
                {selectedPortfolio.title}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-black p-1"
              >
                <XIcon size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Image Gallery */}
              <div className="relative mb-6">
                <Image
                  src={selectedPortfolio.images[currentImageIndex]}
                  alt={`${selectedPortfolio.title} - ${currentImageIndex + 1}`}
                  width={800}
                  height={384}
                  className="w-full h-96 object-cover rounded-lg"
                />
                
                {/* Navigation arrows */}
                {selectedPortfolio.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeftIcon size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronRightIcon size={20} />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {selectedPortfolio.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {selectedPortfolio.images.length > 1 && (
                <div className="flex gap-2 mb-6 overflow-x-auto">
                  {selectedPortfolio.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer flex-shrink-0 ${
                        index === currentImageIndex ? 'ring-2 ring-black' : 'opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-black">Описание проекта</h4>
                <pre className="text-gray-600 leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedPortfolio.description}
                </pre>
                <p className="text-sm text-gray-500">
                  Дата завершения: {new Date(selectedPortfolio.createdAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
