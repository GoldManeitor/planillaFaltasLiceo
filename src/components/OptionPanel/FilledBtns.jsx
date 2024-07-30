import { useContext } from "react";
import { ODContext } from "../../context/ODContext";

function FilledBtns({ btnSize, icon }) {
  const { largeSize, setLargeSize, currentOption, setCurrentOption } =
    useContext(ODContext);

  const handleBtns = (btn) => {
    setCurrentOption(btn);
    setLargeSize(true);
  };
  return (
    <>
      <div
        onClick={() => handleBtns(4)}
        style={{ width: `${btnSize}` }}
        className="min-h-[40px] text-center shadow-md bg-[#FFFFFF] dark:bg-[#1D1D1D] border dark:border-none border-gray-100 mt-4 hover:cursor-pointer hover:cursor-pointer select-none rounded-md flex justify-center items-center"
      >
        {icon ? "asd" : "elemento"}
      </div>
      <div
        onClick={() => handleBtns(5)}
        style={{ width: `${btnSize}` }}
        className="min-h-[40px] text-center shadow-md bg-[#FFFFFF] dark:bg-[#1D1D1D] border dark:border-none border-gray-100 hover:cursor-pointer hover:cursor-pointer select-none rounded-md flex justify-center items-center"
      >
        {icon ? "asd" : "elemento"}
      </div>
      <div
        onClick={() => handleBtns(6)}
        style={{ width: `${btnSize}` }}
        className="min-h-[40px] text-center shadow-md bg-[#FFFFFF] dark:bg-[#1D1D1D] border dark:border-none border-gray-100 hover:cursor-pointer hover:cursor-pointer select-none rounded-md flex justify-center items-center"
      >
        {icon ? "asd" : "elemento"}
      </div>
    </>
  );
}

export default FilledBtns;
