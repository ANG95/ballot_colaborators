"use client";

import React from "react";
import Link from "next/link";
import { RiAdminLine } from "react-icons/ri";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  const rol_id = parseInt(window.localStorage.getItem("rol_id") || "0");

  const menuItems = rol_id === 1 ? [
    { href: "/pages/administrator", label: "Colaboradores", icon: <RiAdminLine />    },
    { href: "/pages/invoice", label: "Boletas", icon: <FaFileInvoiceDollar />    },
  ] : rol_id === 2 ? [
    { href: "/pages/profile", label: "Mi perfil", icon: <CgProfile /> },
    { href: "/pages/invoicesee", label: "Mis Boletas", icon: <FaFileInvoiceDollar /> },
  ] : [
    { label: "No tiene un rol asignado.", icon: "⚙️" },
  ];

  return (
    <div className="flex flex-col w-64 h-screen bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <h2 className="text-2xl font-bold">Orbis</h2>
      </div>

      <nav className="flex flex-col p-4 space-y-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href || "#"}
            className={`flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-700 text-white ${
              !item.href ? "cursor-not-allowed text-gray-500" : "hover:text-blue-400"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-lg">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
