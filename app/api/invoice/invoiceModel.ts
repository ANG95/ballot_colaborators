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


export const listInvoices = async (isExitsEmailQuery) => {
  try {
    const querySQL = `
      SELECT 
          boletas.id,
          usuario_id,
          periodo,
          archivo_boleta,
          fecha_carga,
          email,
          name,
          given_name,
          family_name,
          picture,
          created_at,
          updated_at,
          rol_nombre
      FROM
          boletas
              LEFT JOIN
          users ON boletas.usuario_id = users.id
              LEFT JOIN
          roles ON roles.id = users.rol_id ${isExitsEmailQuery} ORDER BY id DESC`;
    const result = await query(querySQL);
    return result;
  } catch (error: any) {
    console.log('err0r', error)
    throw new Error('Error creating invoice', error);
  }
};