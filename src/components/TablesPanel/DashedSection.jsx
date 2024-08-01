import { useContext } from "react";
import { ODContext } from "../../context/ODContext";
import AddGrupo from "./dashed plugins/addGrupo";
import AddAlumno from "./dashed plugins/addAlumno";
import AddSubGroup from "./dashed plugins/addSubGroup";

function DashedSection(props) {
  const { leftLarge, setLeftLarge, leftOption, setLeftOption, setLargeSize } =
    useContext(ODContext);

  const handleClick = () => {
    setLeftLarge(false);
    setLargeSize(false);
  };

  return (
    <section
      className={`col-start-1 row-start-1 row-span-3 overflow-y-auto bg-[#F2F2F2] dark:bg-[#0B0B0B] ${
        !leftLarge
          ? "w-0 *:hidden border-none"
          : "w-[300px] rounded-lg p-4 border border-gray-400 border-dashed mr-6 mb-12"
      }`}
    >
      {/*Seccion desplegable de botones dasheados*/}
      <button
        onClick={() => handleClick()}
        className="rotate-[-90deg] mr-4 hover:text-[#6200EE] dark:hover:text-[#BB86FC] mb-6 bg-[#FFFFFF] dark:bg-[#1D1D1D] hover:bg-[#E5E5E5] dark:hover:bg-[#2D2D2D] rounded-full p-2"
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
      {leftOption === 1 ? (
        <AddGrupo />
      ) : leftOption === 2 ? (
        <AddSubGroup />
      ) : (
        <AddAlumno />
      )}
    </section>
  );
}

export default DashedSection;
