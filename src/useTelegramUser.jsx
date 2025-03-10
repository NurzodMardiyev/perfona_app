import { useEffect, useState } from "react";

const useTelegramUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const telegram = window.Telegram.WebApp;
      const userData = telegram.initDataUnsafe?.user; // Get user data from Telegram
      setUser(userData);
    }
  }, []);

  return user;
};

export default useTelegramUser;
