//Contexto que engloba la web.
//Transferencia de datos entre paneles y secciones.

import React, { useState } from "react";

export const WebManager = React.createContext();

export default function WebManagerProvider({ children }) {
  return <WebManager.Provider value={{}}>{children}</WebManager.Provider>;
}
