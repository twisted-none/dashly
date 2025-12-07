import { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { ServiceCards } from './components/ServiceCards';
import { Dashboard } from './components/Dashboard';
import { ThemeToggle } from './components/ThemeToggle';
import { Service, ServiceItem, User } from './types';
import { fetchServiceItems } from './api';

const SERVICES: Service[] = [
  { id: 'statistics', name: 'Статистика', icon: 'chart' },
  { id: 'metrics', name: 'Метрики', icon: 'trend' },
  { id: 'storage', name: 'Хранилища', icon: 'database' },
  { id: 'analytics', name: 'Аналитика', icon: 'brain' },
  { id: 'integrations', name: 'Интеграции', icon: 'zap' },
  { id: 'administration', name: 'Администрирование', icon: 'settings' },
];

function App() {
  const auth = useAuth();
  const [activeService, setActiveService] = useState<string>('statistics');
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Загружаем данные при смене сервиса
  useEffect(() => {
    if (auth.isAuthenticated && activeService !== 'statistics') {
      setLoading(true);
      fetchServiceItems(activeService, auth.user)
        .then((data) => setServiceItems(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [activeService, auth.isAuthenticated, auth.user]);

  // Показываем загрузку, пока Keycloak проверяет сессию
  if (auth.isLoading) {
    return <div className="flex h-screen items-center justify-center bg-gray-900 text-neon-purple">Загрузка...</div>;
  }

  // Если не авторизован -> страница логина
  if (!auth.isAuthenticated) {
    return <Login />;
  }

  // Создаем объект User из данных токена Keycloak
  const user: User = {
    id: auth.user?.profile.sub || '',
    name: auth.user?.profile.name || auth.user?.profile.preferred_username || 'User',
    email: auth.user?.profile.email || '',
  };

  const handleLogout = () => {
    auth.removeUser();
    auth.signoutRedirect();
  };

  const currentService = SERVICES.find((s) => s.id === activeService);
  const isDefaultService = activeService === 'statistics';

  return (
    <div className="flex h-screen bg-white dark:bg-gray-950 transition-colors">
      <Sidebar
        services={SERVICES}
        activeService={activeService}
        onServiceSelect={setActiveService}
        onLogout={handleLogout}
        userName={user.name}
      />

      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b border-gray-300 dark:border-neon-purple/20 bg-white dark:bg-gray-900 flex items-center justify-end px-8 shadow-sm transition-colors">
          <ThemeToggle />
        </div>

        {/* Контент */}
        {isDefaultService ? (
          <Dashboard user={user} />
        ) : (
          <>
             {loading ? (
                <div className="flex-1 flex items-center justify-center text-gray-500">Загрузка данных...</div>
             ) : (
                <ServiceCards
                  items={serviceItems}
                  serviceName={currentService?.name || 'Сервис'}
                />
             )}
          </>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;