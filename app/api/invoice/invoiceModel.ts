import { query } from "@/lib/db";

interface addInvoiceProps {
  userId: number, 
  period: string, 
  filepath: string, 
  uploadDate: Date
}

export const addInvoice = async ({ userId, period, filepath, uploadDate }: addInvoiceProps) => {
  try {
    const querySQL = `
    INSERT INTO boletas (usuario_id, periodo, archivo_boleta, fecha_carga)
    VALUES (?, ?, ?, ?)`;
    const result = await query(querySQL, [userId, period, filepath, uploadDate]);
    return result;
  } catch (error: any) {
    console.log('err0r', error)
    throw new Error('Error creating invoice', error);
  }
};