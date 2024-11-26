"use client"; 

import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

const Collaborator = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <h1 className="text-2xl mb-4">Collaborator</h1>
        <button onClick={handleLogout} className="p-2 bg-red-500 text-white">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Collaborator;
