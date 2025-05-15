import { createContext, useState } from "react";
import useTelegramUser from "../useTelegramUser";

export const contextPerfona = createContext();

export default function ContextApiProvider({ children }) {
  const [id, setId] = useState("1");
  const [pageNumberId, setPageNumberId] = useState(1);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const user = useTelegramUser();

  return (
    <contextPerfona.Provider
      value={{
        id,
        user,
        setId,
        pageNumberId,
        setPageNumberId,
        isInputFocused,
        setIsInputFocused,
      }}
    >
      {children}
    </contextPerfona.Provider>
  );
}
