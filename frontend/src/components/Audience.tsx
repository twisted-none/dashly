import React from 'react';
import { botAnalyticsSoloUrl } from '../grafana';

interface AudienceProps {
  serviceName: string;
}

/**
 * ПОДСТАВЬ ID ПАНЕЛЕЙ ИЗ РАЗДЕЛА "АУДИТОРИЯ"
 */
const PANEL_IDS = {
  totalUsers: "1",      // Всего пользователей
  questionSub: "2",     // Подписка на вопросы
  theorySub: "3",      // Подписка на теорию
  customTopics: "4",    // Кастомные любимые темы
  sleepingUsers: "21"    // Спящие пользователи
};

const GRAFANA_BASE_URL = botAnalyticsSoloUrl;

export function Audience({ serviceName }: AudienceProps) {
  
  const getGrafanaSrc = (panelId: string) => {
    const params = new URLSearchParams({
      orgId: "1",
      refresh: "5s",
      theme: "dark",
      panelId: panelId,
      timezone: "browser",
    });
    return `${GRAFANA_BASE_URL}?${params.toString()}`;
  };

  const ChartBox = ({ title, panelId, className = "" }: { title: string, panelId: string, className?: string }) => (
    <div className={`flex flex-col bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-violet-500/30 ${className}`}>
      <div className="flex-1 relative">
        <iframe
          src={getGrafanaSrc(panelId)}
          width="100%"
          height="100%"
          frameBorder="0"
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="fullscreen"
        ></iframe>
      </div>
    </div>
  );

  return (
    <div className="flex-1 w-full h-full flex flex-col overflow-y-auto bg-transparent [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:display-none">
      
      {/* Хедер страницы */}
      <div className="p-6 pb-2 border-b border-white/10 backdrop-blur-md z-10">
        <div className="max-w-[1600px] mx-auto w-full">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
             {serviceName}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Базовые метрики аудитории и вовлеченность пользователей
          </p>
        </div>
      </div>

      {/* Сетка графиков */}
      <div className="flex-1 p-6">
        <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          {/* ВЕРХНИЙ РЯД: 3 карточки */}
          <ChartBox title="Всего пользователей" panelId={PANEL_IDS.totalUsers} className="col-span-12 lg:col-span-4 h-64" />
          <ChartBox title="Подписка на вопросы" panelId={PANEL_IDS.questionSub} className="col-span-12 lg:col-span-4 h-64" />
          <ChartBox title="Подписка на теорию" panelId={PANEL_IDS.theorySub} className="col-span-12 lg:col-span-4 h-64" />

          {/* НИЖНИЙ РЯД: 2 карточки пошире */}
          <ChartBox title="Кастомные любимые темы" panelId={PANEL_IDS.customTopics} className="col-span-12 lg:col-span-6 h-64" />
          <ChartBox title="Спящие пользователи" panelId={PANEL_IDS.sleepingUsers} className="col-span-12 lg:col-span-6 h-64" />

        </div>
      </div>
    </div>
  );
}
