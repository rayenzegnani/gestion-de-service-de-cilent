import React from 'react';

export default function Layout({ user, children, onLogout }){
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Atelier</div>
        <div className="flex items-center gap-3">
          {user ? <div className="text-sm">{user.name} ({user.role})</div> : <div>Non connecté</div>}
          {user && onLogout && (
            <button onClick={onLogout} className="text-sm px-3 py-1 bg-red-500 text-white rounded">Déconnexion</button>
          )}
        </div>
      </header>
      <div className="flex">
        <aside className="w-56 bg-white p-4 border-r">
          <nav className="flex flex-col gap-2">
            <a className="text-sm text-gray-700">Dashboard</a>
            <a className="text-sm text-gray-700">Clients</a>
            <a className="text-sm text-gray-700">Appareils</a>
            <a className="text-sm text-gray-700">Tickets</a>
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
