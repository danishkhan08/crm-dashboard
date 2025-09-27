const api = {
  token: null,
  setToken(t){ this.token = t; },
  async post(path, body){
    const res = await fetch('/api'+path, {
      method:'POST',
      headers: { 'Content-Type':'application/json', ...(this.token?{ Authorization: 'Bearer '+this.token}:{} ) },
      body: JSON.stringify(body)
    });
    return res.json();
  },
  async get(path){
    const res = await fetch('/api'+path, { headers: this.token?{ Authorization: 'Bearer '+this.token }:{} });
    return res.json();
  },
  async put(path, body){
    const res = await fetch('/api'+path, {
      method:'PUT',
      headers: { 'Content-Type':'application/json', ...(this.token?{ Authorization: 'Bearer '+this.token}:{} ) },
      body: JSON.stringify(body)
    });
    return res.json();
  },
  async del(path){
    const res = await fetch('/api'+path, { method:'DELETE', headers: this.token?{ Authorization: 'Bearer '+this.token }:{} });
    return res.json();
  }
};

export default api;
