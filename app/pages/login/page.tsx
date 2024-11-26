"use client";

import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import Image from "next/image";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    console.log("ejecutando login");
    const token = "mi_token_generado";
    dispatch(login(token));
    setTimeout(() => {
      window.location.href = "/pages/administrator";
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <h1 className="text-2xl mb-4">Login</h1>
        <Image
          className="dark"
          src="/images/svg/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <button onClick={handleLogin} className="p-2 bg-blue-500 text-white">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
