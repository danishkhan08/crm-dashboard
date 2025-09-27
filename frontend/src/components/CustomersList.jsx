import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import CustomerForm from './CustomerForm';
import InteractionList from './InteractionList';

export default function CustomersList(){
  const [customers,setCustomers] = useState([]);
  const [selected,setSelected] = useState(null);

  const load = ()=> api.get('/customers').then(setCustomers).catch(()=>setCustomers([]));

  useEffect(()=> load(), []);

  const select = (c)=> setSelected(c);

  return (
    <div>
      <h3>Customers</h3>
      <CustomerForm onSaved={load} />
      <div className="columns">
        <div className="col">
          <ul className="customers">
            {customers.map(c=>(
              <li key={c._id} onClick={()=>select(c)} className={selected?._id===c._id?'active':''}>
                <strong>{c.name}</strong><br/>
                <small>{c.company} • {c.email}</small>
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          {selected ? <InteractionList customer={selected} onUpdate={load} /> : <em>Select a customer</em>}
        </div>
      </div>
    </div>
  );
}
