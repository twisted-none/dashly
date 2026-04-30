import React, { useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { AlertCircle, LogIn } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Login() {
  const auth = useAuth();
  const [error, setError] = useState<string | null>(null);

  // Функция для установки куки на родительский домен, 
  // чтобы она была доступна и на dash.domain.com, и на auth.domain.com
  const setThemeCookie = (theme: string) => {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    
    // Эвристика: если это не localhost и не IP-адрес, пробуем поставить куку на уровень выше
    // Пример: dash.example.com -> .example.com
    // Cookie на родительском домене будет видна и для auth...
    let domainString = hostname;
    if (parts.length > 2 && !/^\d+$/.test(parts[parts.length - 1])) {
       // Берем все части, кроме первой (subdomain)
       domainString = '.' + parts.slice(1).join('.');
    }

    // Ставим куку на 1 год
    document.cookie = `kc-theme=${theme}; domain=${domainString}; path=/; max-age=31536000; SameSite=Lax`;
    console.log(`Setting cross-domain cookie: kc-theme=${theme} on domain ${domainString}`);
  };

  const handleLogin = async () => {
    try {
      // 1. Получаем текущую тему
      const savedTheme = localStorage.getItem('theme') || 'light';

      console.log("Preparing login with theme:", savedTheme);
      
      // 2. ЗАПИСЫВАЕМ КУКУ перед редиректом
      setThemeCookie(savedTheme);

      if (!auth.settings.authority || !auth.settings.client_id) {
        throw new Error("Не загрузились настройки Keycloak из .env файла");
      }

      // 3. Отправляем тему также и в параметре (на всякий случай)
      await auth.signinRedirect({
        extraQueryParams: {
          theme: savedTheme
        }
      });
    } catch (err: any) {
      console.error("Login failed:", err);
      if (err.message && err.message.includes("crypto")) {
        setError("Браузер заблокировал вход. См. инструкцию ниже.");
      } else {
        setError(err.message || "Произошла ошибка при переадресации");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 transition-colors duration-500
      bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50
      dark:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] dark:from-[#1a0b2e] dark:via-[#000000] dark:to-[#000000]"
    >
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-[26rem]">
        <div className="backdrop-blur-xl rounded-3xl p-10 shadow-2xl border transition-all duration-300
          bg-white/70 border-white/50 shadow-purple-200/50
          dark:bg-white/5 dark:border-white/10 dark:shadow-black/50"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-[0.15em] mb-2 uppercase
              bg-clip-text text-transparent bg-gradient-to-r 
              from-violet-900 to-fuchsia-700
              dark:from-white dark:to-purple-300"
            >
              Dashly
            </h1>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Система управления
            </p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 rounded-xl flex items-start gap-3 border
              bg-red-50 border-red-200 text-red-700
              dark:bg-red-900/20 dark:border-red-500/30 dark:text-red-300"
            >
               <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
               <div className="text-sm">
                 <p className="font-semibold">{error}</p>
                 {error.includes("Браузер") && (
                   <p className="mt-2 text-xs opacity-90 leading-relaxed">
                     Chrome flags: <code>chrome://flags/#unsafely-treat-insecure-origin-as-secure</code>
                   </p>
                 )}
               </div>
            </div>
          )}

          <button
            onClick={handleLogin}
            className="group w-full py-3.5 px-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300
              text-white shadow-lg transform active:scale-[0.98]
              bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500
              shadow-violet-500/20 hover:shadow-violet-500/40
              dark:shadow-violet-900/40 dark:hover:shadow-violet-600/60
              flex items-center justify-center gap-3"
          >
            <LogIn className="w-5 h-5 opacity-90 group-hover:translate-x-1 transition-transform" />
            Войти через Keycloak
          </button>

          <div className="mt-8 text-center">
             <p className="text-xs text-gray-400 dark:text-gray-500">
               Корпоративный доступ
             </p>
          </div>

        </div>
      </div>
    </div>
  );
}
