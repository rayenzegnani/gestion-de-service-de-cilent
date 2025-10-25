import React from 'react';

export default function Layout({ user, children, onLogout }){
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Atelier</h1>
              <p className="text-xs text-gray-500">Gestion de Service</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {user && (
              <>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-800">{user.name}</div>
                  <div className="text-xs text-gray-500 capitalize">
                    {user.role === 'admin' && '👑 Administrateur'}
                    {user.role === 'employee' && '👷 Employé'}
                    {user.role === 'client' && '👤 Client'}
                  </div>
                </div>
                {onLogout && (
                  <button 
                    onClick={onLogout} 
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200 text-sm font-semibold shadow-md hover:shadow-lg"
                  >
                    Déconnexion
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </div>
    </div>
  );
}
