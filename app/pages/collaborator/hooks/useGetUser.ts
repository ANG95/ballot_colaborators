/* eslint-disable @typescript-eslint/no-explicit-any */
// import apiClient from "@/lib/axios";
import axios from "axios";
import { useState, useEffect } from "react";

export const useGetUsers = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/login');
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