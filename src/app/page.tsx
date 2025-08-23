"use client";

import { useFormStatus } from "react-dom";
import { createCliente, State } from "./actions";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BellIcon } from "@/components/ui/BellIcon";


const initialState: State = {
  errors: {},
  message: null,
  successfully: false,
  idCliente: 0,
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} disabled={pending} className="mt-4 w-full px-4 py-2 bg-[#ff81be] text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors">
      {pending ? "Creando..." : "Crear Cliente"}
    </button>
  );
}

export default function Home() {
  const [state, formAction] = useActionState(createCliente, initialState);
  const navegar = useRouter();
  const [correo, setCorreo] = useState("")



  const handledChangeCorreo = (e: ChangeEvent<HTMLInputElement>) => {

    setCorreo(e.target.value)

  }


  useEffect(() => {

    if (state.successfully) {
      navegar.push(`/ruleta/?idCliente=${state.idCliente}&idPromocion=1`);
    }


  }, [state.successfully, navegar, state.idCliente])




  return (
    <main className=" fondo flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24 "

    >
      <div className=" glass3d w-full max-w-md p-8 space-y-6  rounded-lg shadow-xl border-2 border-red-800">
        <div className="flex items-center justify-center">
          <Image src='/logo.svg' alt='Logo' width={200} height={200} />
        </div>

        <h1 className="text-2xl font-bold text-center  text-pink-800 p-4 ">Bienvenido !
        </h1>
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 ">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"

              className="mt-1 block w-full px-3 py-2 border bg-white  opacity-50 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {state?.errors?.nombre && (<span className="text-red-500 text-xs">  {state.errors.nombre} </span>)}
          </div>
          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={correo}
              onChange={handledChangeCorreo}

              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white  opacity-50  focus:opacity-100 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {state?.errors?.correo && (<span className="text-red-500 text-xs">  {state.errors.correo} </span>)}
          </div>
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              maxLength={8}
              minLength={8}
              placeholder="88889999"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {state?.errors?.telefono && (<span className="text-red-500 text-xs">  {state.errors.telefono} </span>)}
          </div>
          <SubmitButton />
        </form>
        {state?.message && (
          <div>
            <p className="mt-4 text-sm text-center font-medium text-gray-700">{state.message}</p>


          </div>



        )}
        <BellIcon />

      </div>
    </main>
  );
}
