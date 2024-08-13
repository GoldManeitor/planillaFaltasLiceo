import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../../../../supabase/client";
import { ODContext } from "../../../../context/ODContext";

function FaltasPlugin({ id }) {
  const { actualizar } = useContext(ODContext);
  const [cantFaltas, setCantFaltas] = useState();
  useEffect(() => {
    const getFaltas = async () => {
      const { data: faltasAlumnos, error } = await supabase
        .from("faltasAlumnos")
        .select()
        .eq("alumno", id);
      if (error) {
        console.error(error);
      } else {
        setCantFaltas(faltasAlumnos.length > 0 ? faltasAlumnos.length : 0);
      }
    };
    getFaltas();
  }, [actualizar]);
  return <>{cantFaltas >= 0 ? cantFaltas : <p>Cargando...</p>}</>;
}

export default FaltasPlugin;
