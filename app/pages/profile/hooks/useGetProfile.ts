import apiClient from "@/lib/axios";
import { useState, useEffect } from "react";

export const useGetProfile = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/api/profile`);
      console.log(response);
      
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  return { data, error, loading };
};

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfile = async ({ given_name, family_name }) => {
    try {
      setLoading(true);
      const response = await apiClient.put(`/api/profile`, {given_name, family_name});
      return response.data;
    } catch (err) {
      setError(err);
      console.error("Error al actualizar el perfil:", err);
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error };
};