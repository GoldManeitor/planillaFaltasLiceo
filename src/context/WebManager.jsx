//Contexto que engloba la web.
//Transferencia de datos entre paneles y secciones.

import React, { useState } from "react";

export const WebManager = React.createContext();

export default function WebManagerProvider({ children }) {
  const [openComm, setOpenComm] = useState(false);
  return (
    <WebManager.Provider value={{ openComm, setOpenComm }}>
      {children}
    </WebManager.Provider>
  );
}
