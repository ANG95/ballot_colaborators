import { NextResponse } from "next/server";
import { selectUserByEmail } from "../login/loginModel";
import { GoogleUser } from "@/types/user";
import jwt_decode from "jwt-decode";
import { updateProfile } from "./profileModel";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Token no proporcionado" },
        { status: 400 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt_decode<GoogleUser>(token);
    const { email } = decoded;
    const result = await selectUserByEmail(email);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}


export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Token no proporcionado" },
        { status: 400 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt_decode(token);
    console.log('decodeeeeeeed', decoded);
    

    const { given_name, family_name } = body;

    if (!given_name || !family_name) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      );
    }

    const existingUser = await selectUserByEmail(decoded.email);
    console.log('exxxxiiiiiiiiiiisss',existingUser);
    
    const result = await updateProfile(existingUser[0].id, given_name, family_name);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}