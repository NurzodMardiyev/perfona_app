import { createContext, useState } from "react";
import useTelegramUser from "../useTelegramUser";

export const contextPerfona = createContext();

export default function ContextApiProvider({ children }) {
  const [id, setId] = useState("1");
  const user = useTelegramUser();

  return (
    <contextPerfona.Provider value={{ id, user, setId }}>
      {children}
    </contextPerfona.Provider>
  );
}
