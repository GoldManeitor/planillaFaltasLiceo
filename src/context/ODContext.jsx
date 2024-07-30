//Contexto entre OptionPanel y DeployPanel.
//Debe interactuar entre los dos para que las opciones elegidas se
//desplieguen en el otro panel.
import React, { useState } from "react";

export const ODContext = React.createContext();

export default function ODContextProvider({ children }) {
  const [largeSize, setLargeSize] = useState(false);
  const [currentOption, setCurrentOption] = useState(0);

  return (
    <ODContext.Provider
      value={{
        largeSize,
        setLargeSize,
        currentOption,
        setCurrentOption,
      }}
    >
      {children}
    </ODContext.Provider>
  );
}
