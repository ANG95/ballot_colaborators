import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { addInvoice, listInvoices } from "./invoiceModel";
import { currentDate } from "@/utils/functions";
import jwt_decode from "jwt-decode";
import { GoogleUser } from "@/types/user";

export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization");

  const url = new URL(req.url);
  const isPrefixListMyInvoices = url.searchParams.get("prefix");

  if (!authHeader) {
    return NextResponse.json({ error: "Token no proporcionado" }, { status: 400 });
  }
  try {

    const token = authHeader.split(" ")[1];
    const decoded = jwt_decode<GoogleUser>(token);
    const { email } = decoded;

    let queryConcat: string= '';
    if (isPrefixListMyInvoices) {
      queryConcat = ` WHERE email = '${email}'` 
    }
    const invoices: any = await listInvoices(queryConcat);
    return NextResponse.json(invoices, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Error en el servidor"+ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const invoiceFiles: any[] = formData.getAll("invoiceFile");
    const userId = formData.get("userId");
    const period = formData.get("period");

    if (!invoiceFiles.length || !userId || !period) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    for (const invoiceFile of invoiceFiles) {
      if (!(invoiceFile instanceof File)) {
        return NextResponse.json({ error: "Todos los archivos deben ser válidos" }, { status: 400 });
      }

      if (invoiceFile.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: `El archivo ${invoiceFile.name} excede el tamaño máximo permitido (5MB)` }, { status: 400 });
      }
    }
    const uploadDir = path.resolve('./public/boletas');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    for (const invoiceFile of invoiceFiles) {
      const filename = `${userId}-${currentDate()}-${invoiceFile.name}`;
      const filepath = path.join(uploadDir, filename);

      const buffer = await invoiceFile.arrayBuffer();
      const fileBuffer = Buffer.from(buffer);

      fs.writeFileSync(filepath, fileBuffer);

      const uploadDate: Date = new Date();
      const invoiceData = {
        userId: Number(userId),
        period: String(period),
        filepath: filename,
        uploadDate: uploadDate,
      };
      const invoiceAddResult = await addInvoice(invoiceData);
      if (!invoiceAddResult) {
        return NextResponse.json({ error: "Error al agregar las facturas a la base de datos" }, { status: 500 });
      }
    }    

    return NextResponse.json({ message: "Facturas cargadas y registradas exitosamente" }, { status: 200 });
  } catch (error) {
    console.error('Error en la carga de archivos:', error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
