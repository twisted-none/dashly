import React from 'react';
import { BarChart3, TrendingUp, Database, Brain, Zap, Settings, LogOut } from 'lucide-react';
import { Service } from '../types';

interface SidebarProps {
  services: Service[];
  activeService: string;
  onServiceSelect: (serviceId: string) => void;
  onLogout: () => void;
  userName: string;
}

const iconMap: Record<string, React.ReactNode> = {
  'statistics': <BarChart3 className="w-5 h-5" />,
  'metrics': <TrendingUp className="w-5 h-5" />,
  'storage': <Database className="w-5 h-5" />,
  'analytics': <Brain className="w-5 h-5" />,
  'integrations': <Zap className="w-5 h-5" />,
  'administration': <Settings className="w-5 h-5" />,
};

export function Sidebar({ services, activeService, onServiceSelect, onLogout, userName }: SidebarProps) {
  return (
    <div className="w-64 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-neon-darker border-r border-gray-300 dark:border-neon-purple/30 flex flex-col h-full shadow-lg transition-colors">
      <div className="p-6 border-b border-gray-300 dark:border-neon-purple/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-dark flex items-center justify-center text-white font-bold shadow-neon">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {userName}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
              Пользователь
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4 px-2">
          Сервисы
        </p>

        <div className="space-y-2">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => onServiceSelect(service.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                activeService === service.id
                  ? 'bg-gradient-to-r from-neon-purple to-neon-dark text-white shadow-neon dark:shadow-neon-dark'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-neon-purple dark:hover:text-neon-bright'
              }`}
            >
              {iconMap[service.id]}
              <span className="truncate">{service.name}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-300 dark:border-neon-purple/20">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neon-dark hover:text-red-600 dark:hover:text-red-400 font-semibold transition-all"
        >
          <LogOut className="w-4 h-4" />
          Выйти
        </button>
      </div>
    </div>
  );
}
