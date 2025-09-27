# CRM Dashboard Web App

Full-stack CRM Dashboard built with Node.js, Express, MongoDB, and React.

## Structure

- `backend/` — Express API server
- `frontend/` — React single-page app
- `.env.example` — sample environment variables

## Setup (local)

### Backend
1. `cd backend`
2. `cp .env.example .env` and edit (MONGO_URI, JWT_SECRET, PORT)
3. `npm install`
4. `npm run dev` (uses nodemon) or `npm start`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start` (starts dev server on port 3000)

API base path: `/api`

## Notes
- This is a starter template. Add production configs, validation, and secure secrets before deploying.
- For demo/testing you can use MongoDB Atlas or a local MongoDB instance.

