import React from 'react'
import useAuth from '../hooks/useAuth';
import { AuthData } from '../shared/interfaces/auth';
import { Outlet, Navigate } from 'react-router-dom';

const RequireAuth = () => {
  const { auth } = useAuth();

  return (
    auth?.loggedIn
      ? <Outlet />
      : <Navigate to="/"/>
  )
}

export default RequireAuth