import { useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { Sidebar } from './components/Sidebar';
import { ServiceCards } from './components/ServiceCards';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { ThemeToggle } from './components/ThemeToggle';
import { Audience } from './components/Audience';
import { DatabaseStats } from './components/DatabaseStats';
import { SettingsView } from './components/SettingsView';
import { LogsView } from './components/LogsView';
import { ServerStats } from './components/ServerStats';

function App() {
  const auth = useAuth();
  const [activeService, setActiveService] = useState('main');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (auth.isLoading) {
    return <div className="h-screen w-full flex items-center justify-center bg-black text-white">Loading...</div>;
  }

  if (!auth.isAuthenticated) {
    return <Login />;
  }

  const renderContent = () => {
    const userData = { 
      name: auth.user?.profile.preferred_username || 'User', 
      email: auth.user?.profile.email || 'No email', 
      role: 'admin', 
      avatar: '' 
    };

    switch (activeService) {
      case 'main':
        return <Dashboard user={userData} />;
      
      // DevOps Mastery Bot
      case 'metrics': 
        return <ServiceCards serviceName="Статистика обучения" />;
      case 'audience':
        return <Audience serviceName="Аудитория" />;
      case 'database':
        return <DatabaseStats serviceName="База данных" />;
      case 'settings':
        return <SettingsView serviceName="Настройки и темы" />;
      case 'logs':
        return <LogsView serviceName="Логи" />;

      // Server
      case 'server_load':
        return <ServerStats serviceName="Загруженность сервера" />;
        
      default:
        return <Dashboard user={userData} />;
    }
  };

  return (
    // Добавили h-screen и overflow-hidden для предотвращения общего скролла
    <div className="flex h-screen w-full overflow-hidden transition-colors duration-500
      bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50
      dark:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] dark:from-[#1a0b2e] dark:via-[#000000] dark:to-[#000000]"
    >
      <Sidebar
        activeService={activeService}
        onServiceSelect={setActiveService}
        onLogout={() => auth.signoutRedirect()}
        userName={auth.user?.profile.preferred_username || 'User'}
        isCollapsed={!sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="absolute top-6 right-6 z-50">
          <ThemeToggle />
        </div>

        {renderContent()}
      </main>
    </div>
  );
}

export default App;