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
    <div className="max-w-sm mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Connexion</h2>
      {err && <div className="text-red-600">{err}</div>}
      <form onSubmit={submit} className="flex flex-col gap-2">
        <input className="border p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="border p-2" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="bg-blue-600 text-white p-2 rounded">Se connecter</button>
      </form>
      <div className="mt-3 text-sm">
        <button className="text-indigo-600" onClick={()=>setMode('register')}>Créer un compte</button>
      </div>
    </div>
  );
}
