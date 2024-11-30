import { useState } from "react";
import apiClient from "@/lib/axios";
import { toast } from "react-toastify";

export const useAddInvoices = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleInvoiceInsert = async (invoiceFiles: File[], userId: string, period: string) => {
    setLoading(true);
    setError(null);
  
    const formData = new FormData();
    invoiceFiles.forEach((file) => {
      formData.append('invoiceFile', file);
    });
    formData.append("userId", userId);
    formData.append("period", period);
  
    try {
      const response = await apiClient.post("/api/invoice", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data); 
      toast.success("¡Datos guardados correctamente!")
    } catch (error: any) {
      setError("Error al obtener colaboradores: " + error.message);
      toast.error("¡Ups!, ocurrió un error al guardar los datos, por favor intente nuevamente")
    } finally {
      setLoading(false);
    }
  };
  
  return { insertInvoiceResult: data, insertInvoiceLoading: loading, insertInvoiceError: error, handleInvoiceInsert };
};
