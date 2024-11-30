import { useEffect, useState } from "react";
import apiClient from "@/lib/axios";
import { removePrefix } from "@/utils/functions";

export const useListInvoices = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      const response = await apiClient.get("/api/invoice");

      const newInvoices = response.data.map((invoice) => {
        const newInvoiceFormat = removePrefix(invoice.archivo_boleta)
        return {
          ...invoice,
          fileNameSplit: newInvoiceFormat
        }
      })
      setData(newInvoices);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchInvoices();
  }, []);

  return { data, loading, fetchInvoices };
};