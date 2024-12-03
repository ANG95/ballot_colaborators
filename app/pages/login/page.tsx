"use client";

import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";
import jwt_decode from 'jwt-decode';
import apiClient from "@/lib/axios";
import Image from 'next/image';
import { toast } from "react-toastify";
import { useMsal } from '@azure/msal-react';
import GitHubLogin from 'react-github-login';
import axios from "axios";

const storeUserData = (data: any) => {
  window.localStorage.setItem("token", data.token);
  window.localStorage.setItem("rol_id", data.rol_id.toString());
  window.localStorage.setItem("rolName", data.rol_nombre.toString());
  window.localStorage.setItem("email", data.email.toString());
  window.localStorage.setItem("userName", data.given_name.toString());
};

const redirectToRolePage = (role: string) => {
  if (role === 'administrador') {
    window.location.href = "/pages/administrator";
  } else if (role === 'colaborador') {
    window.location.href = "/pages/profile";
  } else {
    toast.error("Error: Rol no válido.");
  }
};

const Login = () => {
  const dispatch = useDispatch();
  const { instance } = useMsal();

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

      const { email, name, given_name, family_name, picture } = decodedToken;
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

        if (res.data && res.data.rol_id) {
          storeUserData(res.data);
          redirectToRolePage(res.data.rol_nombre);
        } else {
          toast.error("No se recibió una URL de redirección.");
        }
      } catch (error) {
        console.error("Error al comunicar con el backend:", error);
        toast.error("Error al intentar autenticar con el backend.");
      }
    } else {
      toast.error("Google Login Failed: No credential received.");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Login Failed: Hubo un problema con la autenticación.");
  };

  const handleMicrosoftLogin = () => {
    instance
      .loginPopup()
      .then((response) => {
        console.log('Microsoft Login Successful:', response);
        //TODO IMPLEMENTATION MICROSOFT
      })
      .catch((error) => {
        console.error('Microsoft Login Failed:', error);
        toast.error('Microsoft Login Failed: Hubo un problema con la autenticación.');
      });
  };

  const handleGitHubSuccess = async (response: { code: string }) => {
    try {
      const code = response.code;
      const resGithubUser = await axios.post('/api/login/github', { code }, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (resGithubUser.data && resGithubUser.data.rol_id) {
        storeUserData(resGithubUser.data);
        redirectToRolePage(resGithubUser.data.rol_nombre);
      } else {
        toast.error("GitHub Login Failed: No se pudo obtener los datos del usuario.");
      }
    } catch (error) {
      console.error('GitHub Login Failed:', error);
      toast.error("Error durante el inicio de sesión con GitHub.");
    }
  };

  const handleGitHubFailure = () => {
    toast.error("GitHub Login Failed: Hubo un problema con la autenticación.");
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
      <div className="login-buttons-container">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
          theme="outline"
        />
        <button onClick={handleMicrosoftLogin} className="microsoft-button">
          Iniciar sesión con Microsoft
        </button>

        <GitHubLogin
          clientId={process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}
          onSuccess={handleGitHubSuccess}
          onFailure={handleGitHubFailure}
          redirectUri="http://localhost:3000"
          className="github-button"
        />
      </div>
    </div>
  );
};

export default Login;
