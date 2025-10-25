import React, { useState } from 'react';
import { login } from '../auth';
import Register from './Register';

export default function Login({ onLogin }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [mode, setMode] = useState('login');

  const submit = async (e)=>{
    e.preventDefault();
    try{
      const data = await login(email, password);
      onLogin(data.user);
    }catch(err){ setErr(err.response?.data?.message || 'Erreur'); }
  };

  if(mode === 'register') return <Register onRegistered={(user)=>{ onLogin(user); setMode('login'); }} onCancel={()=>setMode('login')} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Atelier</h1>
          <p className="text-gray-600">Gestion de Service Client</p>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Connexion</h2>
        
        {err && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {err}
          </div>
        )}
        
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
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
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
              placeholder="••••••••" 
              value={password} 
              onChange={e=>setPassword(e.target.value)}
              required
            />
          </div>
          
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl">
            Se connecter
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Pas encore de compte ?{' '}
            <button 
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline" 
              onClick={()=>setMode('register')}
            >
              Créer un compte
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
