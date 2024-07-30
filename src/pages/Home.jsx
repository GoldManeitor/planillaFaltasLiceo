import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import ODContextProvider, { ODContext } from "../context/ODContext";
import OptionPanel from "../components/OptionPanel/OptionPanel";
import DeployPanel from "../components/DeployPanel/DeployPanel";
import TablesPanel from "../components/TablesPanel/TablesPanel";

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
  return (
    <div className="w-full h-full bg-[#E5E5E5] dark:bg-[#111111] dark:text-gray-400 ">
      <header className="w-full h-[25px] bg-[#6200EE] dark:bg-[#BB86FC] z-50"></header>
      {/*----------------Paneles-----------------------*/}
      <ODContextProvider className="z-10">
        <div className="w-full h-full grid grid-cols-[auto_1fr] grid-rows-1 gap-4 relative px-6">
          <OptionPanel />
          <div className="col-start-2 flex">
            <TablesPanel />
            <DeployPanel />
          </div>
        </div>
      </ODContextProvider>
    </div>
  );
}

export default Home;
