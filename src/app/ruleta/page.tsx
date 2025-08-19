"use client";

import { useState, } from "react";
import Image from "next/image";


export default function HomePage() {



    const [angle, setAngle] = useState(0); // ángulo acumulado de la ruleta
    const [isSpinning, setIsSpinning] = useState(false);
    const [participated, setParticipated] = useState(false);
    const [finalLabel, setFinalLabel] = useState<string | null>(null);


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
        if (isSpinning) return;
        setFinalLabel(null);
        setIsSpinning(true);
        setParticipated(true);

        // 4..6 vueltas completas + 0..359° aleatorio
        const fullTurns = 360 * (4 + Math.floor(Math.random() * 3));
        const randomOffset = Math.floor(Math.random() * 360);
        const nextAngle = angle + fullTurns + randomOffset;

        setAngle(nextAngle);
    };

    const handleTransitionEnd = () => {
        const normalized = ((angle % 360) + 360) % 360;
        const relativeToTop = ((topOffsetDeg - normalized) % 360 + 360) % 360;
        const index = Math.floor(relativeToTop / sectorSize);

        setFinalLabel(labels[index]);
        setIsSpinning(false);


    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24 bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
                <h1 className="text-2xl font-bold text-center text-red-400">Felicidades, puedes participar en nuestra rifa!</h1>
                <div className="flex flex-col items-center justify-center bg-white">
                    {/* Contenedor principal */}
                    <div className="relative w-64 h-64 flex items-center justify-center">
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
                        disabled={isSpinning || participated}
                        className={`mt-10 px-6 py-3 text-white font-semibold rounded-lg shadow-md transition
              ${isSpinning ? "bg-gray-500 cursor-not-allowed" : "bg-rose-400 hover:bg-red-800"}`}
                        hidden={participated}
                    >
                        GIRAR
                    </button>

                    {/* Resultado */}
                    {finalLabel ? (
                        <p className="my-6 text-sm text-gray-800">
                            <span className="text-3xl font-bold animate-pulse text-rose-400">{finalLabel}</span>
                        </p>
                    ) : (
                        <p className="mt-4 text-sm text-gray-800">
                            <span className="font-semibold">Averigua tu suerte !</span>
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
}
