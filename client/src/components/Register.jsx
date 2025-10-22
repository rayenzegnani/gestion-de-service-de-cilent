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
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Créer un compte</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit} className="flex flex-col gap-2">
        <input className="border p-2" placeholder="Nom" value={name} onChange={e=>setName(e.target.value)} />
        <input className="border p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="border p-2" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} />
        {/* role is fixed to 'client' for public registration */}
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-3 py-2 rounded">Créer</button>
          <button type="button" onClick={onCancel} className="px-3 py-2 border rounded">Annuler</button>
        </div>
      </form>
    </div>
  );
}
