import { useState } from "react";
import axios from "axios";
import apiClient from "@/lib/axios";

export const useListCollaborators = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCollaboratorSearch = async (searchValue: string, reset: boolean = false) => {
    if (reset) {
      return setData([])
    }
    setLoading(true);
    setError(null);
    try {
      if (searchValue === '') return

      const response = await apiClient.get(`/api/collaborator/search?searchValue=${searchValue}`);
      if (response.data) {
        const transformedData = response.data.map((el: any) => ({
          ...el,
          label: `${el.name} - ${el.email}`
        }));
        setData(transformedData);
      }
    } catch (error: any) {
      setError("Error al obtener colaboradores: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return { searchResult: data, searchLoading: loading, searchError: error, handleCollaboratorSearch };
};
