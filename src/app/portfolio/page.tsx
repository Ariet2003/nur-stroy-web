'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImageIcon, LoaderIcon } from '@/components/Icons';

interface Portfolio {
  id: string;
  title: string;
  description: string;
  images: string[];
  createdAt: string;
}

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    fetchPortfolios();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPortfolios(portfolios);
    } else {
      const filtered = portfolios.filter(portfolio =>
        portfolio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        portfolio.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPortfolios(filtered);
    }
    // Сбрасываем на первую страницу при изменении поиска
    setCurrentPage(1);
  }, [portfolios, searchQuery]);

  const fetchPortfolios = async () => {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      
      if (data.success) {
        setPortfolios(data.data);
        setFilteredPortfolios(data.data);
      }
    } catch (error) {
      console.error('Ошибка загрузки портфолио:', error);
    } finally {
      setLoading(false);
    }
  };

  // Вычисляем данные для пагинации
  const totalPages = Math.ceil(filteredPortfolios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPortfolios = filteredPortfolios.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
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

        {/* Loading */}
        <div className="flex justify-center items-center py-24">
          <div className="text-center">
            <LoaderIcon size={48} className="mx-auto text-black/70 animate-spin" />
            <p className="mt-4 text-gray-600">Загрузка портфолио...</p>
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
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">
              Все наши работы
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-3">
              Полная коллекция наших проектов - от архитектурных решений до завершенного строительства
            </p>
            <div className="text-sm text-gray-500">
              Всего проектов: <span className="font-semibold text-black">{portfolios.length}</span>
              {searchQuery && (
                <span className="ml-4">
                  Найдено: <span className="font-semibold text-black">{filteredPortfolios.length}</span>
                </span>
              )}
              {totalPages > 1 && (
                <span className="ml-4">
                  Страница {currentPage} из {totalPages}
                </span>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по названию или описанию проекта..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-lg text-black placeholder-gray-500 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {portfolios.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-gray-400 mb-4">
                <ImageIcon size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Пока нет работ
              </h3>
              <p className="text-gray-600">
                Наши проекты скоро появятся здесь
              </p>
            </div>
          ) : filteredPortfolios.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-gray-400 mb-4">
                <ImageIcon size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Ничего не найдено
              </h3>
              <p className="text-gray-600 mb-4">
                По запросу "{searchQuery}" проекты не найдены
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Показать все проекты
              </button>
            </div>
          ) : (
            <div>
              {/* Portfolio Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {currentPortfolios.map((portfolio) => (
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center">
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-black border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    ← Назад
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 7) {
                        pageNum = i + 1;
                      } else if (currentPage <= 4) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 3) {
                        pageNum = totalPages - 6 + i;
                      } else {
                        pageNum = currentPage - 3 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            currentPage === pageNum
                              ? 'bg-black text-white'
                              : 'bg-white text-black border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-black border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Вперед →
                  </button>
                </div>
              </div>
            )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
