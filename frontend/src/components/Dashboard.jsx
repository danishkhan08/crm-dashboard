import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import CustomersList from './CustomersList';

export default function Dashboard({ onLogout }){
  const [stats, setStats] = useState([]);

  useEffect(()=>{
    api.get('/analytics/interactions-by-type').then(setStats).catch(()=>setStats([]));
  }, []);

  return (
    <div className="app">
      <header>
        <h1>CRM Dashboard</h1>
        <div>
          <button onClick={onLogout}>Logout</button>
        </div>
      </header>
      <main>
        <section className="panel">
          <h3>Interactions by type</h3>
          <ul>
            {stats && stats.length ? stats.map(s=>(
              <li key={s._id}>{s._id}: {s.count}</li>
            )) : <li>No data</li>}
          </ul>
        </section>
        <section className="panel">
          <CustomersList />
        </section>
      </main>
    </div>
  );
}
