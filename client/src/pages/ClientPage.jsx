import React from 'react';

export default function ClientPage(){
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Espace Client</h2>
      <div className="bg-white p-4 rounded shadow">
        <p className="mb-2">Interface simplifiée pour les clients: créer ticket, voir statut.</p>
        <button className="bg-indigo-600 text-white px-3 py-2 rounded">Nouveau ticket</button>
      </div>
    </div>
  );
}
