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
    setActualizar,
    actualizar,
  } = useContext(ODContext);

  const [changePanelSize, setChangePanelSize] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  return (
    <div
      className={`h-full z-1 grid grid-rows-[25px_auto_10fr] grid-cols-[auto_1fr] pt-8 px-2 ${
        largeSize && !leftLarge ? "w-0 *:hidden" : "w-[80%] grow"
      }`}
    >
      {/*Seccion desplegable de botones dasheados*/}
      <DashedSection />

      <div className="flex flex-row gap-2 justify-start items-start col-start-2 row-start-1">
        <h1 className="font-bold text-2xl flex gap-1.5">
          <p>Lista de</p>{" "}
          <p className="text-[#6200EE] dark:text-[#BB86FC]">alumnos</p>
        </h1>
      </div>
      <div className="h-auto mt-4">
        <hr className="dark:border-[#161616]" />
        <div className="flex py-2 items-center">
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

          <label htmlFor="" className="relative flex">
            <span className="absolute inset-y-0 left-2 flex items-center pl-2">
              <svg
                className="w-5 h-5 text-slate-400 dark:text-slate-400"
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
                  strokeWidth="2"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </span>
            <input
              placeholder="Buscar alumno..."
              className="placeholder:text-slate-400 placeholder:italic px-8 w-60 h-8 ml-2 bg-white dark:bg-transparent border dark:border-[#161616] flex justify-center items-center rounded-md cursor-text hover:bg-white dark:hover:bg-[#161616] focus:ring-[#6200EE] focus:border-[#6200EE] dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-[#BB86FC] dark:focus:border-[#BB86FC]"
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </label>
          <div
            className="w-8 h-8 ml-6 bg-gray-100 dark:bg-[#1d1d1d] border dark:border-[#161616] flex justify-center items-center rounded-full cursor-pointer hover:bg-white dark:hover:bg-[#161616]"
            onClick={() => setActualizar(!actualizar)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        </div>
        <hr className="dark:border-[#161616]" />
      </div>
      <div className="relative rounded-t-md bg-[#F2F2F2] dark:bg-[#0B0B0B] mt-2 overflow-y-scroll col-start-2 border border-gray-200 dark:border-[#161616] flex flex-wrap overflow-y-scroll overflow-x-hidden items-start justify-start content-start mb-10">
        <Tables display={changePanelSize} searchFilter={searchFilter} />
      </div>
    </div>
  );
}

export default TablesPanel;
