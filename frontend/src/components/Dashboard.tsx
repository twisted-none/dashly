import React from 'react';
import { User } from '../types';

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {
  const hour = new Date().getHours();
  
  // Логика приветствия (исправленная: 0-6 ночь, 6-12 утро, 12-18 день, 18-00 вечер)
  const greeting =
    hour < 6
      ? 'Доброй ночи'
      : hour < 12
      ? 'Доброе утро'
      : hour < 18
      ? 'Добрый день'
      : 'Добрый вечер';

  return (
    <div className="flex-1 w-full h-full overflow-y-auto flex flex-col items-center p-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:display-none">
      <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700 my-auto">
        
        {/* Приветствие */}
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="w-28 h-28 mx-auto rounded-full 
              bg-gradient-to-br from-violet-600 to-fuchsia-600 
              flex items-center justify-center text-white font-bold text-5xl 
              shadow-2xl shadow-violet-500/30 dark:shadow-violet-900/50"
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -inset-2 rounded-full border border-violet-500/20 dark:border-white/10 animate-pulse"></div>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-white">
            {greeting}, <br className="md:hidden" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600">
              {user.name}!
            </span>
          </h1>

          <div className="space-y-2">
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              Добро пожаловать в панель управления Dashly.
            </p>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
              Здесь вы можете посмотреть статистику и графики работы приложений 
              <span className="text-violet-600 dark:text-violet-400 font-semibold"> DevOps Matery Bot</span>, 
              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold"> FutRat</span>, 
              самого сервера и другие метрики.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}