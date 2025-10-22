'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageUploader from './ImageUploader';
import { PaletteIcon, PlusIcon, EditIcon, TrashIcon, LoaderIcon, XIcon } from './Icons';
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
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Modal states
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

  const handleEdit = (portfolio: Portfolio) => {
    setEditingPortfolio(portfolio);
    setTitle(portfolio.title);
    setDescription(portfolio.description);
    // Не показываем форму добавления сверху при редактировании
    setShowAddForm(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingPortfolio || !title.trim() || !description.trim()) {
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
      const response = await fetch(`/api/portfolio/${editingPortfolio.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim()
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
    setShowAddForm(false);
    setEditingPortfolio(null);
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
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Управление портфолио</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 flex items-center gap-2"
        >
          {showAddForm ? (
            <>
              <span>Отменить</span>
            </>
          ) : (
            <>
              <PlusIcon size={20} />
              <span>Добавить работу</span>
            </>
          )}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
          <h3 className="text-xl font-semibold mb-6">
            {editingPortfolio ? 'Редактировать работу' : 'Добавить новую работу'}
          </h3>
          
          <form onSubmit={editingPortfolio ? handleUpdate : handleSubmit} className="space-y-6">
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

            {!editingPortfolio && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Изображения проекта * (1-10 изображений)
                </label>
                <ImageUploader
                  onImagesChange={setImages}
                  maxImages={10}
                />
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Сохранение...' : (editingPortfolio ? 'Обновить' : 'Добавить')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition duration-300"
              >
                Отменить
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Portfolio List */}
      <div className="space-y-6">
        {portfolios.length === 0 ? (
          <div className="bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
            <PaletteIcon size={64} className="mx-auto mb-4 text-white/50" />
            <h3 className="text-xl font-semibold mb-2">Портфолио пусто</h3>
            <p className="text-gray-400 mb-6">Добавьте первый пример работы, чтобы начать</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 flex items-center gap-2 mx-auto"
            >
              <PlusIcon size={20} />
              Добавить работу
            </button>
          </div>
        ) : (
          portfolios.map((portfolio) => (
            <div key={portfolio.id} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6">
                {/* Если редактируем этот портфолио, показываем форму */}
                {editingPortfolio?.id === portfolio.id ? (
                  <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold text-white">Редактирование работы</h3>
                      <button
                        type="button"
                        onClick={() => setEditingPortfolio(null)}
                        className="text-gray-400 hover:text-white p-1"
                      >
                        <XIcon size={20} />
                      </button>
                    </div>

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

                    {/* Показываем существующие изображения */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Изображения проекта ({portfolio.images.length})
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {portfolio.images.map((imageUrl, index) => (
                          <div key={index} className="relative group">
                            <Image
                              src={imageUrl}
                              alt={`${portfolio.title} - ${index + 1}`}
                              width={300}
                              height={128}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            
                            {/* Кнопка удаления изображения */}
                            {portfolio.images.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleDeleteImage(portfolio.id, imageUrl)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                title="Удалить изображение"
                              >
                                <XIcon size={12} />
                              </button>
                            )}
                            
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                              {index + 1} / {portfolio.images.length}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {portfolio.images.length === 1 && (
                        <p className="text-sm text-gray-400 mt-2">
                          ℹ️ Последнее изображение нельзя удалить. У работы должно быть минимум одно изображение.
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? 'Сохранение...' : 'Сохранить изменения'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingPortfolio(null)}
                        className="bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition duration-300"
                      >
                        Отменить
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Обычное отображение карточки */
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{portfolio.title}</h3>
                        <pre className="text-gray-300 mb-4 whitespace-pre-wrap font-sans">{portfolio.description}</pre>
                        <p className="text-sm text-gray-400">
                          Создано: {new Date(portfolio.createdAt).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(portfolio)}
                          className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition duration-300 flex items-center gap-2"
                        >
                          <EditIcon size={16} />
                          Редактировать
                        </button>
                        <button
                          onClick={() => handleDelete(portfolio.id, portfolio.title)}
                          className="bg-red-600/20 text-red-400 px-4 py-2 rounded-lg text-sm hover:bg-red-600/30 transition duration-300 flex items-center gap-2"
                        >
                          <TrashIcon size={16} />
                          Удалить
                        </button>
                      </div>
                    </div>

                    {/* Images Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {portfolio.images.map((imageUrl, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={imageUrl}
                            alt={`${portfolio.title} - ${index + 1}`}
                            width={300}
                            height={128}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                            {index + 1} / {portfolio.images.length}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

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
