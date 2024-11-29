/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from "@/lib/db";
import { OkPacket } from "mysql2";

export const selectUsers = async () => {
  try {
    const result = await query('SELECT * FROM db_boletas.users');
    
    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('aaaaaaaaaaa',error);
    
    throw new Error('Error creating user', error);
  }
};
export const selectUserByEmail = async (email: string) => {
  try {
    const result = await query(`SELECT * FROM db_boletas.users INNER JOIN roles ON users.rol_id = roles.id WHERE email = ?`, [email]);
    console.log('aaaaaaaaaaaaaaaaaaa',result);
    return result;
    
  } catch (error: any) {
    throw new Error(`Error al buscar usuario: ${error.message}`);
  }
};

export const createUser = async (email: string, name: string, given_name: string, family_name: string, picture: string) => {
  try {
    const result = await query(
      `INSERT INTO db_boletas.users (email, name, given_name, family_name, picture, rol_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [email, name, given_name, family_name, picture, 2]
    );

    // Verificar si el resultado es de tipo OkPacket
    if (result && (result as OkPacket).affectedRows) {
      const typedResult = result as OkPacket;
      return typedResult.affectedRows > 0; // Usuario creado exitosamente
    } else {
      throw new Error("Error en la consulta, no se afectaron filas.");
    }
  } catch (error: any) {
    throw new Error(`Error al crear usuario: ${error.message}`);
  }
};