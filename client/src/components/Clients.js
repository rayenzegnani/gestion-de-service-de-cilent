import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Clients(){
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');

  const fetch = async ()=>{
    const res = await api.get('/clients');
    setClients(res.data);
  };

  useEffect(()=>{ fetch(); }, []);

  const submit = async (e)=>{
    e.preventDefault();
    await api.post('/clients', { name });
    setName('');
    fetch();
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Clients</h3>
      <form onSubmit={submit} className="flex gap-2 mb-2">
        <input className="flex-1 border rounded p-2" placeholder="Nom" value={name} onChange={e=>setName(e.target.value)} />
        <button type="submit" className="bg-green-600 text-white px-3 rounded">Ajouter</button>
      </form>
      <ul className="space-y-1 max-h-48 overflow-auto">
        {clients.map(c => <li key={c._id} className="p-2 bg-gray-50 rounded border">{c.name}</li>)}
      </ul>
    </div>
  );
}
