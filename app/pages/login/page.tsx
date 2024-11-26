"use client";

import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { useRouter } from 'next/navigation';
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
    router.push(`/pages/administrator`);
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
