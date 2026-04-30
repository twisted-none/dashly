import React from 'react';
import { botAnalyticsSoloUrl } from '../grafana';

interface SettingsViewProps {
  serviceName: string;
}

/**
 * ПОДСТАВЬ ID ПАНЕЛЕЙ ИЗ РАЗДЕЛА "НАСТРОЙКИ И ТЕМЫ"
 */
const PANEL_IDS = {
  topQuestions: "10", // Топ тем (Вопросы)
  topTheory: "11",    // Топ тем (Теория)
  topTips: "25"       // Топ тем (Советы)
};

const GRAFANA_BASE_URL = botAnalyticsSoloUrl;

export function SettingsView({ serviceName }: SettingsViewProps) {
  
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
            Популярные темы и конфигурации пользовательских предпочтений
          </p>
        </div>
      </div>

      {/* Сетка графиков (3 одинаковых блока в ряд) */}
      <div className="flex-1 p-6">
        <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          <ChartBox title="Топ тем (Вопросы)" panelId={PANEL_IDS.topQuestions} className="col-span-12 lg:col-span-4 h-96" />
          <ChartBox title="Топ тем (Теория)" panelId={PANEL_IDS.topTheory} className="col-span-12 lg:col-span-4 h-96" />
          <ChartBox title="Топ тем (Советы)" panelId={PANEL_IDS.topTips} className="col-span-12 lg:col-span-4 h-96" />

        </div>
      </div>
    </div>
  );
}
