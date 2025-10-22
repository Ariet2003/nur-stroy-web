'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImageIcon, LoaderIcon } from './Icons';

interface Portfolio {
  id: string;
  title: string;
  description: string;
  images: string[];
  createdAt: string;
}

interface PortfolioSectionProps {
  limit?: number;
  showViewAllButton?: boolean;
}

export default function PortfolioSection({ limit, showViewAllButton = false }: PortfolioSectionProps) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Применяем лимит если он задан
  const displayedPortfolios = limit ? portfolios.slice(0, limit) : portfolios;

  if (portfolios.length === 0) {
    return null; // Не показываем секцию, если нет работ
  }

  return (
    <>
      <section id="portfolio" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Наши работы
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Примеры реализованных проектов, которые демонстрируют наш профессионализм и качество работы
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPortfolios.map((portfolio) => (
              <Link
                key={portfolio.id}
                href={`/portfolio/${portfolio.id}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
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
              </Link>
            ))}
          </div>

          {/* View All Button */}
          {showViewAllButton && limit && portfolios.length > limit && (
            <div className="text-center mt-12">
              <Link
                href="/portfolio"
                className="inline-flex items-center px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Посмотреть все работы ({portfolios.length})
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
