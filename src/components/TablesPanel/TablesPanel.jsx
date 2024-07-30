//Contenedor de tablas de alumnos y grupos en panel central.
import { useContext } from "react";
import { ODContext } from "../../context/ODContext";

function TablesPanel() {
  const { largeSize, setLargeSize } = useContext(ODContext);
  return (
    <div
      className={`h-full z-1 grid grid-rows-[.5fr_10fr] pt-2 px-2 ${
        largeSize ? "w-0 *:hidden" : "w-2/3"
      }`}
    >
      <div className="flex flex-row gap-2 justify-center items-start">
        <button className="bg-[#FFFFFF] dark:bg-[#1D1D1D] border dark:border-none rounded-md px-6 shadow-md">
          fecha
        </button>
        <input
          type="text"
          className="w-5/6 h-[40px] bg-[#FFFFFF] dark:bg-[#1D1D1D] border dark:border-none border-gray-100 shadow-md rounded-md"
        />
      </div>
      <div className="rounded-t-md bg-[#D7D7D7] dark:bg-[#0B0B0B] mt-2 overflow-y-scroll"></div>
    </div>
  );
}

export default TablesPanel;
