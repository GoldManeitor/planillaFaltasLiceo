import { useContext, useState } from "react";
import { supabase } from "../../../supabase/client";
import { ODContext } from "../../../context/ODContext";

function DeleteFalta({ id }) {
  const [switchIcons, setSwitchIcons] = useState(false);
  const [borrado, setBorrado] = useState(false);

  const { actualizar, setActualizar } = useContext(ODContext);

  async function deleteDB() {
    const { error } = await supabase
      .from("faltasAlumnos")
      .delete()
      .eq("id", id);
    if (error) {
      console.error(error);
    } else {
      setBorrado(true);
      setActualizar(!actualizar);
    }
  }

  const handleDelete = async () => {
    deleteDB();
  };
  return (
    <div>
      {!switchIcons ? (
        <svg
          className="w-8 h-8 text-gray-800 dark:text-white cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          onClick={() => setSwitchIcons(true)}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ) : (
        <div className="flex gap-2">
          <svg
            className="w-8 h-8 text-gray-800 dark:text-white cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => handleDelete()}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 11.917 9.724 16.5 19 7.5"
            />
          </svg>
          <svg
            className="w-8 h-8 text-gray-800 dark:text-white cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setSwitchIcons(false)}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default DeleteFalta;
