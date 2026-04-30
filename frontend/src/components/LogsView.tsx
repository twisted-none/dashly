import React from 'react';
import { botMonitoringSoloUrl } from '../grafana';

interface LogsViewProps {
  serviceName: string;
}

/**
 * ПОДСТАВЬ ID ПАНЕЛЕЙ ИЗ ДАШБОРДА "LOGS"
 */
const PANEL_IDS = {
  infoCount: "9",      // Bot Info Logs Count (5m)
  errorCount: "4",     // Bot Error Logs Count (5m)
  logsTable: "5"       // Сами Bot Logs (таблица)
};

// ВНИМАНИЕ: Базовый URL тут отличается от предыдущих страниц!
const GRAFANA_BASE_URL = botMonitoringSoloUrl;

export function LogsView({ serviceName }: LogsViewProps) {
  
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
            Мониторинг событий и ошибок работы DevOps Mastery Bot в реальном времени
          </p>
        </div>
      </div>

      {/* Контент: Сетка логов */}
      <div className="flex-1 p-6">
        <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          {/* ВЕРХНИЙ РЯД: Счетчики */}
          <ChartBox title="Info Logs Count" panelId={PANEL_IDS.infoCount} className="col-span-12 lg:col-span-6 h-48" />
          <ChartBox title="Error Logs Count" panelId={PANEL_IDS.errorCount} className="col-span-12 lg:col-span-6 h-48" />

          {/* НИЖНИЙ РЯД: Большая таблица логов */}
          <ChartBox title="Bot Logs Output" panelId={PANEL_IDS.logsTable} className="col-span-12 h-[600px]" />

        </div>
      </div>
    </div>
  );
}
