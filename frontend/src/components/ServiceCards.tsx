import React from 'react';
import { botAnalyticsSoloUrl } from '../grafana';

interface ServiceCardsProps {
  serviceName: string;
}

/**
 * ТУТ ПОДСТАВЬ СВОИ ID ПАНЕЛЕЙ ИЗ GRAFANA
 */
const PANEL_IDS = {
  solvedQuestions: "27",      // Решено вопросов
  correctPercent: "33",       // % верных (практика)
  testsPassed: "28",          // Пройдено тестов
  averageScore: "29",         // Средний балл тестов
  topicDifficulty: "31",      // Сложность тем (% ошибок)
  topicProgress: "32",        // Успеваемость по темам (тесты)
  activityChart: "30"         // Активность: Ответы
};

const GRAFANA_BASE_URL = botAnalyticsSoloUrl;

export function ServiceCards({ serviceName }: ServiceCardsProps) {
  
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
      {/* Убрали верхнюю плашку с названием, так как в Grafana уже есть заголовки */}
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
    // Добавлены классы для скрытия скроллбара: scrollbar-width-none и прочие
    <div className="flex-1 w-full h-full flex flex-col overflow-y-auto bg-transparent [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:display-none">
      
      {/* Хедер страницы */}
      <div className="p-6 pb-2 border-b border-white/10 backdrop-blur-md z-10">
        <div className="max-w-[1600px] mx-auto w-full">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
             Статистика обучения
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Аналитика успеваемости и активности в режиме реального времени
          </p>
        </div>
      </div>

      {/* Основная сетка графиков */}
      <div className="flex-1 p-6">
        <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          {/* ВЕРХНИЙ РЯД */}
          <ChartBox title="Решено вопросов" panelId={PANEL_IDS.solvedQuestions} className="col-span-12 sm:col-span-6 lg:col-span-3 h-40" />
          <ChartBox title="% верных (практика)" panelId={PANEL_IDS.correctPercent} className="col-span-12 sm:col-span-6 lg:col-span-3 h-40" />
          <ChartBox title="Пройдено тестов" panelId={PANEL_IDS.testsPassed} className="col-span-12 sm:col-span-6 lg:col-span-3 h-40" />
          <ChartBox title="Средний балл тестов" panelId={PANEL_IDS.averageScore} className="col-span-12 sm:col-span-6 lg:col-span-3 h-40" />

          {/* НИЖНИЙ РЯД */}
          <div className="col-span-12 lg:col-span-6 grid grid-cols-1 gap-4">
            <ChartBox title="Сложность тем (% ошибок)" panelId={PANEL_IDS.topicDifficulty} className="h-64" />
            <ChartBox title="Успеваемость по темам (тесты)" panelId={PANEL_IDS.topicProgress} className="h-64" />
          </div>

          <ChartBox 
            title="Активность: Ответы (за последний час)" 
            panelId={PANEL_IDS.activityChart} 
            className="col-span-12 lg:col-span-6 h-[528px]" 
          />

        </div>
      </div>
    </div>
  );
}
