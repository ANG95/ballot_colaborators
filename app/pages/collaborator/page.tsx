/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; 

import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from 'next/navigation';
import { useGetUsers } from "./hooks/useGetUser";

const Collaborator = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {data, error, loading } = useGetUsers();

  const handleLogout = () => {
    dispatch(logout());
    router.push(`/`);
    window.location.href = `/`
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <h1 className="text-2xl mb-4">Collaborator</h1>
        {
          data && data.map((user: any)=>
          <div key={user.email}>

            {user.email}
          </div>
          )
        }
        <button onClick={handleLogout} className="p-2 bg-red-500 text-white">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Collaborator;
