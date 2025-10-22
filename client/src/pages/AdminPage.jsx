import React from 'react';

export default function AdminPage(){
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Espace Admin</h2>
      <div className="bg-white p-4 rounded shadow">
        <p className="mb-2">Gestion des utilisateurs, suppression, droits.</p>
        <button className="bg-red-600 text-white px-3 py-2 rounded">Gérer utilisateurs</button>
      </div>
    </div>
  );
}
