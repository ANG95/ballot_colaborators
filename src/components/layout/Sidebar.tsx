"use client";


"use client";

import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const rol_id = parseInt(window.localStorage.getItem("rol_id") || "0");
  console.log("Rol desde Sidebarrrrrrrrrrr:", rol_id);


  return (

    <div className="flex flex-col w-64 h-screen bg-gray-800 text-white">
      {rol_id === 1 ? (
        // Menú para Administrador
        <div>
          <div className="flex items-center justify-center h-16 bg-gray-900">
            <h2 className="text-2xl font-bold">Logo</h2>
          </div>
          <nav className="flex flex-col p-4 space-y-4">
            <Link href="/pages/administrator">Administrar Usuarios</Link>
            <Link href="/pages/invoice">Boletas</Link>
          </nav>
        </div>
      ) : rol_id === 2 ? (
        // Menú para Colaborador
        <div>
          <nav className="flex flex-col p-4 space-y-4">
            <Link href="/pages/collaborator" className="text-lg hover:text-blue-400">Actualizar Perfil</Link>
            <Link href="/pages/invoicesee" className="text-lg hover:text-blue-400">Ver Boletas</Link>
          </nav>
        </div>
      ) : (
        <div>No tiene un rol asignado.</div>
      )}
    </div>

  );
};

export default Sidebar;


