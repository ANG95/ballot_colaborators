import { query } from "@/lib/db";

export const createUser = async (name: string, email: string) => {
  try {
    const result = await query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error('Error creating user', error);
  }
};