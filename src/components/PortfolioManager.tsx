'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageUploader from './ImageUploader';
import { PaletteIcon, PlusIcon, EditIcon, TrashIcon, LoaderIcon, XIcon, EyeIcon, SearchIcon } from './Icons';
import { ConfirmModal, AlertModal } from './Modal';

interface Portfolio {
  id: string;
  title: string;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default function PortfolioManager() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Helper function to determine if image is a URL or base64
  const isImageUrl = (imageSrc: string) => {
    return imageSrc.startsWith('http') || imageSrc.startsWith('data:');
  };

  // Helper function to get proper image source
  const getImageSrc = (imageSrc: string) => {
    if (isImageUrl(imageSrc)) {
      return imageSrc;
    }
    return `data:image/jpeg;base64,${imageSrc}`;
  };
  
  // Modal states
  const [viewModal, setViewModal] = useState<{
    isOpen: boolean;
    portfolio: Portfolio | null;
  }>({
    isOpen: false,
    portfolio: null,
  });

  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    portfolio: Portfolio | null;
  }>({
    isOpen: false,
    portfolio: null,
  });
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Other modals
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type?: 'danger' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type?: 'success' | 'error' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  // Загружаем портфолио при монтировании
  useEffect(() => {
    fetchPortfolios();
  }, []);

  // Фильтруем портфолио при изменении поискового запроса
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPortfolios(portfolios);
    } else {
      const filtered = portfolios.filter(portfolio =>
        portfolio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        portfolio.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPortfolios(filtered);
    }
  }, [searchQuery, portfolios]);

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

  const handleCreate = () => {
    resetForm();
    setCreateModal(true);
  };

  const handleView = (portfolio: Portfolio) => {
    setViewModal({
      isOpen: true,
      portfolio,
    });
  };

  const handleEdit = (portfolio: Portfolio) => {
    setTitle(portfolio.title);
    setDescription(portfolio.description);
    setImages(portfolio.images);
    setEditModal({
      isOpen: true,
      portfolio,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || images.length === 0) {
      setAlertModal({
        isOpen: true,
        title: 'Ошибка валидации',
        message: 'Пожалуйста, заполните все поля и добавьте хотя бы одно изображение',
        type: 'error'
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          images
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAlertModal({
          isOpen: true,
          title: 'Успех',
          message: 'Пример работы успешно добавлен!',
          type: 'success'
        });
        resetForm();
        setCreateModal(false);
        fetchPortfolios();
      } else {
        setAlertModal({
          isOpen: true,
          title: 'Ошибка',
          message: data.message,
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setAlertModal({
        isOpen: true,
        title: 'Ошибка',
        message: 'Произошла ошибка при отправке данных',
        type: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editModal.portfolio || !title.trim() || !description.trim()) {
      setAlertModal({
        isOpen: true,
        title: 'Ошибка валидации',
        message: 'Пожалуйста, заполните все поля',
        type: 'error'
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`/api/portfolio/${editModal.portfolio.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          images: images // Включаем обновленные изображения
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAlertModal({
          isOpen: true,
          title: 'Успех',
          message: 'Пример работы успешно обновлен!',
          type: 'success'
        });
        resetForm();
        setEditModal({ isOpen: false, portfolio: null });
        fetchPortfolios();
      } else {
        setAlertModal({
          isOpen: true,
          title: 'Ошибка',
          message: data.message,
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Ошибка обновления:', error);
      setAlertModal({
        isOpen: true,
        title: 'Ошибка',
        message: 'Произошла ошибка при обновлении данных',
        type: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: string, title: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Подтверждение удаления',
      message: `Вы уверены, что хотите удалить "${title}"? Это действие нельзя отменить.`,
      type: 'danger',
      onConfirm: () => performDelete(id)
    });
  };

  const performDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setAlertModal({
          isOpen: true,
          title: 'Успех',
          message: 'Пример работы успешно удален!',
          type: 'success'
        });
        fetchPortfolios();
      } else {
        setAlertModal({
          isOpen: true,
          title: 'Ошибка',
          message: data.message,
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Ошибка удаления:', error);
      setAlertModal({
        isOpen: true,
        title: 'Ошибка',
        message: 'Произошла ошибка при удалении',
        type: 'error'
      });
    }
  };

  const handleDeleteImage = (portfolioId: string, imageUrl: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Удаление изображения',
      message: 'Вы уверены, что хотите удалить это изображение? Это действие нельзя отменить.',
      type: 'warning',
      onConfirm: () => performDeleteImage(portfolioId, imageUrl)
    });
  };

  const performDeleteImage = async (portfolioId: string, imageUrl: string) => {
    try {
      const response = await fetch(`/api/portfolio/${portfolioId}/images`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await response.json();

      if (data.success) {
        setAlertModal({
          isOpen: true,
          title: 'Успех',
          message: 'Изображение успешно удалено!',
          type: 'success'
        });
        
        // Обновляем локальное состояние в модальном окне редактирования
        if (editModal.isOpen && editModal.portfolio) {
          const updatedImages = images.filter(img => img !== imageUrl);
          setImages(updatedImages);
          
          // Обновляем портфолио в состоянии
          setEditModal({
            ...editModal,
            portfolio: {
              ...editModal.portfolio,
              images: updatedImages
            }
          });
        }
        
        fetchPortfolios();
      } else {
        setAlertModal({
          isOpen: true,
          title: 'Ошибка',
          message: data.message,
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Ошибка удаления изображения:', error);
      setAlertModal({
        isOpen: true,
        title: 'Ошибка',
        message: 'Произошла ошибка при удалении изображения',
        type: 'error'
      });
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImages([]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3 text-white">
          <LoaderIcon size={24} />
          Загрузка портфолио...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <h2 className="text-3xl font-bold">Управление портфолио</h2>
          <button
            onClick={handleCreate}
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 flex items-center gap-2 whitespace-nowrap w-fit"
          >
            <PlusIcon size={20} />
            <span>Добавить работу</span>
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Поиск по названию или описанию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition duration-300"
            >
              <XIcon size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="mb-6">
          <p className="text-gray-300">
            Найдено проектов: <span className="text-white font-semibold">{filteredPortfolios.length}</span>
            {portfolios.length !== filteredPortfolios.length && (
              <span className="text-gray-400"> из {portfolios.length}</span>
            )}
          </p>
        </div>
      )}

      {/* Portfolio Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.length === 0 ? (
          <div className="col-span-full bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
            <PaletteIcon size={64} className="mx-auto mb-4 text-white/50" />
            <h3 className="text-xl font-semibold mb-2">Портфолио пусто</h3>
            <p className="text-gray-400 mb-6">Добавьте первый пример работы, чтобы начать</p>
            <button
              onClick={handleCreate}
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 flex items-center gap-2 mx-auto"
            >
              <PlusIcon size={20} />
              Добавить работу
            </button>
          </div>
        ) : filteredPortfolios.length === 0 ? (
          <div className="col-span-full bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
            <SearchIcon size={64} className="mx-auto mb-4 text-white/50" />
            <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-gray-400 mb-6">
              По запросу &quot;{searchQuery}&quot; не найдено ни одного проекта
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition duration-300 flex items-center gap-2 mx-auto"
            >
              <XIcon size={20} />
              Очистить поиск
            </button>
          </div>
        ) : (
          filteredPortfolios.map((portfolio) => (
            <div key={portfolio.id} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition duration-300">
              {/* Portfolio Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={portfolio.images[0]}
                  alt={portfolio.title}
                  width={400}
                  height={256}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Image count badge */}
                {portfolio.images.length > 1 && (
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
                    +{portfolio.images.length - 1}
                  </div>
                )}
              </div>

              {/* Portfolio Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                  {portfolio.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {portfolio.description}
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  Создано: {new Date(portfolio.createdAt).toLocaleDateString('ru-RU')}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(portfolio)}
                    className="flex-1 bg-white/10 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/20 transition duration-300 flex items-center justify-center gap-2"
                  >
                    <EyeIcon size={16} />
                    Просмотр
                  </button>
                  <button
                    onClick={() => handleEdit(portfolio)}
                    className="flex-1 bg-white/10 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/20 transition duration-300 flex items-center justify-center gap-2"
                  >
                    <EditIcon size={16} />
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(portfolio.id, portfolio.title)}
                    className="bg-red-600/20 text-red-400 px-3 py-2 rounded-lg text-sm hover:bg-red-600/30 transition duration-300 flex items-center justify-center"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View Modal */}
      {viewModal.isOpen && viewModal.portfolio && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Просмотр работы</h3>
                <button
                  onClick={() => setViewModal({ isOpen: false, portfolio: null })}
                  className="text-gray-400 hover:text-white p-2"
                >
                  <XIcon size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">{viewModal.portfolio?.title}</h4>
                  <pre className="text-gray-300 whitespace-pre-wrap font-sans">{viewModal.portfolio?.description}</pre>
                  <p className="text-sm text-gray-400 mt-2">
                    Создано: {viewModal.portfolio && new Date(viewModal.portfolio.createdAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>

                {/* Images */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Изображения ({viewModal.portfolio?.images.length || 0})</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {viewModal.portfolio?.images.map((imageUrl, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={getImageSrc(imageUrl)}
                          alt={`${viewModal.portfolio?.title} - ${index + 1}`}
                          width={300}
                          height={200}
                          className="w-full h-32 object-cover rounded-lg transform-none"
                        />
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                          {index + 1} / {viewModal.portfolio?.images.length}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-white/20">
                  <button
                    onClick={() => {
                      if (viewModal.portfolio) {
                        setViewModal({ isOpen: false, portfolio: null });
                        handleEdit(viewModal.portfolio);
                      }
                    }}
                    className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 flex items-center gap-2"
                  >
                    <EditIcon size={20} />
                    Редактировать
                  </button>
                  <button
                    onClick={() => {
                      if (viewModal.portfolio) {
                        setViewModal({ isOpen: false, portfolio: null });
                        handleDelete(viewModal.portfolio.id, viewModal.portfolio.title);
                      }
                    }}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300 flex items-center gap-2"
                  >
                    <TrashIcon size={20} />
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {createModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Добавить новую работу</h3>
                <button
                  onClick={() => {
                    setCreateModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-white p-2"
                >
                  <XIcon size={24} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Название проекта *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    placeholder="Например: Жилой комплекс 'Ала-Тоо'"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Описание проекта *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    placeholder="Подробное описание проекта, использованные материалы, особенности..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Изображения проекта * (1-10 изображений)
                  </label>
                  <ImageUploader
                    onImagesChange={setImages}
                    maxImages={10}
                  />
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/20">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Сохранение...' : 'Добавить работу'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCreateModal(false);
                      resetForm();
                    }}
                    className="bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition duration-300"
                  >
                    Отменить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal.isOpen && editModal.portfolio && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Редактировать работу</h3>
                <button
                  onClick={() => {
                    setEditModal({ isOpen: false, portfolio: null });
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-white p-2"
                >
                  <XIcon size={24} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Название проекта *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    placeholder="Например: Жилой комплекс 'Ала-Тоо'"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Описание проекта *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    placeholder="Подробное описание проекта, использованные материалы, особенности..."
                    required
                  />
                </div>

                {/* Existing Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Изображения проекта ({images.length})
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={getImageSrc(imageUrl)}
                          alt={`${editModal.portfolio?.title} - ${index + 1}`}
                          width={300}
                          height={128}
                          className="w-full h-32 object-cover rounded-lg transform-none"
                        />
                        
                        {/* Delete image button */}
                        {images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              if (editModal.portfolio) {
                                handleDeleteImage(editModal.portfolio.id, imageUrl);
                              }
                            }}
                            className="absolute top-2 right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-black border border-white"
                            title="Удалить изображение"
                          >
                            <XIcon size={12} />
                          </button>
                        )}
                        
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                          {index + 1} / {images.length}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {images.length === 1 && (
                    <p className="text-sm text-gray-400 mt-2">
                      ℹ️ Последнее изображение нельзя удалить. У работы должно быть минимум одно изображение.
                    </p>
                  )}
                </div>

                {/* Add New Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Добавить новые изображения (до 10 изображений всего)
                  </label>
                  <ImageUploader
                    onImagesChange={(newImages) => {
                      // Объединяем существующие изображения с новыми
                      const existingImages = images;
                      const combinedImages = [...existingImages, ...newImages];
                      
                      // Ограничиваем до 10 изображений
                      const limitedImages = combinedImages.slice(0, 10);
                      setImages(limitedImages);
                    }}
                    maxImages={10 - images.length}
                    existingImages={[]}
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    Текущее количество: {images.length} / 10
                  </p>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/20">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Сохранение...' : 'Сохранить изменения'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditModal({ isOpen: false, portfolio: null });
                      resetForm();
                    }}
                    className="bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition duration-300"
                  >
                    Отменить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        confirmText="Удалить"
        cancelText="Отменить"
      />

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
      />
    </div>
  );
}