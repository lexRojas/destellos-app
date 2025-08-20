"use server";

import prisma from "@/../lib/prisma";

export interface Ganador {
  idCliente: number | null;
  nombre: string | null;
  correo: string | null;
  telefono: string | null;
  premio: string;
}

export async function getGanadores(): Promise<Ganador[]> {
  try {
    const ganadores = await prisma.cliente_promociones.findMany({
      select: {
        premio: true,
        Cliente: {
          select: {
            idCliente: true,
            nombre: true,
            correo: true,
            telefono: true,
          },
        },
      },
    });

    // Aplanamos la estructura para que sea más fácil de usar en el componente
    return ganadores.map((g) => ({
      idCliente: g.Cliente.idCliente,
      nombre: g.Cliente.nombre,
      correo: g.Cliente.correo,
      telefono: g.Cliente.telefono,
      premio: g.premio,
    }));
  } catch (error) {
    console.error("Error al obtener la lista de ganadores:", error);
    return [];
  }
}
