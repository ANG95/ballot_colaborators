"use client";

import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const rol_id = parseInt(window.localStorage.getItem("rol_id") || "0");
  return (
    <div className="flex flex-col w-64 h-screen bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <h2 className="text-2xl font-bold">Orbis</h2>
      </div>
      <nav className="flex flex-col p-4 space-y-4">
        {rol_id === 1 ? (
          <>
            <Link href="/pages/administrator" className="text-lg hover:text-blue-400">
              Colaboradores
            </Link>
            <Link href="/pages/invoice" className="text-lg hover:text-blue-400">
              Boletas
            </Link>
          </>

        ) : rol_id === 2 ? (
          <>
            <Link href="/pages/collaborator" className="text-lg hover:text-blue-400">
              Mi perfil
            </Link>
            <Link href="/pages/invoicesee" className="text-lg hover:text-blue-400">
              Mis Boletas
            </Link>
          </>

        ) : (
          <div>No tiene un rol asignado.</div>
        )}
      </nav>
    </div>


  );
};

export default Sidebar;


