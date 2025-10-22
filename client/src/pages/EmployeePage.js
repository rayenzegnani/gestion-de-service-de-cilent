import React from 'react';

export default function EmployeePage(){
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Espace Employé</h2>
      <div className="bg-white p-4 rounded shadow">
        <p className="mb-2">Voir les tickets assignés, mettre à jour le statut.</p>
        <button className="bg-yellow-500 text-white px-3 py-2 rounded">Mes tickets</button>
      </div>
    </div>
  );
}
