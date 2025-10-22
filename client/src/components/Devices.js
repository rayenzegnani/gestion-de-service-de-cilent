import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Devices(){
  const [devices, setDevices] = useState([]);
  const [type, setType] = useState('');
  const [clientId, setClientId] = useState('');
  const [clients, setClients] = useState([]);

  const fetch = async ()=>{
    const res = await api.get('/devices');
    setDevices(res.data);
  };

  const fetchClients = async ()=>{
    const res = await api.get('/clients');
    setClients(res.data);
    if(res.data[0]) setClientId(res.data[0]._id);
  }

  useEffect(()=>{ fetch(); fetchClients(); }, []);

  const submit = async (e)=>{
    e.preventDefault();
    await api.post('/devices', { type, client: clientId });
    setType('');
    fetch();
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Appareils</h3>
      <form onSubmit={submit} className="flex gap-2 mb-2">
        <select className="border rounded p-2" value={clientId} onChange={e=>setClientId(e.target.value)}>
          {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <input className="flex-1 border rounded p-2" placeholder="Type" value={type} onChange={e=>setType(e.target.value)} />
        <button type="submit" className="bg-blue-600 text-white px-3 rounded">Ajouter</button>
      </form>
      <ul className="space-y-1 max-h-48 overflow-auto">
        {devices.map(d => <li key={d._id} className="p-2 bg-gray-50 rounded border">{d.type} — {d.client?.name}</li>)}
      </ul>
    </div>
  );
}
