//Contexto entre OptionPanel y DeployPanel.
//Debe interactuar entre los dos para que las opciones elegidas se
//desplieguen en el otro panel.
import React, { useState } from "react";

export const ODContext = React.createContext();

export default function ODContextProvider({ children }) {
  const [largeSize, setLargeSize] = useState(false);
  const [currentOption, setCurrentOption] = useState(0);
  const [leftLarge, setLeftLarge] = useState(false);
  const [leftOption, setLeftOption] = useState();

  const [actualizar, setActualizar] = useState(true);

  return (
    <ODContext.Provider
      value={{
        largeSize,
        setLargeSize,
        currentOption,
        setCurrentOption,
        leftLarge,
        setLeftLarge,
        leftOption,
        setLeftOption,
        actualizar,
        setActualizar,
      }}
    >
      {children}
    </ODContext.Provider>
  );
}
