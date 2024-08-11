import { useContext, useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import { ODContext } from "../../../context/ODContext";

function AddFaltaComp(props) {
  const { actualizar, setActualizar } = useContext(ODContext);

  const [alumnosList, setAlumnosList] = useState([]);
  const [alumno, setAlumno] = useState("nospecify");
  const [grupos, setGrupos] = useState([]);
  const [subGrupos, setSubGrupos] = useState([]);
  const [grpSelected, setGrpSelected] = useState("nospecify");
  const [subgrSelected, setSubgrSelected] = useState("nospecify");

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

  useEffect(() => {
    const bringSubgroups = async () => {
      if (grpSelected !== "nospecify") {
        const { data: subGrLiceo, error } = await supabase
          .from("subGrLiceo")
          .select()
          .eq("grupoID", grpSelected);
        if (error) {
          console.error(error);
          setSubGrupos([]);
        } else {
          setSubGrupos(subGrLiceo);
        }
      }
    };
    bringSubgroups();
  }, [grpSelected, actualizar]);

  useEffect(() => {
    const bringAlumn = async () => {
      if (grpSelected !== "nospecify" && subgrSelected !== "nospecify") {
        const { data: alumnosLiceo, error } = await supabase
          .from("alumnosLiceo")
          .select()
          .eq("subGrID", subgrSelected);
        if (error) {
          console.error(error);
        } else {
          setAlumnosList(alumnosLiceo);
        }
      }
    };
    bringAlumn();
  }, [grpSelected, subgrSelected, actualizar]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(`puse falta a ${alumno}`);
    setActualizar(!actualizar);
  };

  const onChangeHandler = (value, input) => {
    if (input === 1) {
      setGrpSelected(value);
      setSubgrSelected("nospecify");
    } else {
      setSubgrSelected(value);
    }
    setAlumno("nospecify");
    setAlumnosList([]);
  };
  return (
    <div>
      <div className="overflow-x-hidden w-full p-2">
        <div>
          <h1 className="font-bold text-2xl flex gap-1.5">
            <p>Poner</p>{" "}
            <p className="text-[#6200EE] dark:text-[#BB86FC]">falta</p>
          </h1>
        </div>

        <hr className="mt-6 border-gray-300 dark:border-[#161616]" />

        {/*Form fields*/}
        <div className="flex flex-wrap gap-2 mt-8 ">
          {/*Listbox*/}
          <div className="w-1/4 grow">
            <label
              htmlFor="anioCurso"
              className="block mb-1 text-xs font-medium text-gray-900 dark:text-gray-500"
            >
              Grupo
            </label>
            <select
              name="anioCurso"
              id="anioCurso"
              onChange={(e) => onChangeHandler(e.target.value, 1)}
              defaultValue={"nospecify"}
              className="bg-[#F2F2F2] border border-gray-400 text-gray-900 text-sm rounded-md focus:ring-[#6200EE] focus:border-[#6200EE] block w-full p-1.5 dark:bg-[#0B0B0B] dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-[#BB86FC] dark:focus:border-[#BB86FC]"
            >
              <option value={"nospecify"}>No especificado</option>
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
          {/*Listbox*/}
          <div className="w-1/4 grow">
            <label
              htmlFor="anioCurso"
              className="block mb-1 text-xs font-medium text-gray-900 dark:text-gray-500"
            >
              Subgrupo
            </label>
            <select
              name="anioCurso"
              id="anioCurso"
              onChange={(e) => onChangeHandler(e.target.value, 2)}
              defaultValue={"nospecify"}
              className="bg-[#F2F2F2] border border-gray-400 text-gray-900 text-sm rounded-md focus:ring-[#6200EE] focus:border-[#6200EE] block w-full p-1.5 dark:bg-[#0B0B0B] dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-[#BB86FC] dark:focus:border-[#BB86FC]"
            >
              <option value={"nospecify"}>No especificado</option>
              {subGrupos.length > 0
                ? subGrupos.map((subgrupo) => (
                    <option key={subgrupo.id} value={subgrupo.id}>
                      {subgrupo.name.slice(0, 1).toUpperCase() +
                        subgrupo.name
                          .slice(1, subgrupo.name.length)
                          .toLowerCase()}
                    </option>
                  ))
                : null}
            </select>
          </div>
          {/*Listbox*/}
          <div className="w-2/4">
            <label
              htmlFor="gr_name"
              className="block mb-1 text-xs font-medium text-gray-900 dark:text-gray-500"
            >
              Nombre
            </label>
            <select
              name="gr_name"
              id="gr_name"
              onChange={(e) => setAlumno(e.target.value)}
              defaultValue={"nospecify"}
              className="bg-[#F2F2F2] border border-gray-400 text-gray-900 text-sm rounded-md focus:ring-[#6200EE] focus:border-[#6200EE] block w-full p-1.5 dark:bg-[#0B0B0B] dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-[#BB86FC] dark:focus:border-[#BB86FC]"
            >
              <option value={"nospecify"}>No especificado</option>
              {alumnosList.length > 0
                ? alumnosList.map((alumno) => (
                    <option key={alumno.id} value={alumno.id}>
                      {alumno.name.slice(0, 1).toUpperCase() +
                        alumno.name.slice(1, alumno.name.length).toLowerCase() +
                        " " +
                        alumno.lastname.slice(0, 1).toUpperCase() +
                        alumno.lastname
                          .slice(1, alumno.lastname.length)
                          .toLowerCase()}
                    </option>
                  ))
                : null}
            </select>
          </div>
        </div>

        {/*Submit*/}
        <button
          className={`${
            alumno === "nospecify"
              ? // ||
                // grpSelected === "nospecify" ||
                // subgrSelected === "nospecify"
                "disabled cursor-not-allowed opacity-50"
              : ""
          } bg-[#6200EE] dark:bg-[#BB86FC] rounded-md px-4 py-2 text-[#F2F2F2] dark:text-[#0B0B0B] mt-8 font-semibold`}
          onClick={submitHandler}
        >
          Poner falta
        </button>
        <p className="text-xs text-gray-400 mt-1">
          {alumno === "nospecify"
            ? //   ||
              //   grpSelected === "nospecify" ||
              //   subgrSelected === "nospecify"
              "Rellene los campos para poner la falta"
            : null}
        </p>
      </div>
    </div>
  );
}

export default AddFaltaComp;
