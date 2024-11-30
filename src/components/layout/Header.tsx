import React from 'react';

import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

const Header = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token"); // Limpia el token
    window.localStorage.removeItem("userData"); // Limpia los datos del usuario
    window.location.href = `/`;
  };


  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <h1 className="text-xl font-semibold"></h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-blue-600 rounded hover:bg-blue-500">Notifications</button>
        <button className="p-2 bg-blue-600 rounded hover:bg-blue-500">User</button>
        <button
          onClick={handleLogout}
          className="p-2 bg-red-500 text-white rounded"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Header;
