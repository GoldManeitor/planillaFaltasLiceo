//Contexto que engloba la web.
//Transferencia de datos entre paneles y secciones.

import React, { useState } from "react";

export const WebManager = React.createContext();

export default function WebManagerProvider({ children }) {
  const [openComm, setOpenComm] = useState(false);
  const [alumnoSelected, setAlumnoSelected] = useState();

  return (
    <WebManager.Provider value={{ openComm, setOpenComm, alumnoSelected, setAlumnoSelected }}>
      {children}
    </WebManager.Provider>
  );
}
