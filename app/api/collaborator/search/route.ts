import { NextResponse } from "next/server";
import { searchCollaborators } from "../collaboratorsModel";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchValue = url.searchParams.get("searchValue");
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Token no proporcionado" }, { status: 400 });
  }

  if (!searchValue) {
    return NextResponse.json({ error: "Valor de búsqueda no proporcionado" }, { status: 400 });
  }

  try {
    const existingUsers: any = await searchCollaborators(searchValue);

    return NextResponse.json(existingUsers.length > 0 ? existingUsers : [], { status: 200 });
  } catch (error: any) {
    console.error("Error al buscar colaboradores:", error.message);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}