import { grafanaDashboardUrl } from '../grafana';

export function Statistics() {
  const grafanaUrl = grafanaDashboardUrl;

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-transparent">
      <div className="p-6 border-b border-white/10 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
           Мониторинг Бота
        </h1>
      </div>

      <div className="flex-1 p-6 overflow-hidden">
        <div className="w-full h-full bg-black/20 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
          <iframe
            src={grafanaUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Grafana Dashboard"
            className="absolute inset-0 w-full h-full"
            allow="fullscreen"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
