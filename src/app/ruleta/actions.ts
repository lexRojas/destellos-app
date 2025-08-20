"use server";

import { cliente_promociones } from "@prisma/client";

import prisma from "@/../lib/prisma";

export type State = {
  message?: string | null;
  successfully?: boolean;
};

export async function verificarCliente(idCliente: number, idPromocion: number) {
  try {
    const existingClient = await prisma.cliente_promociones.findFirst({
      where: { idCliente, idPromocion },
    });

    if (existingClient) {
      return {
        message: `El cliente  ya existe.`,
        successfully: true,
      };
    }
    return {
      message: `El cliente no  existe.`,
      successfully: false,
    };
  } catch (e) {
    console.error("Error al verificar cliente:", e);
    return {
      message: "Error de base de datos: No se pudo crear el cliente.",
      errors: {},
      successfully: false,
    };
  }
}

export async function guardarClientePromocion(
  idCliente: number,
  idPromocion: number,
  premio: string
) {
  try {
    const clientePromocion: cliente_promociones = {
      idCliente,
      idPromocion,
      premio: premio,
    };

    const newClientePromocion = await prisma.cliente_promociones.create({
      data: clientePromocion,
    });

    if (newClientePromocion) {
      return {
        message: `Promocion registrada.`,
        successfully: true,
      };
    }
    return {
      message: `Promocion no registrada.`,
      successfully: false,
    };
  } catch (e) {
    console.error("Error al verificar cliente:", e);
    return {
      message: "Error de base de datos: No se pudo crear el cliente.",
      errors: {},
      successfully: false,
    };
  }
}
