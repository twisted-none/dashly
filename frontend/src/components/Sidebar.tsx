import React from 'react';
import { 
  BarChart3, Database, Settings, 
  LogOut, ChevronRight, LayoutDashboard, Menu,
  GraduationCap, Users, ScrollText, Activity, Hammer
} from 'lucide-react';

interface SidebarProps {
  activeService: string;
  onServiceSelect: (serviceId: string) => void;
  onLogout: () => void;
  userName: string;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

// Новая структура меню по разделам
const MENU_SECTIONS = [
  {
    title: 'Основное',
    items: [
      { id: 'main', label: 'Главная', icon: <LayoutDashboard className="w-5 h-5" /> },
    ]
  },
  {
    title: 'DevOps Mastery Bot + Miniapp',
    items: [
      { id: 'metrics', label: 'Статистика обучения', icon: <GraduationCap className="w-5 h-5" /> },
      { id: 'audience', label: 'Аудитория', icon: <Users className="w-5 h-5" /> },
      { id: 'database', label: 'База данных', icon: <Database className="w-5 h-5" /> },
      { id: 'settings', label: 'Настройки и темы', icon: <Settings className="w-5 h-5" /> },
      { id: 'logs', label: 'Логи', icon: <ScrollText className="w-5 h-5" /> },
    ]
  },
  {
    title: 'FutRat',
    items: [
      { id: 'futrat_dev', label: 'Еще в разработке...', icon: <Hammer className="w-5 h-5" />, disabled: true },
    ]
  },
  {
    title: 'Server',
    items: [
      { id: 'server_load', label: 'Загруженность сервера', icon: <Activity className="w-5 h-5" /> },
    ]
  }
];

export function Sidebar({ 
  activeService, onServiceSelect, onLogout, userName, 
  isCollapsed, toggleSidebar 
}: SidebarProps) {
  
  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-72'} flex flex-col h-full border-r transition-all duration-300 ease-in-out z-20 relative
      bg-white/50 border-white/40 backdrop-blur-xl shadow-xl
      dark:bg-black/20 dark:border-white/10`}
    >
      {/* Хедер: Лого + Бургер */}
      <div className="p-4 border-b border-gray-200/50 dark:border-white/5 flex flex-col gap-4">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className={`font-extrabold text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 ${isCollapsed ? 'hidden' : 'block'}`}>
            DASHLY
          </div>
          <button onClick={toggleSidebar} className="p-2 rounded-lg text-gray-500 hover:bg-white/50 dark:hover:bg-white/10 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Профиль */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            <p className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[140px]">{userName}</p>
            <p className="text-xs text-violet-600 dark:text-violet-400 font-medium">Administrator</p>
          </div>
        </div>
      </div>

      {/* Список меню */}
      <nav className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-6">
        {MENU_SECTIONS.map((section, idx) => (
          <div key={idx}>
            {!isCollapsed && (
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3 px-4">
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = activeService === item.id;
                const isDisabled = item.disabled;

                return (
                  <button
                    key={item.id}
                    disabled={isDisabled}
                    onClick={() => !isDisabled && onServiceSelect(item.id)}
                    className={`group relative w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-between px-4'} py-2.5 rounded-xl transition-all duration-200 ${
                      isDisabled 
                        ? 'opacity-40 cursor-not-allowed' 
                        : isActive
                          ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-violet-50/50 dark:hover:bg-white/5 hover:text-violet-700 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400'}>
                        {item.icon}
                      </span>
                      {!isCollapsed && (
                        <span className="font-medium text-sm whitespace-nowrap">
                          {item.label}
                        </span>
                      )}
                    </div>
                    {!isCollapsed && isActive && <ChevronRight className="w-4 h-4 text-white/80" />}
                  </button>
                );
              })}
            </div>
            {!isCollapsed && idx !== MENU_SECTIONS.length - 1 && (
              <div className="mt-6 mx-4 border-b border-gray-100 dark:border-white/5"></div>
            )}
          </div>
        ))}
      </nav>

      {/* Футер */}
      <div className="p-3 border-t border-gray-200/50 dark:border-white/5">
        <button onClick={onLogout} className={`group w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl transition-all duration-300 text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/10`}>
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="font-semibold text-sm">Выйти</span>}
        </button>
      </div>
    </div>
  );
}