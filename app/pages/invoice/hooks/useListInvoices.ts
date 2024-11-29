import { useEffect, useState } from "react";
import axios from "axios";
import apiClient from "@/lib/axios";

export const useListInvoices = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get("/api/collaborator");
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { data, loading };
};