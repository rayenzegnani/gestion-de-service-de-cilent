import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Devices(){
  const [devices, setDevices] = useState([]);
  const [type, setType] = useState('');
  const [clientId, setClientId] = useState('');
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetch = async ()=>{
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/devices');
      setDevices(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des appareils');
      console.error('Error fetching devices:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async ()=>{
    try {
      const res = await api.get('/clients');
      setClients(res.data);
      if(res.data[0]) setClientId(res.data[0]._id);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  }

  useEffect(()=>{ fetch(); fetchClients(); }, []);

  const submit = async (e)=>{
    e.preventDefault();
    if (!type.trim()) return;
    
    try {
      setError('');
      await api.post('/devices', { type, client: clientId });
      setType('');
      fetch();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création de l\'appareil');
      console.error('Error creating device:', err);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-green-100 rounded-lg p-2">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Appareils</h3>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={submit} className="mb-4 space-y-2">
        <select 
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
          value={clientId} 
          onChange={e=>setClientId(e.target.value)}
          disabled={clients.length === 0}
        >
          {clients.length === 0 ? (
            <option>Aucun client disponible</option>
          ) : (
            clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)
          )}
        </select>
        
        <div className="flex gap-2">
          <input 
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
            placeholder="Type d'appareil" 
            value={type} 
            onChange={e=>setType(e.target.value)}
            required
            disabled={clients.length === 0}
          />
          <button 
            type="submit" 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition duration-200 shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={clients.length === 0}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter
          </button>
        </div>
      </form>
      
      <div className="space-y-2 max-h-96 overflow-auto">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="text-sm text-gray-500 mt-2">Chargement...</p>
          </div>
        ) : devices.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Aucun appareil</p>
          </div>
        ) : (
          devices.map(d => (
            <div key={d._id} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition duration-200">
              <div className="flex items-start gap-3">
                <div className="bg-green-500 text-white p-2 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{d.type}</p>
                  <p className="text-sm text-gray-500">{d.client?.name}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
