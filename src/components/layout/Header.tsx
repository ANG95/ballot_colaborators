import React from 'react';
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { IoMdLogOut } from "react-icons/io";

const Header = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    const userConfirmed = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    
    if (userConfirmed) {
      dispatch(logout());
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("userData");
      window.location.href = `/`;
    }
  };
  
  return (
    <header className="flex items-center justify-between p-3 bg-gray-900 text-white">
      <h1 className="text-xl font-semibold"></h1>
      <div className="flex items-center space-x-4">
        {/* <button className="p-2 bg-blue-600 rounded hover:bg-blue-500">Notifications</button> */}
        {/* <button className="p-1 bg-blue-600 rounded hover:bg-blue-500">User</button> */}
        <b>{localStorage.getItem("rolName")}:</b>
        <div>{localStorage.getItem("userName")}</div>
        <button
          onClick={handleLogout}
          className="p-1 bg-red-500 text-white rounded"
        >
        <IoMdLogOut />
        </button>
      </div>
    </header>
  );
};

export default Header;
