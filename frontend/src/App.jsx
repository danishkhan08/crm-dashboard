import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import api from './utils/api';

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(()=>{
    if(token) {
      localStorage.setItem('token', token);
      api.setToken(token);
    } else {
      localStorage.removeItem('token');
      api.setToken(null);
    }
  }, [token]);

  if(!token) return <Login onLogin={setToken} />;

  return <Dashboard onLogout={()=>setToken(null)} />;
}
