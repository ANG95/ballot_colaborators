import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <h1 className="text-xl font-semibold">My Application</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-blue-600 rounded hover:bg-blue-500">Notifications</button>
        <button className="p-2 bg-blue-600 rounded hover:bg-blue-500">User</button>
      </div>
    </header>
  );
};

export default Header;
