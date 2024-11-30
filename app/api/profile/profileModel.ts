/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from "@/lib/db";

export const selectProfile = async () => {
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
  } catch (error: any) {
    console.log("aaaaaaaaaaa", error);

    throw new Error("Error creating user", error);
  }
};

export const updateProfile = async (
  id: number,
  given_name: string,
  family_name: string
) => {
  try {
    const result = await query(
      `
      UPDATE users 
      SET given_name = ?, family_name = ?, updated_at = NOW()
      WHERE id = ?`,
      [given_name, family_name, id]
    );

    return result;
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    throw new Error("No se pudo actualizar el perfil");
  }
};

