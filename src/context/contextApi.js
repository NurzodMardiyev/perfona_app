import { createContext, useState } from "react";
import PropTypes from "prop-types";
import useTelegramUser from "../useTelegramUser ";

export const ContextPerfona = createContext();

export default function ContextApi({ children }) {
  const user = useTelegramUser();

  console.log(user);
  const [id, setId] = useState();
  return (
    <ContextPerfona.Provider value={(id, user)}>
      {children}
    </ContextPerfona.Provider>
  );
}
