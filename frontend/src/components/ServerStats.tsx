import React from 'react';
import { botMonitoringSoloUrl } from '../grafana';

interface ServerStatsProps {
  serviceName: string;
}

/**
 * ПОДСТАВЬ ID ПАНЕЛЕЙ ИЗ ДАШБОРДА "SERVER MONITORING"
 */
const PANEL_IDS = {
  cpuUsage: "6",      // Server CPU Usage
  memoryUsage: "7",   // Server Memory Usage
  diskUsage: "8",     // Disk Usage
  uptime: "10",        // Server Uptime
  networkPackets: "11" // Bot Network Packets
};

// URL тот же, что и у Логов
const GRAFANA_BASE_URL = botMonitoringSoloUrl;

export function ServerStats({ serviceName }: ServerStatsProps) {
  
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
            Мониторинг ресурсов хоста: процессор, память и сетевая активность
          </p>
        </div>
      </div>

      {/* Сетка графиков сервера */}
      <div className="flex-1 p-6">
        <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          {/* РЯД 1: CPU и RAM */}
          <ChartBox title="Server CPU Usage" panelId={PANEL_IDS.cpuUsage} className="col-span-12 lg:col-span-6 h-64" />
          <ChartBox title="Server Memory Usage" panelId={PANEL_IDS.memoryUsage} className="col-span-12 lg:col-span-6 h-64" />

          {/* РЯД 2: Диск и Аптайм */}
          <ChartBox title="Disk Usage" panelId={PANEL_IDS.diskUsage} className="col-span-12 lg:col-span-6 h-64" />
          <ChartBox title="Server Uptime" panelId={PANEL_IDS.uptime} className="col-span-12 lg:col-span-6 h-64" />

          {/* РЯД 3: Сетевые пакеты (Широкий) */}
          <ChartBox title="Bot Network Packets" panelId={PANEL_IDS.networkPackets} className="col-span-12 h-80" />

        </div>
      </div>
    </div>
  );
}
