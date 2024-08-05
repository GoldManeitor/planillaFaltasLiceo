import { useContext, useEffect, useState } from "react";
import { ODContext } from "../../../context/ODContext";
import { supabase } from "../../../supabase/client";

function AddSubGroup(props) {
  const {
    leftLarge,
    setLeftLarge,
    leftOption,
    setLeftOption,
    actualizar,
    setActualizar,
  } = useContext(ODContext);
  const [grupos, setGrupos] = useState([]);
  const [grpSelected, setGrpSelected] = useState();
  const [name, setName] = useState("");

  useEffect(() => {
    const bringGroups = async () => {
      const { data: gruposLiceo, error } = await supabase
        .from("gruposLiceo")
        .select("*");
      if (error) {
        console.error(error);
      } else {
        setGrupos(gruposLiceo);
      }
    };
    bringGroups();
  }, [actualizar]);

  const submitHandler = (e) => {
    e.preventDefault();
    const sendData = async () => {
      const { error } = await supabase.from("subGrLiceo").upsert({
        name: name,
        grupoID: grpSelected,
      });
      if (error) {
        console.error(error);
      } else {
        setActualizar(!actualizar);
        setTimeout(() => {
          setLeftLarge(false);
        }, 3000);
      }
    };
    sendData();
  };

  return (
    <div className="overflow-x-hidden w-full p-2">
      <div>
        <h1 className="font-bold text-2xl flex gap-1.5">
          <p>Añade un</p>{" "}
          <p className="text-[#6200EE] dark:text-[#BB86FC]">subgrupo</p>
        </h1>
      </div>

      <hr className="mt-6 border-gray-300 dark:border-[#161616]" />

      {/*Form fields*/}
      <div className="flex flex-wrap gap-2 mt-8">
        {/*Listbox*/}
        <div className="w-2/4 mr-2 grow">
          <label
            htmlFor="anioCurso"
            className="block mb-1 text-xs font-medium text-gray-900 dark:text-gray-500"
          >
            Grupo
          </label>
          <select
            name="anioCurso"
            id="anioCurso"
            onChange={(e) => setGrpSelected(e.target.value)}
            defaultValue={null}
            className="bg-[#F2F2F2] border border-gray-400 text-gray-900 text-sm rounded-md focus:ring-[#6200EE] focus:border-[#6200EE] block w-full p-1.5 dark:bg-[#0B0B0B] dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-[#BB86FC] dark:focus:border-[#BB86FC]"
          >
            <option value={null}>No especificado</option>
            {grupos.length > 0
              ? grupos.map((grupo) => (
                  <option key={grupo.id} value={grupo.id}>
                    {grupo.name.slice(0, 1).toUpperCase() +
                      grupo.name.slice(1, grupo.name.length).toLowerCase()}
                  </option>
                ))
              : null}
          </select>
        </div>

        <div className="w-1/4">
          <label
            htmlFor="small-input"
            className="block mb-1 text-xs font-medium text-gray-900 dark:text-gray-500"
          >
            Subgrupo
          </label>
          <input
            type="text"
            name="gr_name"
            id="gr_name"
            onChange={(e) => setName(e.target.value)}
            className="bg-[#F2F2F2] border border-gray-400 text-gray-900 text-sm rounded-md focus:ring-[#6200EE] focus:border-[#6200EE] block w-full p-1.5 dark:bg-[#0B0B0B] dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-[#BB86FC] dark:focus:border-[#BB86FC]"
          />
        </div>
      </div>

      {/*Submit*/}
      <button
        className={`${
          !name || !grpSelected ? "disabled cursor-not-allowed opacity-50" : ""
        } bg-[#6200EE] dark:bg-[#BB86FC] rounded-md px-4 py-2 text-[#F2F2F2] dark:text-[#0B0B0B] mt-8 font-semibold`}
        onClick={submitHandler}
      >
        Guardar
      </button>
      <p className="text-xs text-gray-400 mt-1">
        {!name || !grpSelected ? "Rellene los campos para guardar" : null}
      </p>
    </div>
  );
}

export default AddSubGroup;
