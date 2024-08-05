//Contenedor de tablas de alumnos y grupos en panel central.
import { useContext } from "react";
import { ODContext } from "../../context/ODContext";
import DashedSection from "./DashedSection";
import Tables from "./tables components/Tables";

function TablesPanel() {
  const {
    largeSize,
    setLargeSize,
    currentOption,
    setCurrentOption,
    leftLarge,
    setLeftLarge,
    leftOption,
    setLeftOption,
  } = useContext(ODContext);
  return (
    <div
      className={`h-full z-1 grid grid-rows-[.5fr_10fr] grid-cols-[auto_1fr] pt-8 px-2 ${
        largeSize && !leftLarge ? "w-0 *:hidden" : "w-[80%]"
      }`}
    >
      {/*Seccion desplegable de botones dasheados*/}
      <DashedSection />

      <div className="flex flex-row gap-2 justify-center items-start col-start-2">
        <button className="bg-[#FFFFFF] dark:bg-[#1D1D1D] border border-gray-300 dark:border-none rounded-md px-6 ">
          fecha
        </button>
        <input
          type="text"
          className="w-5/6 h-[40px] bg-[#FFFFFF] dark:bg-[#1D1D1D] border border-gray-300 dark:border-none rounded-md"
        />
      </div>
      <div className="rounded-t-md bg-[#F2F2F2] dark:bg-[#0B0B0B] mt-2 overflow-y-scroll col-start-2 border border-gray-200 dark:border-[#161616] flex flex-wrap overflow-y-scroll overflow-x-hidden items-start justify-start content-start">
        <Tables />
      </div>
    </div>
  );
}

export default TablesPanel;
