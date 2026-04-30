import React from 'react';
import { botAnalyticsSoloUrl } from '../grafana';

interface DatabaseStatsProps {
  serviceName: string;
}

/**
 * ПОДСТАВЬ ID ПАНЕЛЕЙ ИЗ РАЗДЕЛА "КОНТЕНТ БАЗЫ ДАННЫХ"
 */
const PANEL_IDS = {
  questions: "16",   // Вопросы (график)
  theory: "17",      // Теория (график)
  tips: "20",        // Советы (график)
  summaryTable: "18" // Сводка контента (таблица)
};

const GRAFANA_BASE_URL = botAnalyticsSoloUrl;

export function DatabaseStats({ serviceName }: DatabaseStatsProps) {
  
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
            Анализ наполнения базы данных по дисциплинам и категориям
          </p>
        </div>
      </div>

      {/* Сетка графиков */}
      <div className="flex-1 p-6">
        <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          {/* ВЕРХНИЙ РЯД: 3 колонки (Вопросы, Теория, Советы) */}
          <ChartBox title="Вопросы" panelId={PANEL_IDS.questions} className="col-span-12 lg:col-span-4 h-80" />
          <ChartBox title="Теория" panelId={PANEL_IDS.theory} className="col-span-12 lg:col-span-4 h-80" />
          <ChartBox title="Советы" panelId={PANEL_IDS.tips} className="col-span-12 lg:col-span-4 h-80" />

          {/* НИЖНИЙ РЯД: 1 большая таблица */}
          <ChartBox title="Сводка контента" panelId={PANEL_IDS.summaryTable} className="col-span-12 h-[500px]" />

        </div>
      </div>
    </div>
  );
}
