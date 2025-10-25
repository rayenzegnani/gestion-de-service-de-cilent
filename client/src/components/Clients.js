import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Clients(){
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetch = async ()=>{
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/clients');
      setClients(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des clients');
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ fetch(); }, []);

  const submit = async (e)=>{
    e.preventDefault();
    if (!name.trim()) return;
    
    try {
      setError('');
      await api.post('/clients', { name });
      setName('');
      fetch();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création du client');
      console.error('Error creating client:', err);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-blue-100 rounded-lg p-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Clients</h3>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={submit} className="mb-4">
        <div className="flex gap-2">
          <input 
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
            placeholder="Nom du client" 
            value={name} 
            onChange={e=>setName(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
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
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-sm text-gray-500 mt-2">Chargement...</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-sm">Aucun client</p>
          </div>
        ) : (
          clients.map(c => (
            <div key={c._id} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition duration-200 flex items-center gap-3">
              <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                {c.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{c.name}</p>
                {c.email && <p className="text-xs text-gray-500">{c.email}</p>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
