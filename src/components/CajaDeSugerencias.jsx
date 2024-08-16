import React, { useContext, useState } from "react";
import { WebManager } from "../context/WebManager";
import { supabase } from "../supabase/client";

function CajaDeSugerencias() {
  const [comment, setComment] = useState("");
  const { openComm, setOpenComm } = useContext(WebManager);

  const [appr, setAppr] = useState(false);

  const approve = () => {
    setAppr(true);
    setTimeout(() => {
      setOpenComm(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("comentarios").insert([
      {
        comentario: comment,
      },
    ]);
    if (error) {
      console.error(error);
    } else {
      approve();
    }
  };

  return (
    <>
      <div className="absolute left-[50%] top-[30px] translate-y-0 translate-x-[-50%] bg-custom-bg dark:bg-custom-darkbg  border border-custom-vi dark:border-custom-darkvi rounded-md ">
        <div className="w-full h-full relative p-4">
          <p className="mb-4">
            Escribí acá lo que quieras mejorar o falte en el programa, que con
            gusto no lo leeré:
          </p>
          <textarea
            className="resize-none rounded-md w-full dark:bg-custom-darkbg"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            className={`
           
          bg-custom-vi dark:bg-custom-darkvi rounded-md px-4 py-2 text-[#F2F2F2] dark:text-[#0B0B0B] mt-8 font-semibold`}
            onClick={handleSubmit}
          >
            Enviar comentario
          </button>
        {appr ? <div className="absolute bg-green-200 opacity-70 w-full h-full rounded-md top-0 left-0 flex items-center justify-center">¡Gracias por tu comentario!</div> : null}
        </div>
      </div>
    </>
  );
}

export default CajaDeSugerencias;
