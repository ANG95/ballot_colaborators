import { useEffect, useState } from "react";
import apiClient from "@/lib/axios";
import { toast } from "react-toastify";

export const useGetUsersRol = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  return { data, loading, fetchCollaborator: fetchUsers };
};

export const useProfileUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const profileUpdate = async ({
    given_name,
    family_name,
    birthdate,
    rol,
    email,
  }) => {
    try {
      setLoading(true);
      const response = await apiClient.put(`/api/profile`, {
        given_name,
        family_name,
        birthdate,
        rol,
        email,
      });
      toast.success("¡Datos actualizados correctamente!");
      return response.data;
    } catch (err) {
      setError(err);
      console.error("Error al actualizar el perfil:", err);
      toast.error(
        "¡Ups!, ocurrió un error al actualizar los datos, por favor intente nuevamente"
      );
    } finally {
      setLoading(false);
    }
  };

  return { profileUpdate, loading, error };
};
