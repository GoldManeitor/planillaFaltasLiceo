import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import { ODContext } from "../../../context/ODContext";

function Groups(props) {
  const [grupos, setGrupos] = useState([]);
  const [subGrupos, setSubGrupos] = useState([]);

  const [selectedGroup, setSelectedGroup] = useState("nospecify");
  const [selectedSubgroup, setSelectedSubgroup] = useState("nospecify");

  const { actualizar } = useContext(ODContext);

  useEffect(() => {
    const groups = async () => {
      const { data: gruposLiceo, errorG } = await supabase
        .from("gruposLiceo")
        .select("*");
      if (errorG) {
        console.error(errorG);
      } else {
        setGrupos(gruposLiceo);
      }
    };

    groups();
  }, [actualizar]);
  useEffect(() => {
    const subgroups = async () => {
      const { data: subGrLiceo, errorSG } = await supabase
        .from("subGrLiceo")
        .select()
        .eq("grupoID", selectedGroup);
      if (errorSG) {
        console.error(errorSG);
      } else {
        setSubGrupos(subGrLiceo);
      }
    };
    if (selectedGroup !== "nospecify") {
      subgroups();
    }
  }, [actualizar, selectedGroup]);

  return <div>Hola soy opcion 4</div>;
}

export default Groups;
