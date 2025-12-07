import React from 'react';
import { User } from '../types';

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Доброе утро' : hour < 18 ? 'Добрый день' : 'Добрый вечер';

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-neon-darker">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-neon-purple to-neon-dark flex items-center justify-center text-white font-bold text-4xl shadow-neon dark:shadow-neon-dark mb-6">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          {greeting},
          <br />
          <span className="bg-gradient-to-r from-neon-purple to-neon-dark dark:from-neon-bright dark:to-neon-purple bg-clip-text text-transparent">
            {user.name}!  
          </span>
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
          Добро пожаловать обратно в вашу панель управления
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-neon-purple/30 shadow-lg dark:shadow-neon-dark/20">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              Email
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {user.email}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-neon-purple/30 shadow-lg dark:shadow-neon-dark/20">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              Статус
            </p>
            <p className="text-lg font-semibold text-neon-purple dark:text-neon-bright">
              Активен
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-neon-purple/30 shadow-lg dark:shadow-neon-dark/20">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              Дата входа
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-neon-purple/10 to-neon-dark/10 dark:from-neon-purple/20 dark:to-neon-dark/20 border border-neon-purple/30 dark:border-neon-bright/30 rounded-xl p-6 text-left">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold text-neon-purple dark:text-neon-bright">
              Совет:
            </span>{' '}
            Выберите сервис из меню слева, чтобы начать работу с данными. Вы
            можете переключаться между статистикой, метриками, хранилищем и
            другими инструментами.
          </p>
        </div>
      </div>
    </div>
  );
}
