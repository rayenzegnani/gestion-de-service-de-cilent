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

  // Show login page without layout when not authenticated
  if (!user) {
    return <Login onLogin={onLogin} />;
  }

  return (
    <Layout user={user} onLogout={logout}>
      <div className="space-y-6">
        {/* Dashboard Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {user.role === 'admin' && 'Tableau de bord Administrateur'}
            {user.role === 'employee' && 'Tableau de bord Employé'}
            {user.role === 'client' && 'Mon Espace Client'}
          </h1>
          <p className="text-gray-600">
            Bienvenue, {user.name}
          </p>
        </div>

        {/* Role-specific Dashboard */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {user.role === 'client' && <ClientPage />}
          {user.role === 'employee' && <EmployeePage />}
          {user.role === 'admin' && <AdminPage />}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar - Clients & Devices */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Clients />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Devices />
            </div>
          </div>

          {/* Right content - Tickets */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Tickets />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
