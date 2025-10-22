import React, { useEffect, useState } from 'react';
import Clients from './components/Clients';
import Devices from './components/Devices';
import Tickets from './components/Tickets';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ClientPage from './pages/ClientPage.jsx';
import EmployeePage from './pages/EmployeePage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import { me, removeToken } from './auth';
import Layout from './components/Layout';

export default function App(){
  const [user, setUser] = useState(null);

  useEffect(()=>{
    (async ()=>{
      try{
        const u = await me();
        setUser(u);
      }catch(e){ setUser(null); }
    })();
  }, []);

  const onLogin = (u)=> setUser(u);
  const logout = ()=>{ removeToken(); setUser(null); };

  return (
    <Layout user={user} onLogout={logout}>
      {!user ? (
        <Login onLogin={onLogin} />
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 bg-white p-4 rounded shadow">
            <Clients />
            <Devices />
          </div>
          <div className="col-span-3 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-2">Tableau de bord</h2>
            {/* Render only the dashboard matching the user's role to avoid multiple dashboards showing */}
            {user.role === 'client' && <ClientPage />}
            {user.role === 'employee' && <EmployeePage />}
            {user.role === 'admin' && <AdminPage />}
            <Tickets />
          </div>
        </div>
      )}
    </Layout>
  );
}
