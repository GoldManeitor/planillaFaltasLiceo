//Contenedor de tablas de alumnos y grupos en panel central.
import { useContext } from "react";
import { ODContext } from "../../context/ODContext";

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
      className={`h-full z-1 grid grid-rows-[.5fr_10fr] grid-cols-[auto_1fr] pt-4 px-2 ${
        largeSize && !leftLarge ? "w-0 *:hidden" : "w-2/3"
      }`}
    >
      <section
        className={`col-start-1 row-start-1 row-span-3 ${
          !leftLarge
            ? "w-0 *:hidden"
            : "w-[230px] rounded-lg p-4 border border-gray-400 border-dashed mr-4 mb-12"
        }`}
      >
        <button
          onClick={() => setLeftLarge(false)}
          className="rotate-[-90deg] mr-4 hover:text-[#6200EE] dark:hover:text-[#BB86FC] mb-6 bg-[#FFFFFF] dark:bg-[#1D1D1D] hover:bg-[#D7D7D7] dark:hover:bg-[#2D2D2D] rounded-full p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </button>
        <p>Estoy y mi numero es {leftOption}</p>
      </section>
      <div className="flex flex-row gap-2 justify-center items-start col-start-2">
        <button className="bg-[#FFFFFF] dark:bg-[#1D1D1D] border dark:border-none rounded-md px-6 shadow-md">
          fecha
        </button>
        <input
          type="text"
          className="w-5/6 h-[40px] bg-[#FFFFFF] dark:bg-[#1D1D1D] border dark:border-none border-gray-100 shadow-md rounded-md"
        />
      </div>
      <div className="rounded-t-md bg-[#D7D7D7] dark:bg-[#0B0B0B] mt-2 overflow-y-scroll col-start-2"></div>
    </div>
  );
}

export default TablesPanel;
