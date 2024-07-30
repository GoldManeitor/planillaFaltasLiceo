//Contexto que engloba los botones de Home.
//Botones: logout, DarkMode.

import React, { useState } from "react";

export const HBtnContext = React.createContext();

export default function HBtnContextProvider({ children }) {
  return <HBtnContext.Provider value={{}}>{children}</HBtnContext.Provider>;
}
