import React, { useState } from 'react';
import { register } from '../auth';

export default function Register({ onRegistered, onCancel }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState('client');
  const [err, setErr] = useState('');

  const submit = async (e)=>{
    e.preventDefault();
    try{
      const data = await register({ name, email, password, role });
      onRegistered(data.user);
    }catch(error){ setErr(error.response?.data?.message || 'Erreur'); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Atelier</h1>
          <p className="text-gray-600">Gestion de Service Client</p>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Créer un compte</h2>
        
        {err && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {err}
          </div>
        )}
        
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
            <input 
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
              placeholder="Jean Dupont" 
              value={name} 
              onChange={e=>setName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
              placeholder="votre@email.com" 
              value={email} 
              onChange={e=>setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
            <input 
              type="password" 
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
              placeholder="••••••••" 
              value={password} 
              onChange={e=>setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="flex gap-3">
            <button 
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
            >
              Créer mon compte
            </button>
            <button 
              type="button" 
              onClick={onCancel} 
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold p-3 rounded-lg transition duration-200"
            >
              Annuler
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Déjà un compte ?{' '}
            <button 
              className="text-green-600 hover:text-green-700 font-semibold hover:underline" 
              onClick={onCancel}
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
