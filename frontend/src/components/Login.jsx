import React, { useState } from 'react';
import api from '../utils/api';

export default function Login({ onLogin }){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [mode,setMode] = useState('login');
  const [name,setName] = useState('');

  const submit = async e => {
    e.preventDefault();
    if(mode==='login'){
      const data = await api.post('/auth/login', { email, password });
      if(data.token) onLogin(data.token);
      else alert(data.msg || 'Login failed');
    } else {
      const data = await api.post('/auth/register', { name, email, password });
      if(data.token) onLogin(data.token);
      else alert(data.msg || 'Register failed');
    }
  };

  return (
    <div className="login">
      <h2>{mode==='login'?'Login':'Register'}</h2>
      <form onSubmit={submit}>
        {mode==='register' && <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />}
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">{mode==='login'?'Login':'Create account'}</button>
      </form>
      <button onClick={()=>setMode(mode==='login'?'register':'login')}>Switch to {mode==='login'?'Register':'Login'}</button>
    </div>
  );
}
