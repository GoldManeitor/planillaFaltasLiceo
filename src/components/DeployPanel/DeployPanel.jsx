//Contenedor de elementos desplegables en panel de la derecha.
import { useContext } from "react";
import { ODContext } from "../../context/ODContext";

function DeployPanel() {
  const { largeSize, setLargeSize, currentOption, setCurrentOption } =
    useContext(ODContext);
  const btnHandler = () => {
    setLargeSize(false);
    setCurrentOption(0);
  };
  return (
    <div
      className={`z-10 ${largeSize ? "" : ""}`}
    >
      <div className="w-full p-2 flex gap-2">
        {largeSize ? (
          <>
            <button
              onClick={btnHandler}
              className="rotate-90 mr-4 hover:text-[#6200EE] dark:hover:text-[#BB86FC]"
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
        <button className="bg-[#FFFFFF] dark:bg-[#1D1D1D] border dark:border-none rounded-md px-6 shadow-md">
          fecha
        </button>
        <button className="bg-[#FFFFFF] dark:bg-[#1D1D1D] border dark:border-none rounded-md px-6 shadow-md">
          grupo
        </button>
      </div>
      Opcion: {currentOption}
    </div>
  );
}

export default DeployPanel;
