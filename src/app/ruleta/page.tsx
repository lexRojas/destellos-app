"use client";

import { Suspense, useState, } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { guardarClientePromocion, verificarCliente } from "./actions";


function RuletaPage() {

    const searcParams = useSearchParams()

    const idCliente = searcParams.get("idCliente")
    const idPromocion = searcParams.get("idPromocion")


    const [angle, setAngle] = useState(0); // ángulo acumulado de la ruleta
    const [isSpinning, setIsSpinning] = useState(false);
    const [finalLabel, setFinalLabel] = useState<string | null>(null);
    const [hiddenRulet, sethiddenRulet] = useState(false);
    const [participated, setParticipated] = useState(false);



    // Lógica para el giro de la ruleta
    const labels = [
        "Muchas Gracias",
        "Descuento del 5% !!",
        "Reclama tu sorpresa",
        "Descuento del 10% !!",
        "Reclama tu sorpresa",
        "Muchas Gracias",
        "Descuento del 15% !!",
        "Reclama tu sorpresa",
    ];

    const sectorSize = 360 / labels.length; // 45° para 8 sectores
    const topOffsetDeg = 0;

    const handleSpin = () => {
        console.log(hiddenRulet)
        if (!hiddenRulet) {

            if (isSpinning) return;
            setFinalLabel(null);
            setIsSpinning(true);

            // 4..6 vueltas completas + 0..359° aleatorio
            const fullTurns = 360 * (4 + Math.floor(Math.random() * 3));
            const randomOffset = Math.floor(Math.random() * 360);
            const nextAngle = angle + fullTurns + randomOffset;

            setAngle(nextAngle);
        } else {
            sethiddenRulet(true)
        }

    };

    const handleTransitionEnd = () => {
        const normalized = ((angle % 360) + 360) % 360;
        const relativeToTop = ((topOffsetDeg - normalized) % 360 + 360) % 360;
        const index = Math.floor(relativeToTop / sectorSize);

        setFinalLabel(labels[index]);
        setIsSpinning(false);


        const proccessInfo = async () => {
            const verificar = await verificarCliente(Number(idCliente), Number(idPromocion))
            if (!verificar.successfully) {
                await guardarClientePromocion(Number(idCliente), Number(idPromocion), labels[index])

            } else {
                setParticipated(true);
            }

        };
        proccessInfo()
        sethiddenRulet(true)
    }

    return (

        <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24 bg-pink-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl border-2 border-red-800">
                <h1 className="text-2xl font-bold text-center bg-pink-800 text-white p-4 rounded-lg shadow-md">¡Felicidades, gira nuestra ruleta de la suerte!</h1>
                <div className="flex flex-col items-center justify-center bg-white">
                    {/* Contenedor principal */}
                    <div className={`relative w-64 h-64 flex items-center justify-center ${hiddenRulet ? 'hidden' : ''}`}>

                        <Image src="/frameRulet.svg" alt="Frame Ruleta" fill className="object-contain z-0" priority />

                        {/* Puntero superior */}
                        <div className="absolute -top-0 z-20">
                            <div className="w-0 h-0" style={{ borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderTop: "24px solid #111" }} />
                        </div>

                        {/* Ruleta */}
                        <div
                            className="absolute flex items-center justify-center z-10"
                            style={{
                                width: "13rem", // ≈ w-52
                                height: "13rem",
                                transform: `rotate(${angle}deg)`,
                                transition: isSpinning ? "transform 2s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
                            }}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            <Image src="/rulet.svg" alt="Ruleta" fill className="object-contain" priority />
                        </div>
                    </div>

                    {/* Botón */}
                    <button
                        onClick={handleSpin}
                        disabled={isSpinning}
                        hidden={hiddenRulet}
                        className={`mt-10 px-6 py-3 text-white font-semibold rounded-lg shadow-md transition
              ${isSpinning ? "bg-gray-500 cursor-not-allowed" : "bg-rose-400 hover:bg-red-800"}`}

                    >
                        GIRAR
                    </button>

                    {/* Resultado */}
                    {finalLabel && !participated ? (
                        <p className="my-6 text-sm text-gray-800 text-center">
                            <span className="text-3xl font-bold animate-pulse text-rose-400">{finalLabel}</span>
                        </p>
                    ) : (
                        <p className="mt-4 text-sm text-gray-800 text-center" >
                            <span className="text-3xl  font-semibold"> {hiddenRulet ? "Muchas Gracias!!" : "Averigua tu suerte!!"}</span>
                        </p>
                    )}
                    {participated && (
                        <p className="mt-4 text-sm text-gray-800 text-center"> Ya usted participó anteriormente, seguro que has ganado algo, reclama tu premio por favor!</p>
                    )}
                </div>
            </div>
        </main>

    );
}


export default function home() {

    return (
        <Suspense fallback={<div>Loading...</div>}  >
            <RuletaPage />
        </Suspense>
    )

}