'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PortfolioManager from '@/components/PortfolioManager';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const router = useRouter();

  // Проверяем аутентификацию
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        const data = await response.json();

        if (data.success) {
          setUser(data.user);
          setLoading(false);
        } else {
          router.push('/admin');
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        router.push('/admin');
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      router.push('/admin');
    } catch (error) {
      console.error('Logout error:', error);
      // Принудительно перенаправляем даже при ошибке
      router.push('/admin');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          Загрузка...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">NUR STROY</h1>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">Панель администратора</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">
                Добро пожаловать, {user?.username || 'Администратор'}
              </span>
              <button
                onClick={handleLogout}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition duration-300"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Management */}
        <PortfolioManager />
      </div>
    </div>
  );
}
