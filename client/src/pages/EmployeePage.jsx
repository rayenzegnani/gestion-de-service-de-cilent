import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function EmployeePage(){
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchTickets();
  }, []);

  const myTickets = tickets.length; // In a real app, filter by assignedTo
  const inProgress = tickets.filter(t => ['diagnostic', 'en_reparation'].includes(t.status)).length;
  const completedToday = tickets.filter(t => {
    const today = new Date().toDateString();
    const ticketDate = new Date(t.updatedAt).toDateString();
    return t.status === 'termine' && today === ticketDate;
  }).length;

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Mes Tickets</p>
              <p className="text-3xl font-bold mt-2">{loading ? '...' : myTickets}</p>
            </div>
            <div className="bg-white bg-opacity-30 rounded-lg p-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">En Cours</p>
              <p className="text-3xl font-bold mt-2">{loading ? '...' : inProgress}</p>
            </div>
            <div className="bg-white bg-opacity-30 rounded-lg p-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm font-medium">Complétés Aujourd'hui</p>
              <p className="text-3xl font-bold mt-2">{loading ? '...' : completedToday}</p>
            </div>
            <div className="bg-white bg-opacity-30 rounded-lg p-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition duration-200">
            <div className="bg-indigo-100 rounded-lg p-3">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Voir Mes Tickets</p>
              <p className="text-sm text-gray-500">Tickets assignés à moi</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition duration-200">
            <div className="bg-yellow-100 rounded-lg p-3">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Mettre à Jour Statut</p>
              <p className="text-sm text-gray-500">Modifier l'état des tickets</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Activité Récente</h3>
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : tickets.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Aucune activité récente</p>
        ) : (
          <div className="space-y-3">
            {tickets.slice(0, 5).map((ticket) => {
              const statusColors = {
                'recu': 'bg-blue-500',
                'diagnostic': 'bg-purple-500',
                'en_reparation': 'bg-yellow-500',
                'pret': 'bg-green-500',
                'termine': 'bg-gray-500'
              };
              return (
                <div key={ticket._id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 ${statusColors[ticket.status] || 'bg-gray-500'} rounded-full`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                      Ticket #{ticket._id.slice(-4).toUpperCase()} - {ticket.status}
                    </p>
                    <p className="text-xs text-gray-500">{ticket.device?.type} - {ticket.description?.slice(0, 50)}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(ticket.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
