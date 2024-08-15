import { ODContext } from "../../../context/ODContext";
import { supabase } from "../../../supabase/client";
import { useContext, useEffect, useState } from "react";
import FaltasPlugin from "./plugins/FaltasPlugin";
import { Spinner } from "flowbite-react";

function Tables({ display }) {
  const {
    leftLarge,
    setLeftLarge,
    leftOption,
    setLeftOption,
    actualizar,
    setActualizar,
  } = useContext(ODContext);
  const [alumnos, setAlumnos] = useState([]);
  const [subgrupos, setSubgrupos] = useState([]);
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    setGrupos([]);
    setSubgrupos([]);
    setAlumnos([]);

    const bringAlumnos = async () => {
      const { data: alumnosLiceo, error } = await supabase
        .from("alumnosLiceo")
        .select("*");
      if (error) {
        console.error(error);
      } else {
        setAlumnos(alumnosLiceo);
      }
    };
    bringAlumnos();

    const bringSubgrupos = async () => {
      const { data: subGrLiceo, error } = await supabase
        .from("subGrLiceo")
        .select("*");
      if (error) {
        console.error(error);
      } else {
        setSubgrupos(subGrLiceo);
      }
    };
    bringSubgrupos();

    const bringGrupos = async () => {
      const { data: gruposLiceo, error } = await supabase
        .from("gruposLiceo")
        .select("*");
      if (error) {
        console.error(error);
      } else {
        setGrupos(gruposLiceo);
      }
    };
    bringGrupos();
  }, [actualizar]);

  return (
    <>
      {grupos.length > 0 && subgrupos.length > 0 && alumnos.length > 0 ? (
        grupos.map((grupo) => (
          <section
            key={grupo.id}
            style={{
              maxWidth: !display ? "100%" : "50%",
              flex: !display ? "1 0 100%" : "1 0 50%",
            }}
            className="w-1/2 box-border h-min p-2"
          >
            <div className="w-full p-2 border border-gray-300 dark:border-[#161616] bg-white dark:bg-[#111111] rounded-lg">
              <div className="mb-2">
                <h1 className="text-center uppercase font-bold text-gray-600 dark:text-gray-300">
                  {grupo.name}
                </h1>
              </div>
              {subgrupos
                .filter((e) => e.grupoID === grupo.id)
                .map((subgrupo) => (
                  <div
                    key={subgrupo.id}
                    className="w-full flex flex-col gap-1 border border-gray-300 dark:border-[#161616] rounded-lg p-2 mb-2"
                  >
                    <div>
                      <h1 className="font-bold uppercase text-xs px-1 mb-1">
                        Subgrupo {subgrupo.name}
                      </h1>
                      <hr className="border-gray-300 dark:border-[#161616]" />
                    </div>
                    <div className="w-full grid grid-cols-[1.5fr_.5fr_.8fr_.7fr_24px] text-gray-500 px-1">
                      <div className="uppercase text-sm font-semibold overflow-x-auto">
                        nombre alumno
                      </div>
                      <div className="uppercase text-sm font-semibold">
                        faltas
                      </div>
                      <div className="uppercase text-sm font-semibold overflow-x-auto">
                        grupo
                      </div>
                      <div className="uppercase text-sm font-semibold">
                        subgrupo
                      </div>
                      <div>
                        <span className="sr-only">Edit</span>
                      </div>
                    </div>
                    <hr className="border-gray-300 dark:border-[#161616]" />
                    {alumnos.filter(
                      (e) => e.grupoID === grupo.id && e.subGrID === subgrupo.id
                    ).length < 1 && "No hay datos"}
                    {alumnos
                      .filter(
                        (e) =>
                          e.grupoID === grupo.id && e.subGrID === subgrupo.id
                      )
                      .map((alumno) => (
                        <div
                          key={alumno.id}
                          className="dark:text-gray-300 bg-gray-100 dark:bg-[#1d1d1d] rounded-md px-2"
                        >
                          <div className="divide-y">
                            <div className="dark:border-gray-700 grid grid-cols-[1.5fr_.5fr_.8fr_.7fr_24px]">
                              <div className="overflow-x-auto truncate">
                                {alumno.name.slice(0, 1).toUpperCase() +
                                  alumno.name
                                    .slice(1, alumno.name.length)
                                    .toLowerCase() +
                                  " " +
                                  alumno.lastname.slice(0, 1).toUpperCase() +
                                  alumno.lastname
                                    .slice(1, alumno.lastname.length)
                                    .toLowerCase()}
                              </div>
                              <div className="whitespace-nowrap text-[#6200EE] dark:text-[#BB86FC]">
                                <FaltasPlugin id={alumno.id} />
                              </div>
                              <div className="overflow-x-auto">
                                {grupo.name.slice(0, 1).toUpperCase() +
                                  grupo.name
                                    .slice(1, grupo.name.length)
                                    .toLowerCase()}
                              </div>
                              <div className="">{subgrupo.name}</div>
                              <div>
                                <svg
                                  className="w-6 h-6 text-[#000000] dark:text-[#FFFFFF]"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12.512 8.72a2.46 2.46 0 0 1 3.479 0 2.461 2.461 0 0 1 0 3.479l-.004.005-1.094 1.08a.998.998 0 0 0-.194-.272l-3-3a1 1 0 0 0-.272-.193l1.085-1.1Zm-2.415 2.445L7.28 14.017a1 1 0 0 0-.289.702v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .703-.288l2.851-2.816a.995.995 0 0 1-.26-.189l-3-3a.998.998 0 0 1-.19-.26Z"
                                    clipRule="evenodd"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    d="M7 3a1 1 0 0 1 1 1v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1V4a1 1 0 0 1 1-1Zm10.67 8H19v8H5v-8h3.855l.53-.537a1 1 0 0 1 .87-.285c.097.015.233.13.277.087.045-.043-.073-.18-.09-.276a1 1 0 0 1 .274-.873l1.09-1.104a3.46 3.46 0 0 1 4.892 0l.001.002A3.461 3.461 0 0 1 17.67 11Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </section>
        ))
      ) : (
        <Spinner
          color="purple"
          aria-label="Purple spinner example"
          className="absolute top-[50%] left-[50%]"
        />
      )}
    </>
  );
}

export default Tables;
