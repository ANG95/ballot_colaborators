"use client";

import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";
import jwt_decode from 'jwt-decode';
import apiClient from "@/lib/axios";
import Image from 'next/image';

const Login = () => {

  const dispatch = useDispatch();

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    if (response.credential) {
      console.log("Token recibido de Google:", response.credential);

      const token = response.credential; // El token de Google que se obtiene al hacer login
      const decodedToken = jwt_decode<{
        email: string;
        name: string;
        given_name?: string;
        family_name?: string;
        picture?: string;
      }>(token);  // Decodificamos el token para obtener la información del usuario

      console.log("Token decodificado:", decodedToken);

      const { email, name, given_name, family_name, picture} = decodedToken;

      dispatch(login(token));
      window.localStorage.setItem("token", token);

      try {
        // Aquí estamos enviando el token y la información del usuario al backend
        const res = await apiClient.post("/api/login", {
          token, // El token de Google se envía al backend para verificar o crear el usuario
          email,
          name,
          given_name,
          family_name,
          picture,
        });

        console.log("Respuesta del backendasssssssssssssss:", res.data);

        if (res.data) {
          console.log("Redirigiendo a:", res.data);
          // setTimeout(() => {
          //   window.location.href = "/pages/administrator";
          // }, 1000);
          // Asegúrate de que el rol_id esté presente
          if (res.data.rol_id) {
            console.log("Rol ID recibidoooooooooo:", res.data.rol_id);  // Verifica el valor del rol_id

            window.localStorage.setItem("rol_id", res.data.rol_id.toString()); // Guardamos el rol_id en localStorage

            // Verificar el rol antes de redirigir
            if (res.data.rol_id === 1) {
              window.location.href = "/administrator";
            } else if (res.data.rol_id === 2) {
              window.location.href = "/collaborator";
            } else {
              console.error("Error: Rol no válido");
            }
          }
        }
        else {
          console.error("Error: No se recibió una URL de redirección.");
        }
      } catch (error) {
        console.error("Error al comunicar con el backend:", error);
      }
    } else {
      console.error("Google Login Failed: No credential received");
    }
  };

  const handleGoogleError = () => {
    console.error("Google Login Failed");
  };


  return (
    <div className="center-container ">
      <div>
        <Image
          src="/images/login.png"
          alt="Login Image"
          width={450}   // Define el ancho de la imagen
          height={450}  // Define la altura de la imagen
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
