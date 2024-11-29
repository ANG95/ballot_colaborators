import { query } from "@/lib/db";

export const addInvoice = async ({ userId, period, filepath, uploadDate }) => {
  try {
    const querySQL = `
    INSERT INTO boletas (usuario_id, periodo, archivo_boleta, fecha_carga)
    VALUES (?, ?, ?, ?)`;
    const result = await query(querySQL, [userId, period, filepath, uploadDate]);
    return result;
  } catch (error: any) {
    throw new Error('Error creating user', error);
  }
};