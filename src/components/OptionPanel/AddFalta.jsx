import { useContext } from "react";
import { ODContext } from "../../context/ODContext";

function AddFalta({ icon, btnSize }) {
  const { largeSize, setLargeSize, currentOption, setCurrentOption } =
    useContext(ODContext);

  const btnHandler = () => {
    setLargeSize(true);
    setCurrentOption(0);
  };
  return (
    <>
      <button
        onClick={btnHandler}
        className="w-full min-h-[80px] bg-[#6200EE] dark:bg-[#BB86FC] hover:bg-[#781AFE] dark:hover:bg-[#DBBEFF] rounded-md shadow-xl text-[#E5E5E5] dark:text-[#111111]"
      >
        {icon ? <></> : "Marcar falta"}
      </button>
    </>
  );
}

export default AddFalta;
