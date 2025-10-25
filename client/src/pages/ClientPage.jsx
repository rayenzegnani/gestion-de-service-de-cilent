import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function ClientPage(){
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Fetch tickets
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get('/tickets');
      setTickets(res.data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Calculate statistics
  const totalTickets = tickets.length;
  const inRepair = tickets.filter(t => t.status === 'en_reparation').length;
  const ready = tickets.filter(t => t.status === 'pret').length;

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Bienvenue sur votre espace client</h2>
        <p className="text-blue-100">Créez des tickets de réparation et suivez leur statut en temps réel.</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Mes Tickets</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {loading ? '...' : totalTickets}
              </p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">En Réparation</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {loading ? '...' : inRepair}
              </p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Prêts à Récupérer</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {loading ? '...' : ready}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Create Ticket Button */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Créer une Demande de Réparation</h3>
        <p className="text-gray-600 mb-4">
          Vous avez un appareil à réparer ? Créez un nouveau ticket pour commencer le processus.
        </p>
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {showCreateForm ? 'Annuler' : 'Nouveau Ticket de Réparation'}
        </button>
        
        {showCreateForm && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">
              Utilisez le formulaire "Tickets de Réparation" en bas de la page pour créer un nouveau ticket.
            </p>
          </div>
        )}
      </div>

      {/* Status Guide */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Comprendre les Statuts</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">Reçu</span>
            <p className="text-sm text-gray-600">Votre appareil a été enregistré dans notre système</p>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">Diagnostic</span>
            <p className="text-sm text-gray-600">Notre équipe analyse le problème</p>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full">En Réparation</span>
            <p className="text-sm text-gray-600">La réparation est en cours</p>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">Prêt</span>
            <p className="text-sm text-gray-600">Votre appareil est prêt à être récupéré</p>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">Terminé</span>
            <p className="text-sm text-gray-600">La réparation est terminée et récupérée</p>
          </div>
        </div>
      </div>
    </div>
  );
}
