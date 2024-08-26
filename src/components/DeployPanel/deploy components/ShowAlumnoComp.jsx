import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import { WebManager } from "../../../context/WebManager";
import { ODContext } from "../../../context/ODContext";
import { Button, Modal, Spinner } from "flowbite-react";
import DeleteFalta from "./DeleteFalta";

function ShowAlumnoComp() {
  const [alumno, setAlumno] = useState({});
  const [faltas, setFaltas] = useState([]);
  const { alumnoSelected, setAlumnoSelected } = useContext(WebManager);
  const {
    largeSize,
    setLargeSize,
    currentOption,
    setCurrentOption,
    actualizar,
    setActualizar,
  } = useContext(ODContext);
  useEffect(() => {
    const bringAlumno = async () => {
      const { data: alumnosLiceo, error } = await supabase
        .from("alumnosLiceo")
        .select()
        .eq("id", alumnoSelected);
      if (error) {
        console.error(error);
      } else {
        setAlumno(alumnosLiceo[0]);
      }
    };

    const bringFaltas = async () => {
      const { data: faltasAlumnos, error2 } = await supabase
        .from("faltasAlumnos")
        .select()
        .eq("alumno", alumnoSelected);
      if (error2) {
        console.error(error2);
      } else {
        setFaltas(faltasAlumnos);
      }
    };

    bringAlumno();
    bringFaltas();
  }, [alumnoSelected, actualizar]);

  const configureName = (name) => {
    return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
  };

  //----------------DELETE ALUMNO ------------------

  const [openModal, setOpenModal] = useState(false);
  function DeleteModal() {
    const onclickHandler = () => {
      setOpenModal(false);
      deleteHandler();
    };
    return (
      <>
        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Segura que querés eliminar al alumno{" "}
                {configureName(alumno.name)} {configureName(alumno.lastname)}?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => onclickHandler()}>
                  {"Sí, estoy segura"}
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  No, cancelar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  const deleteHandler = async () => {
    const { error } = await supabase
      .from("alumnosLiceo")
      .delete()
      .eq("id", alumnoSelected);
    if (error) {
      console.error(error);
    } else {
      console.log("alumno removido correctamente");
      setLargeSize(false);
      setActualizar(!actualizar);
      setCurrentOption(0);
    }
  };

  //---------------------------------------------

  const changeDate = (dateEN) => {
    const [year, month, day] = dateEN.split("-");
    return `${day}/${month}/${year}`;
  };

  //-------------------------------------------------

  return (
    <div className="overflow-x-hidden w-full p-2 relative ml-2">
      {alumno.id === alumnoSelected ? (
        <>
          <div>
            <h1 className="text-xs text-gray-400">alumno</h1>
            <h1 className="font-bold text-2xl flex gap-1.5">
              {alumno.name ? (
                <>
                  <p>{configureName(alumno.name) + ", "}</p>
                </>
              ) : null}
              <p className="text-[#6200EE] dark:text-[#BB86FC]">
                {configureName(alumno.lastname)}
              </p>
            </h1>
          </div>

          <hr className="mt-6 border-gray-300 dark:border-[#161616]" />

          <div>
            <p>Faltas en 2024: <b>{faltas.length}</b></p>
            <p></p>
          </div>

          <div className="flex flex-col gap-1 mt-4">
            {faltas.length > 0
              ? faltas.map((falta) => (
                  <div
                    key={falta.id}
                    className="flex h-auto w-auto gap-2 justify-start items-center"
                  >
                    <p className="text-xl">{changeDate(falta.full_date)}</p>

                    <DeleteFalta id={falta.id} />
                  </div>
                ))
              : "No hay faltas que mostrar"}
          </div>

          <hr className="mt-6 border-gray-300 dark:border-[#161616]" />

          <button
            className={`bg-red-700 dark:bg-red-500 rounded-md px-4 py-2 text-[#F2F2F2] dark:text-[#0B0B0B] mt-8 font-semibold`}
            onClick={() => setOpenModal(true)}
          >
            Eliminar alumno
          </button>
          {openModal ? <DeleteModal /> : null}
        </>
      ) : (
        <Spinner
          color="purple"
          aria-label="Purple spinner example"
          className="absolute top-[50%] left-[50%]"
          size="xl"
        />
      )}
    </div>
  );
}

export default ShowAlumnoComp;
