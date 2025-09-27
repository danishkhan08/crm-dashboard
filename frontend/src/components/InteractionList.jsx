import React, { useEffect, useState } from 'react';
import api from '../utils/api';

export default function InteractionList({ customer, onUpdate }){
  const [list, setList] = useState([]);
  const [summary, setSummary] = useState('');
  const [type, setType] = useState('note');

  const load = ()=> api.get('/interactions/customer/'+customer._id).then(setList).catch(()=>setList([]));

  useEffect(()=> load(), [customer]);

  const add = async e => {
    e.preventDefault();
    const res = await api.post('/interactions', { customer: customer._id, type, summary });
    if(res._id){ setSummary(''); load(); if(onUpdate) onUpdate(); }
    else alert('Failed');
  };

  const remove = async id => {
    await api.del('/interactions/'+id);
    load();
    if(onUpdate) onUpdate();
  };

  return (
    <div>
      <h4>Interactions with {customer.name}</h4>
      <form onSubmit={add} className="interaction-form">
        <select value={type} onChange={e=>setType(e.target.value)}>
          <option value="note">Note</option>
          <option value="call">Call</option>
          <option value="email">Email</option>
          <option value="meeting">Meeting</option>
        </select>
        <input value={summary} onChange={e=>setSummary(e.target.value)} placeholder="Summary" />
        <button type="submit">Add</button>
      </form>
      <ul className="interactions">
        {list.map(i=>(
          <li key={i._id}>
            <div><strong>{i.type}</strong> — {new Date(i.date).toLocaleString()}</div>
            <div>{i.summary}</div>
            <button onClick={()=>remove(i._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
