import { useContext, useState } from "react";
import { ODContext } from "../../../context/ODContext";
import { supabase } from "../../../supabase/client";

const classes = [
  {
    id: 6,
    name: "sexto",
  },
  {
    id: 5,
    name: "quinto",
  },
  {
    id: 4,
    name: "cuarto",
  },
];

function AddGrupo(props) {
  const {
    leftLarge,
    setLeftLarge,
    leftOption,
    setLeftOption,
    actualizar,
    setActualizar,
  } = useContext(ODContext);
  const [name, setName] = useState("");
  const [multiplicator, setMultiplicator] = useState(0);
  const [selected, setSelected] = useState(classes[0]);

  const submitHandler = (e) => {
    e.preventDefault();
    const sendData = async () => {
      const { error } = await supabase.from("gruposLiceo").upsert({
        name: name,
        gr_num: selected.id,
        multip: multiplicator > 1 ? multiplicator : 1,
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
          <p className="text-[#6200EE] dark:text-[#BB86FC]">grupo</p>
        </h1>
      </div>

      <hr className="mt-6 border-gray-300 dark:border-[#161616]" />

      {/*Form fields*/}
      <div className="flex flex-wrap gap-2 mt-8 ">
        <div className="w-full mr-12 grow">
          <label
            htmlFor="small-input"
            className="block mb-1 text-xs font-medium text-gray-900 dark:text-gray-500"
          >
            Nombre del curso
          </label>
          <input
            type="text"
            name="gr_name"
            id="gr_name"
            onChange={(e) => setName(e.target.value)}
            className="bg-[#F2F2F2] border border-gray-400 text-gray-900 text-sm rounded-md focus:ring-[#6200EE] focus:border-[#6200EE] block w-full p-1.5 dark:bg-[#0B0B0B] dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-[#BB86FC] dark:focus:border-[#BB86FC]"
          />
        </div>
        {/*Listbox*/}
        <div className="w-2/4 mr-2">
          <label
            htmlFor="anioCurso"
            className="block mb-1 text-xs font-medium text-gray-900 dark:text-gray-500"
          >
            Curso
          </label>
          <select
            name="anioCurso"
            id="anioCurso"
            onChange={(e) => setSelected(classes[e.target.value])}
            defaultValue={0}
            className="bg-[#F2F2F2] border border-gray-400 text-gray-900 text-sm rounded-md focus:ring-[#6200EE] focus:border-[#6200EE] block w-full p-1.5 dark:bg-[#0B0B0B] dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-[#BB86FC] dark:focus:border-[#BB86FC]"
          >
            <option value={0}>6to</option>
            <option value={1}>5to</option>
            <option value={2}>4to</option>
          </select>
        </div>

        <div className="w-1/4 mr-8">
          <label
            htmlFor="gr_multiplicator"
            className="block mb-1 text-xs font-medium text-gray-900 dark:text-gray-500"
          >
            Horas
          </label>
          <input
            type="number"
            name="gr_multiplicator"
            id="gr_multiplicator"
            onChange={(e) => setMultiplicator(e.target.value)}
            className="bg-[#F2F2F2] border border-gray-400 text-gray-900 text-sm rounded-md focus:ring-[#6200EE] focus:border-[#6200EE] block w-full p-1.5 dark:bg-[#0B0B0B] dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-[#BB86FC] dark:focus:border-[#BB86FC]"
          />
        </div>
      </div>

      {/*Submit*/}
      <button
        className={`${
          !name || multiplicator === 0
            ? "disabled cursor-not-allowed opacity-50"
            : ""
        } bg-[#6200EE] dark:bg-[#BB86FC] rounded-md px-4 py-2 text-[#F2F2F2] dark:text-[#0B0B0B] mt-8 font-semibold`}
        onClick={submitHandler}
      >
        Guardar
      </button>
      <p className="text-xs text-gray-400 mt-1">
        {!name || multiplicator === 0
          ? "Rellene los campos para guardar"
          : null}
      </p>
    </div>
  );
}

export default AddGrupo;
