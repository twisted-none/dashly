import { Lock, AlertCircle } from 'lucide-react';
import { useAuth } from 'react-oidc-context';
import { useState } from 'react';

export function Login() {
  const auth = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      // Логируем настройки, чтобы проверить, видит ли их код
      console.log("Auth Config:", {
        authority: auth.settings.authority,
        client_id: auth.settings.client_id,
        redirect: auth.settings.redirect_uri
      });

      if (!auth.settings.authority || !auth.settings.client_id) {
        throw new Error("Не загрузились настройки Keycloak из .env файла");
      }

      await auth.signinRedirect();
    } catch (err: any) {
      console.error("Login failed:", err);
      // Если ошибка связана с криптографией
      if (err.message && err.message.includes("crypto")) {
        setError("Браузер заблокировал вход. См. инструкцию ниже.");
      } else {
        setError(err.message || "Произошла ошибка при переадресации");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-neon-darker dark:to-gray-950 flex items-center justify-center p-4 transition-colors">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-neon-dark p-8 border border-gray-200 dark:border-neon-purple/30">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-neon-purple to-neon-dark p-4 rounded-xl shadow-neon dark:shadow-neon-dark">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
            Dashly
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Войдите через корпоративный аккаунт
          </p>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
               <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
               <div className="text-sm text-red-600 dark:text-red-400">
                 {error}
                 {error.includes("Браузер") && (
                   <p className="mt-2 text-xs opacity-90">
                     При работе по HTTP (не localhost) браузер отключает функции шифрования.
                     <br/>
                     <strong>Решение для Chrome:</strong> перейдите по ссылке <code>chrome://flags/#unsafely-treat-insecure-origin-as-secure</code>, введите IP вашего сервера, выберите Enable и перезапустите браузер.
                   </p>
                 )}
               </div>
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-neon-purple to-neon-dark hover:from-neon-dark hover:to-neon-darker text-white font-semibold py-3 rounded-lg transition-all shadow-neon hover:shadow-neon-dark dark:shadow-neon-dark dark:hover:shadow-neon-dark flex items-center justify-center gap-2"
          >
            Войти через Keycloak
          </button>
        </div>
      </div>
    </div>
  );
}