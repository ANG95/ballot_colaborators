/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

export const selectCollaborators = async () => {
  try {
    const result = await query(`
      SELECT 
          users.id,
          email,
          name,
          given_name,
          family_name,
          picture,
          created_at,
          updated_at,
          rol_id,
          rol_nombre,
          descripcion
      FROM
          users
              INNER JOIN
          roles ON users.rol_id = roles.id
      WHERE
          rol_nombre = "colaborador"`);
    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error('Error creating user', error);
  }
};
export const selectUserByEmail = async (email: string) => {
  try {
    const result = await query(`SELECT 
    users.id,
    email,
    name,
    given_name,
    family_name,
    picture,
    created_at,
    updated_at,
    rol_id,
    rol_nombre,
    descripcion
FROM
    users
        INNER JOIN
    roles ON users.rol_id = roles.id
WHERE
    email = ?`, [email]);
    return result;
    
  } catch (error: any) {
    throw new Error(`Error al buscar usuario: ${error.message}`);
  }
};

export const createUser = async (email: string, name: string, given_name: string, family_name: string, picture: string) => {
  try {
    const result = await query(
      `INSERT INTO users (email, name, given_name, family_name, picture, rol_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [email, name, given_name, family_name, picture, 2]
    );

    // Verificar si el resultado es de tipo OkPacket
    if (result && (result as ResultSetHeader).affectedRows) {
      const typedResult = result as ResultSetHeader;
      return typedResult.affectedRows > 0; // Usuario creado exitosamente
    } else {
      throw new Error("Error en la consulta, no se afectaron filas.");
    }
  } catch (error: any) {
    throw new Error(`Error al crear usuario: ${error.message}`);
  }
};

export const searchCollaborators = async (searchTerm: string) => {
  try {
    const result = await query(`
      SELECT 
          users.id,
          email,
          name,
          given_name,
          family_name,
          picture,
          created_at,
          updated_at,
          rol_id,
          rol_nombre,
          descripcion
      FROM
          users
      INNER JOIN
          roles ON users.rol_id = roles.id
      WHERE
          CONCAT(email, ' ', name, ' ', given_name, ' ', family_name) LIKE ?
    LIMIT 6`, [`%${searchTerm}%`]);
    return result;
  } catch (error) {
    throw new Error(`Error searching collaborators: ${error.message}`);
  }
};
