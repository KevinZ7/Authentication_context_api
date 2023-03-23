import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import RegisterPage from './pages/Register/components/RegisterForm';
import LoginPage from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';

import UserList from './pages/UserList';
import User from './pages/User';


function App() {
  return (
    

    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="/userlist" element={<UserList />}/>
          <Route path="/user" element={<User />}/>
        </Route>
        
      </Route>
    </Routes>
     
  );
}

export default App;
