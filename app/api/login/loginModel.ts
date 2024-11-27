import { query } from "@/lib/db";

export const selectUser = async (email: string) => {
  try {
    const result = await query(`SELECT * FROM db_boletas.users WHERE email = "${email}"`);

    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error('Error creating user', error);
  }
};

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