import React, { useState } from 'react';
import api from '../utils/api';

export default function CustomerForm({ onSaved }){
  const [name,setName] = useState('');
  const [company,setCompany] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');

  const submit = async e => {
    e.preventDefault();
    const data = await api.post('/customers', { name, company, email, phone });
    if(data._id){
      setName(''); setCompany(''); setEmail(''); setPhone('');
      if(onSaved) onSaved();
    } else alert('Save failed');
  };

  return (
    <form className="customer-form" onSubmit={submit}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required />
      <input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Company" />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" />
      <button type="submit">Add customer</button>
    </form>
  );
}
