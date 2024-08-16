import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import ODContextProvider, { ODContext } from "../context/ODContext";
import OptionPanel from "../components/OptionPanel/OptionPanel";
import DeployPanel from "../components/DeployPanel/DeployPanel";
import TablesPanel from "../components/TablesPanel/TablesPanel";
import CajaDeSugerencias from "../components/CajaDeSugerencias";
import { WebManager } from "../context/WebManager";

function Home(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      if (await supabase.auth.getUser().error) {
        navigate("/login");
      }
    };
    func();
  }, [navigate]);

  const { openComm, setOpenComm } = useContext(WebManager);
  return (
    <div className="w-full h-full bg-[#FFFFFF] dark:bg-[#111111] dark:text-gray-400 ">
      <header className="relative w-full h-[25px] bg-[#6200EE] dark:bg-[#BB86FC] !z-[5000] border-b dark:border-[#161616] flex justify-center items-center">
        <p
          className="text-white text-xs underline cursor-pointer dark:text-custom-darkbg"
          onClick={() => setOpenComm(!openComm)}
        >
          Deja tu comentario
        </p>
        {openComm ? <CajaDeSugerencias /> : null}
      </header>
      {/*----------------Paneles-----------------------*/}
      <ODContextProvider className="z-10">
        <div className="w-full h-full grid grid-cols-[auto_1fr] grid-rows-1 gap-4 relative px-6">
          <OptionPanel />
          <div className="w-full col-start-2 flex gap-4 justify-end">
            <TablesPanel />
            <DeployPanel />
          </div>
        </div>
      </ODContextProvider>
    </div>
  );
}

export default Home;
