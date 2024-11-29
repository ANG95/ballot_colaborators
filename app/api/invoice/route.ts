import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { addInvoice } from "./invoiceModel";
import { Readable } from "stream";

// Función que manejará la carga de los archivos
export async function POST(req: Request) {
  try {
    // Obtener los datos del formulario
    const formData = await req.formData();
    const invoiceFiles = formData.getAll("invoiceFile");
    const userId = formData.get("userId");
    const period = formData.get("period");

    // Validación de los campos requeridos
    if (!invoiceFiles.length || !userId || !period) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    // Validar cada archivo (por ejemplo, tipo y tamaño)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    for (const invoiceFile of invoiceFiles) {
      if (!(invoiceFile instanceof File)) {
        return NextResponse.json({ error: "Todos los archivos deben ser válidos" }, { status: 400 });
      }

      if (invoiceFile.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: `El archivo ${invoiceFile.name} excede el tamaño máximo permitido (5MB)` }, { status: 400 });
      }
    }

    // Verificar si la carpeta existe, si no, crearla
    const uploadDir = path.join(__dirname, '../public/tickets');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Guardar cada archivo
    const filePaths = [];
    for (const invoiceFile of invoiceFiles) {
      const filename = `${userId}-${Date.now()}-${invoiceFile.name}`;
      const filepath = path.join(uploadDir, filename);
      filePaths.push(filepath);

      // Convertir el ReadableStream en un buffer y guardarlo
      const fileStream = invoiceFile.stream(); // Esto devuelve un ReadableStream
      const writeStream = fs.createWriteStream(filepath);

      // Leer los datos del archivo y escribirlos en el archivo
      const buffer = await streamToBuffer(fileStream);

      // Escribir el buffer en el archivo
      await new Promise<void>((resolve, reject) => {
        writeStream.write(buffer, (err) => {
          if (err) {
            reject(new Error("Error al guardar el archivo"));
          } else {
            resolve();
          }
        });
      });
    }

    // Insertar las facturas en la base de datos
    const uploadDate = new Date();
    const invoiceData = {
      userId: userId.toString(),
      period: period.toString(),
      filePaths: filePaths,
      uploadDate: uploadDate,
    };

    const invoiceAddResult = await addInvoice(invoiceData);
    if (!invoiceAddResult) {
      return NextResponse.json({ error: "Error al agregar las facturas a la base de datos" }, { status: 500 });
    }

    // Responder con éxito
    return NextResponse.json({ message: "Facturas cargadas y registradas exitosamente" }, { status: 200 });
  } catch (error) {
    console.error('Error en la carga de archivos:', error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// Función para convertir un ReadableStream en un Buffer
async function streamToBuffer(stream: Readable) {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}
