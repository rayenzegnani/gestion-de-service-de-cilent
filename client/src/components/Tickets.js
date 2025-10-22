import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Tickets(){
  const [tickets, setTickets] = useState([]);
  const [clients, setClients] = useState([]);
  const [devices, setDevices] = useState([]);
  const [clientId, setClientId] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [description, setDescription] = useState('');

  const fetch = async ()=>{
    const res = await api.get('/tickets');
    setTickets(res.data);
  };
  const fetchClients = async ()=>{
    const res = await api.get('/clients');
    setClients(res.data);
    if(res.data[0]) setClientId(res.data[0]._id);
  }
  const fetchDevices = async ()=>{
    const res = await api.get('/devices');
    setDevices(res.data);
    if(res.data[0]) setDeviceId(res.data[0]._id);
  }

  useEffect(()=>{ fetch(); fetchClients(); fetchDevices(); }, []);

  const submit = async (e)=>{
    e.preventDefault();
    await api.post('/tickets', { client: clientId, device: deviceId, description });
    setDescription('');
    fetch();
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Tickets</h3>
      <form onSubmit={submit} className="flex gap-2 mb-3 items-center">
        <select className="border rounded p-2" value={clientId} onChange={e=>setClientId(e.target.value)}>
          {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <select className="border rounded p-2" value={deviceId} onChange={e=>setDeviceId(e.target.value)}>
          {devices.map(d => <option key={d._id} value={d._id}>{d.type} — {d.client?.name}</option>)}
        </select>
        <input className="flex-1 border rounded p-2" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <button type="submit" className="bg-indigo-600 text-white px-3 rounded">Créer</button>
      </form>
      <ul className="space-y-2 max-h-96 overflow-auto">
        {tickets.map(t => (
          <li key={t._id} className="p-3 bg-white rounded border flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600">{t.status} — {t.device?.type} — {t.client?.name}</div>
              <div className="text-base">{t.description}</div>
            </div>
            <div className="text-sm text-gray-500">{new Date(t.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
