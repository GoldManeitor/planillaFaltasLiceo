import { useContext, useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import { ODContext } from "../../../context/ODContext";
import Datepicker from "tailwind-datepicker-react";

const options = {
  title: "Fecha de faltas",
  autoHide: true,
  todayBtn: false,
  todayBtnText: "Hoy",
  clearBtn: false,
  maxDate: new Date(),
  minDate: new Date("2010-01-01"),
  theme: {
    background: "bg-custom-bg dark:bg-custom-darkbg",
    todayBtn:
      "bg-custom-vi dark:bg-custom-darkvi dark:text-custom-darkbg font-bold hover:bg-custom-vi dark:hover:bg-custom-darkvi",
    icons: "bg-transparent dark:bg-transparent",
    text: "",
    disabledText:
      "bg-custom-bg dark:bg-custom-darkbg !text-gray-400 dark:!text-gray-600",
    input:
      "mt-2 w-full cursor-pointer bg-custom-bg dark:bg-custom-darkbg border-gray-400 text-gray-900 text-sm rounded-md focus:ring-[#6200EE] focus:border-[#6200EE] dark:bg-[#0B0B0B] dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-[#BB86FC] dark:focus:border-[#BB86FC]",
    inputIcon: "",
    selected:
      "bg-custom-vi dark:bg-custom-darkvi hover:text-custom-vi hover:bg-custom-bg dark:hover:text-custom-darkvi dark:hover:bg-custom-darkbg",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => (
      <span>
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
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </span>
    ),
    next: () => (
      <span>
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
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </span>
    ),
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "es",
  disabledDates: [],
  weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  },
};

function AddFaltaComp(props) {
  const { actualizar, setActualizar, setLargeSize } = useContext(ODContext);

  const [alumnosList, setAlumnosList] = useState([]);
  const [alumno, setAlumno] = useState("nospecify");
  const [grupos, setGrupos] = useState([]);
  const [subGrupos, setSubGrupos] = useState([]);
  const [grpSelected, setGrpSelected] = useState("nospecify");
  const [subgrSelected, setSubgrSelected] = useState("nospecify");

  const [date, setDate] = useState("");

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

  const [horas, setHoras] = useState();
  useEffect(() => {
    if (grpSelected !== "nospecify") {
      setHoras(
        grupos.find((grupo) => grupo.id === parseInt(grpSelected)).multip
      );
    }
  }, [grpSelected]);

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

  const [show, setShow] = useState(false);

  const handleChange = (selectedDate) => {
    const formattedDate = new Intl.DateTimeFormat("en", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(selectedDate);
    setDate(formattedDate);
  };
  useEffect(() => {
    const fechaHoy = new Date();
    handleChange(fechaHoy);
  }, []);
  const handleClose = (state = false) => {
    // Si state no está definido, se establece como false por defecto
    setShow(state);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    for (let i = 1; i <= horas; i++) {
      const alumnoSelected = alumnosList.find(
        (al) => al.id === parseInt(alumno)
      );

      const nombreCompleto =
        alumnoSelected.name.slice(0, 1).toUpperCase() +
        alumnoSelected.name.slice(1).toLowerCase() +
        " " +
        alumnoSelected.lastname.slice(0, 1).toUpperCase() +
        alumnoSelected.lastname.slice(1).toLowerCase();
      const { error } = await supabase.from("faltasAlumnos").insert([
        {
          alumno: alumnoSelected.id,
          nom_alumno: nombreCompleto,
          gr_alumno: alumnoSelected.grupoID,
          subgr_alumno: alumnoSelected.subGrID,
          full_date: date,
        },
      ]);
      if (error) console.error(error);
      else {
        console.log("correcto envio");
      }
    }
    setLargeSize(false);
    setAlumno("nospecify");
    setActualizar(!actualizar);
  };

  return (
    <div className="overflow-x-hidden w-full p-2 relative ml-2">
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
        <div className="w-1/4 h-full grow">
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
            value={grpSelected}
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
            value={subgrSelected}
            className="bg-[#F2F2F2] border border-gray-400 text-gray-900 text-sm rounded-md focus:ring-[#6200EE] focus:border-[#6200EE] block w-full p-1.5 dark:bg-[#0B0B0B] dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-[#BB86FC] dark:focus:border-[#BB86FC]"
          >
            <option value={"nospecify"}>No especificado</option>
            {subGrupos.length > 0 && grpSelected !== "nospecify"
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
        <div className="w-full">
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
            value={alumno}
            className="bg-[#F2F2F2] border border-gray-400 text-gray-900 text-sm rounded-md focus:ring-[#6200EE] focus:border-[#6200EE] block w-full p-1.5 dark:bg-[#0B0B0B] dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-[#BB86FC] dark:focus:border-[#BB86FC]"
          >
            <option value={"nospecify"}>No especificado</option>
            {alumnosList.length > 0 &&
            grpSelected !== "nospecify" &&
            subgrSelected !== "nospecify"
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
        {grpSelected !== "nospecify" ? (
          <div className="w-[50px] mt-8">
            <label
              htmlFor="small-input"
              className="block mb-1 text-xs font-medium text-gray-900 dark:text-gray-500"
            >
              Cantidad de horas
            </label>
            <input
              placeholder={horas}
              defaultValue={horas}
              type="text"
              name="horas"
              id="horas"
              onChange={(e) => setHoras(e.target.value)}
              className=" bg-custom-bg border border-gray-400 text-gray-900 text-sm rounded-md focus:ring-[#6200EE] focus:border-[#6200EE] block w-full p-1.5 dark:bg-custom-darkbg dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-[#BB86FC] dark:focus:border-[#BB86FC]"
            />
          </div>
        ) : null}
      </div>
      <Datepicker
        options={options}
        onChange={(e) => handleChange(e)}
        show={show}
        setShow={handleClose}
        className="w-full"
      />

      {/*Submit*/}
      <div className="">
        <hr className="mt-6 border-gray-300 dark:border-[#161616]" />
        <button
          className={`${
            alumno === "nospecify"
              ? // ||
                // grpSelected === "nospecify" ||
                // subgrSelected === "nospecify"
                "disabled cursor-not-allowed opacity-50"
              : ""
          } bg-custom-vi dark:bg-custom-darkvi rounded-md px-4 py-2 text-[#F2F2F2] dark:text-[#0B0B0B] mt-8 font-semibold`}
          onClick={submitHandler}
          disabled={alumno === "nospecify"}
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
