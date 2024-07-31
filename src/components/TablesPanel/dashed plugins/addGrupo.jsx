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
  const { leftLarge, setLeftLarge, leftOption, setLeftOption } =
    useContext(ODContext);
  const [name, setName] = useState("");
  const [classNum, setClassNum] = useState();
  const [multiplicator, setMultiplicator] = useState();

  const [selected, setSelected] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const sendData = async () => {
      const { error } = await supabase.from("gruposLiceo").upsert({
        name: name,
        gr_num: classNum,
        multip: multiplicator,
      });
      if (error) {
        console.error(error);
      } else {
        //toast de success
      }
    };
  };

  return (
    <div>
      <input
        type="text"
        name="gr_name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        name="gr_multiplicator"
        onChange={(e) => setMultiplicator(e.target.value)}
      />

      {/*Listbox*/}
      <div value={selected} onChange={setSelected}>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Assigned to
        </label>
        <div className="relative mt-2">
          <div className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
            <span className="flex items-center">
              <span className="ml-3 block truncate">{selected.name}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
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
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </span>
          </div>

          <ul
            transition
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          >
            {classes.map((c) => (
              <li
                key={c.id}
                value={c}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                <div className="flex items-center">
                  <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                    {c.name}
                  </span>
                </div>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
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
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddGrupo;
