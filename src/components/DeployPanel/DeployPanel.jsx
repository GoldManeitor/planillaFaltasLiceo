//Contenedor de elementos desplegables en panel de la derecha.
import { useContext } from "react";
import { ODContext } from "../../context/ODContext";
import AddFaltaComp from "./deploy components/AddFaltaComp";
import Groups from "./deploy components/Groups";

function DeployPanel() {
  const {
    largeSize,
    setLargeSize,
    currentOption,
    setCurrentOption,
    leftLarge,
  } = useContext(ODContext);
  const btnHandler = () => {
    setLargeSize(false);
    // setCurrentOption(0);
  };
  return (
    <div
      className={`p-2 px-2 border-l dark:border-[#161616] h-full grid grid-rows-[auto_1fr] ${
        largeSize && !leftLarge
          ? "delay-100 w-full py-8 border-none"
          : "pt-8 w-64"
      }`}
    >
      <div className="w-full">
        {largeSize && !leftLarge ? (
          <>
            <button
              onClick={btnHandler}
              className="rotate-90 mr-4 hover:text-[#6200EE] dark:hover:text-[#BB86FC] mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
            </button>
          </>
        ) : null}
      </div>
      {/* FILTROS GENERALES */}
      {/* <div className="w-full flex gap-2">
        <button className="bg-[#FFFFFF] dark:bg-[#1D1D1D] border border-gray-300 dark:border-none rounded-md px-6 shadow-md">
          fecha
        </button>
        <button className="bg-[#FFFFFF] dark:bg-[#1D1D1D] border border-gray-300 dark:border-none rounded-md px-6 shadow-md">
          grupo
        </button>
      </div> */}
      {/* OPCIONES DESPLEGADAS */}
      {/* Opcion: {currentOption} */}
      {currentOption === 0 ? (
        <AddFaltaComp />
      ) : currentOption === 4 ? (
        <Groups />
      ) : null}
    </div>
  );
}

export default DeployPanel;
