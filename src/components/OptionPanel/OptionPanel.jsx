//Contenedor de elementos seleccionables en panel de la izquierda

import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import DashBtns from "./DashBtns";
import FilledBtns from "./FilledBtns";
import AddFalta from "./AddFalta";

function OptionPanel() {
  const [darkMode, setDarkMode] = useState(false);
  const [panelWidth, setPanelWidth] = useState({ size: "200px", isOpen: true });
  const [icon, setIcon] = useState(false);
  const [btnSize, setBtnSize] = useState("100%");

  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  useEffect(() => {
    if (!panelWidth.isOpen) {
      setIcon(true);
      setBtnSize("100%");
    } else {
      setTimeout(() => {
        setIcon(false);
        setBtnSize("100%");
      }, 100);
    }
  }, [panelWidth]);

  return (
    <div className="col-start-1 pt-6 pr-4 border-r dark:border-[#161616]">
      <div
        style={{ width: `${panelWidth.size}` }}
        className="flex flex-col items-center p-2 gap-1 h-full"
      >
        <AddFalta icon={icon} btnSize={btnSize} />
        {/*--------------Punteados-------------------*/}
        <DashBtns icon={icon} btnSize={btnSize} />
        {/*----------------Lisos---------------------*/}
        <FilledBtns icon={icon} btnSize={btnSize} />
        {/*--------------Home Buttons-------------------*/}
        <div className="flex gap-2 h-full w-full items-end justify-between pb-10">
          <button
            onClick={() => supabase.auth.signOut()}
            className="bg-[#6200EE] dark:bg-[#BB86FC] hover:bg-[#781AFE] dark:hover:bg-[#DBBEFF] text-[#E5E5E5] dark:text-[#111111] min-w-[40px] h-[40px] rounded-full flex justify-center items-center px-2 py-2 gap-2 shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
              />
            </svg>
          </button>

          <div className="h-auto flex flex-col gap-2 justify-center items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="shadow-lg bg-[#FFFFFF] dark:bg-[#1D1D1D] dark:text-[#D7D7D7] hover:bg-[#D7D7D7] dark:hover:bg-[#2D2D2D] w-[30px] h-[30px] rounded-full flex justify-center items-center border border-gray-300 dark:border-none"
            >
              {darkMode ? (
                <>
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
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                </>
              ) : (
                <>
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
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                </>
              )}
            </button>
            <button
              onClick={() =>
                panelWidth.isOpen
                  ? setPanelWidth({ size: "100px", isOpen: false })
                  : setPanelWidth({ size: "200px", isOpen: true })
              }
              className={`shadow-lg bg-[#FFFFFF] dark:bg-[#1D1D1D] dark:text-[#D7D7D7] hover:bg-[#D7D7D7] dark:hover:bg-[#2D2D2D] w-[30px] h-[30px] rounded-full flex justify-center items-center border border-gray-300 dark:border-none ${
                panelWidth.isOpen ? "rotate-[-90deg]" : "rotate-90"
              }`}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptionPanel;
