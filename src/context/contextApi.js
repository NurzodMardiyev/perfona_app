import { createContext, useState } from "react";
import PropTypes from "prop-types";

const ContextPerfona = createContext();

export default function ContextApi({ children }) {
  const [id, setId] = useState();
  return (
    <ContextPerfona.Provider value={id}>{children}</ContextPerfona.Provider>
  );
}
