import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Tickets(){
  const [tickets, setTickets] = useState([]);
  const [clients, setClients] = useState([]);
  const [devices, setDevices] = useState([]);
  const [clientId, setClientId] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetch = async ()=>{
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/tickets');
      setTickets(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des tickets');
      console.error('Error fetching tickets:', err);
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
  
  const fetchDevices = async ()=>{
    try {
      const res = await api.get('/devices');
      setDevices(res.data);
      if(res.data[0]) setDeviceId(res.data[0]._id);
    } catch (err) {
      console.error('Error fetching devices:', err);
    }
  }

  useEffect(()=>{ fetch(); fetchClients(); fetchDevices(); }, []);

  const submit = async (e)=>{
    e.preventDefault();
    if (!description.trim()) return;
    
    try {
      setError('');
      await api.post('/tickets', { client: clientId, device: deviceId, description });
      setDescription('');
      fetch();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création du ticket');
      console.error('Error creating ticket:', err);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-purple-100 rounded-lg p-2">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Tickets de Réparation</h3>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={submit} className="mb-6 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
        <h4 className="font-semibold text-gray-800 mb-4">Créer un nouveau ticket</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
            <select 
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" 
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
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appareil</label>
            <select 
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" 
              value={deviceId} 
              onChange={e=>setDeviceId(e.target.value)}
              disabled={devices.length === 0}
            >
              {devices.length === 0 ? (
                <option>Aucun appareil disponible</option>
              ) : (
                devices.map(d => <option key={d._id} value={d._id}>{d.type} — {d.client?.name}</option>)
              )}
            </select>
          </div>
        </div>
        
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description du problème</label>
          <textarea 
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" 
            placeholder="Décrivez le problème rencontré..." 
            value={description} 
            onChange={e=>setDescription(e.target.value)}
            rows="3"
            required
            disabled={clients.length === 0 || devices.length === 0}
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={clients.length === 0 || devices.length === 0}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Créer le ticket
        </button>
        {(clients.length === 0 || devices.length === 0) && (
          <p className="text-sm text-amber-700 mt-2 text-center">
            Vous devez d'abord créer un client et un appareil pour créer un ticket.
          </p>
        )}
      </form>
      
      <div className="space-y-3 max-h-[600px] overflow-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="text-sm text-gray-500 mt-3">Chargement des tickets...</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-lg">Aucun ticket</p>
            <p className="text-sm mt-1">Créez votre premier ticket de réparation</p>
          </div>
        ) : (
          tickets.map(t => {
            const statusColors = {
              'recu': 'bg-blue-100 text-blue-700 border-blue-200',
              'diagnostic': 'bg-purple-100 text-purple-700 border-purple-200',
              'en_reparation': 'bg-yellow-100 text-yellow-700 border-yellow-200',
              'pret': 'bg-green-100 text-green-700 border-green-200',
              'termine': 'bg-gray-100 text-gray-700 border-gray-200'
            };
            const statusLabels = {
              'recu': 'Reçu',
              'diagnostic': 'Diagnostic',
              'en_reparation': 'En Réparation',
              'pret': 'Prêt',
              'termine': 'Terminé'
            };
            
            return (
              <div key={t._id} className="p-5 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition duration-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg">
                      #{t._id.slice(-4).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{t.device?.type}</p>
                      <p className="text-sm text-gray-500">{t.client?.name}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${statusColors[t.status] || statusColors.recu}`}>
                    {statusLabels[t.status] || t.status}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3 bg-gray-50 p-3 rounded-lg">{t.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {new Date(t.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                  {t.price > 0 && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t.price}€ {t.paid ? '(Payé)' : '(Non payé)'}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
