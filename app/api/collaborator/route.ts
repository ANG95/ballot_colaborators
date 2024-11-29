/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { createUser, selectCollaborators, selectUserByEmail } from "./collaboratorsModel";
import { GoogleUser } from "@/types/user";
import jwt_decode from "jwt-decode";

export async function GET() {
  try {
    const result = await selectCollaborators();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Token no proporcionado" }, { status: 400 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt_decode<GoogleUser>(token);
    
    const { email, name, given_name, family_name, picture } = decoded;

    const existingUser = await selectUserByEmail(email);

    if (Array.isArray(existingUser) && existingUser.length > 0) {
      return NextResponse.json({
        userIsRegister: true,
        ...decoded,
        ...existingUser[0]
      });
    }

    const success = await createUser(email, name, given_name, family_name, picture);
    const reSearchUser: any = await selectUserByEmail(email);

    if (success) {
      return NextResponse.json({
        userIsRegister: false,
        ...decoded,
        ...reSearchUser[0],
      });
    }

    throw new Error("Error al crear el usuario");
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
