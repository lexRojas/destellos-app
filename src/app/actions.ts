"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "@/../lib/prisma";

const ClienteSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido." }),
  correo: z.string(),
  telefono: z
    .string()
    .min(8, { message: "El teléfono debe tener al menos 8 dígitos." }),
});

export type State = {
  errors?: {
    nombre?: string[];
    correo?: string[];
    telefono?: string[];
  };
  message?: string | null;
  successfully?: boolean;
  idCliente?: number;
};

export async function createCliente(prevState: State, formData: FormData) {
  console.log(formData);
  const validatedFields = ClienteSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    const errores = z.treeifyError(validatedFields.error);

    const correo_error = errores.properties?.correo?.errors;
    const nombre_error = errores.properties?.nombre?.errors;
    const telefono_error = errores.properties?.telefono?.errors;

    return {
      errors: {
        nombre: nombre_error,
        correo: correo_error,
        telefono: telefono_error,
      },
      message: "Faltan campos. No se pudo crear el cliente.",
      successfully: false,
    };
  }

  const { nombre, correo, telefono } = validatedFields.data;

  try {
    const existingClient = await prisma.clientes.findFirst({
      where: { telefono },
    });

    if (existingClient) {
      return {
        message: `El cliente con el telefono ${telefono} ya existe.`,
        successfully: false,
        errors: {},
      };
    }

    const newCliente = await prisma.clientes.create({
      data: { nombre, correo, telefono },
    });
    revalidatePath("/"); // Opcional: revalida la ruta si muestras una lista de clientes.
    return {
      message: `Cliente "${nombre}" creado exitosamente.`,
      errors: {},
      successfully: true,
      idCliente: newCliente.idCliente,
    };
  } catch (e) {
    console.error("Error al crear cliente:", e);
    return {
      message: "Error de base de datos: No se pudo crear el cliente.",
      errors: {},
      successfully: false,
    };
  }
}
