import { useState } from "react";

const useZipDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadAsZip = async (fileUrl: string, zipName: string) => {
    setIsDownloading(true);
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error("No se pudo descargar el archivo");
      }
      const fileBlob = await response.blob();

      const zipFile = new Blob(
        [
          new Uint8Array([
            0x50, 0x4b, 0x03, 0x04, 
          ]),
          fileBlob,
        ],
        { type: "application/zip" }
      );

      const zipUrl = URL.createObjectURL(zipFile);
      const a = document.createElement("a");
      a.href = zipUrl;
      a.download = `${zipName}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(zipUrl);
    } catch (error) {
      console.error("Error al descargar el archivo ZIP:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadAsZip, isDownloading };
};

export default useZipDownload;
