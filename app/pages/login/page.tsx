"use client";

import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";
import jwt_decode from 'jwt-decode';
import apiClient from "@/lib/axios";
import Image from 'next/image';
import { toast } from "react-toastify";

const Login = () => {

  const dispatch = useDispatch();

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    if (response.credential) {

      const token = response.credential; 
      const decodedToken = jwt_decode<{
        email: string;
        name: string;
        given_name?: string;
        family_name?: string;
        picture?: string;
      }>(token);

      const { email, name, given_name, family_name, picture} = decodedToken;

      dispatch(login(token));
      window.localStorage.setItem("token", token);

      try {
        const res = await apiClient.post("/api/login", {
          token,
          email,
          name,
          given_name,
          family_name,
          picture,
        });

        if (res.data) {
          if (res.data.rol_id) {

            window.localStorage.setItem("rol_id", res.data.rol_id.toString());
            window.localStorage.setItem("rolName", res.data.rol_nombre.toString());
            window.localStorage.setItem("email", res.data.email.toString());
            window.localStorage.setItem("userName", res.data.given_name.toString());
            
            if (res.data.rol_nombre === 'administrador') {
              window.location.href = "/pages/administrator";
            } else if (res.data.rol_nombre === 'colaborador') {
              window.location.href = "/pages/profile";
            } else {
              console.error("Error: Rol no válido");
              toast.error("Ocurrió un error al intentar iniciar sesión")
            }
          }
        }
        else {
          toast.error("Error: No se recibió una URL de redirección.");
        }
      } catch (error) {
        console.error("Error al comunicar con el backend:", error);
      }
    } else {
      toast.error("Google Login Failed: No credential received");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Login Failed");
  };


  return (
    <div className="center-container ">
      <div>
        <Image
          src="/images/login.png"
          alt="Login Image"
          width={450}  
          height={450}
        />
      </div>
      <div>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>
    </div>
  );
};

export default Login;
