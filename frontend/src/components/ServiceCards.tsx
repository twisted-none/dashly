import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Database,
  Brain,
  Zap,
  Settings,
  ArrowRight,
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardsProps {
  items: ServiceItem[];
  serviceName: string;
}

const iconMap: Record<string, React.ReactNode> = {
  'chart': <BarChart3 className="w-8 h-8" />,
  'trend': <TrendingUp className="w-8 h-8" />,
  'database': <Database className="w-8 h-8" />,
  'brain': <Brain className="w-8 h-8" />,
  'zap': <Zap className="w-8 h-8" />,
  'settings': <Settings className="w-8 h-8" />,
};

export function ServiceCards({ items, serviceName }: ServiceCardsProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-8 border-b border-gray-200 dark:border-neon-purple/20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {serviceName}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Управляйте и анализируйте данные
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-neon-purple/30 hover:border-neon-purple dark:hover:border-neon-bright shadow-lg hover:shadow-2xl dark:hover:shadow-neon-dark transition-all duration-300 cursor-pointer hover:-translate-y-2"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: 'slideUp 0.5s ease-out',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-neon-purple/20 to-neon-dark/20 dark:from-neon-purple/40 dark:to-neon-dark/40 p-3 rounded-lg group-hover:shadow-neon dark:group-hover:shadow-neon-dark transition-all">
                  <div className="text-neon-purple dark:text-neon-bright">
                    {iconMap[item.icon] || iconMap['chart']}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-neon-purple dark:group-hover:text-neon-bright transition-colors transform group-hover:translate-x-1" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neon-purple/20 flex items-center text-sm font-semibold text-neon-purple dark:text-neon-bright group-hover:gap-2 transition-all">
                <span>Подробнее</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
