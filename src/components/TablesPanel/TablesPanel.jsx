//Contenedor de tablas de alumnos y grupos en panel central.
import { useContext, useState } from "react";
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

  const [changePanelSize, setChangePanelSize] = useState(false);
  return (
    <div
      className={`h-full z-1 grid grid-rows-[.3fr_auto_10fr] grid-cols-[auto_1fr] pt-8 px-2 ${
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
          className="w-5/6 h-[25px] bg-[#FFFFFF] dark:bg-[#1D1D1D] border border-gray-300 dark:border-none rounded-md"
        />
      </div>
      <div className="h-auto mt-4">
        <hr className="dark:border-[#161616]" />
        <div className="flex py-2">
          <div
            onClick={() => setChangePanelSize(true)}
            className={`${
              changePanelSize && "bg-gray-100 dark:bg-[#1d1d1d]"
            } w-8 h-8 border dark:border-[#161616] rounded-l-md cursor-pointer flex justify-center items-center`}
          >
            <svg
              className="w-6 h-6 text-gray-500 dark:text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
              />
            </svg>
          </div>
          <div
            onClick={() => setChangePanelSize(false)}
            className={`${
              !changePanelSize && "bg-gray-100 dark:bg-[#1d1d1d]"
            } w-8 h-8 border dark:border-[#161616] rounded-r-md cursor-pointer flex justify-center items-center`}
          >
            <svg
              className="w-6 h-6 text-gray-500 dark:text-gray-500 rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 5v14M9 5v14M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
              />
            </svg>
          </div>
        </div>
        <hr className="dark:border-[#161616]" />
      </div>
      <div className="rounded-t-md bg-[#F2F2F2] dark:bg-[#0B0B0B] mt-2 overflow-y-scroll col-start-2 border border-gray-200 dark:border-[#161616] flex flex-wrap overflow-y-scroll overflow-x-hidden items-start justify-start content-start">
        <Tables display={changePanelSize} />
      </div>
    </div>
  );
}

export default TablesPanel;
