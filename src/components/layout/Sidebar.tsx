"use client";

import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-screen bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <h2 className="text-2xl font-bold">Logo</h2>
      </div>
      <nav className="flex flex-col p-4 space-y-4">
        <Link href="/pages/administrator" className="text-lg hover:text-blue-400">
          Administrator
        </Link>
        <Link href="/pages/collaborator" className="text-lg hover:text-blue-400">
          Collaborator
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
