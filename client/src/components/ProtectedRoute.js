import React from 'react';

export default function ProtectedRoute({ user, allowedRoles, children }){
  if(!user) return null;
  if(allowedRoles && !allowedRoles.includes(user.role)) return null;
  return children;
}
