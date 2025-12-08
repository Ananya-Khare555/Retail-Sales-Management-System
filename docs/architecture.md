### Backend Architecture

Stack: Node.js + Express + PostgreSQL

A RESTful API layer built using Express.js
All data resides in a single PostgreSQL table: TrueState_dataset
Query parameters are parsed and passed down to the service layer for dynamic SQL generation
pg (node-postgres) is used to communicate with the database
Designed for flexibility and composability (search + filters + sorting + pagination)

Backend Flow ->
Request → Controller → Service → SQL Query → PostgreSQL → Response

### Frontend Architecture

Stack: React (Vite) + Tailwind CSS

The UI is built with React and styled using Tailwind CSS
Reusable components for Search, Filters, Table, Pagination, Summary
React Router handles page routes (currently Dashboard only)
State is managed using useState and useEffect
API communication is done via Axios

### Data Flow Between Frontend & Backend

[Frontend] Dashboard.jsx
  ↓ collects state (search, filters, sort, page)
  ↓
[API Request] to `/api/sales?search=...&gender=...&sortBy=...`

[Backend]
  → Controller (sales.controller.js)
  → Service (sales.service.js)
    - Builds dynamic SQL query with WHERE, ORDER BY, LIMIT
  → PostgreSQL
  ← Data Response

[Frontend]
  ← Receives data
  → Updates SalesTable + SummaryCards + Pagination

### Folder Structure

truestate_project/
├── backend/
│   ├── src/
│   │   ├── controllers/       
│   │   ├── services/           
│   │   ├── routes/            
│   │   ├── utils/              
│   │   └── index.js            
│   └── .env                    

├── frontend/
│   ├── src/
│   │   ├── components/         
│   │   ├── routes/             
│   │   ├── services/           
│   │   ├── utils/              
│   │   ├── styles/             
│   │   └── main.jsx / App.jsx  
│   └── public/                

├── docs/
│   └── architecture.md         

└── README.md

### Module Responsibilities

Backend Modules
Module	                      Responsibility
controllers/	     Handle requests, parse query params, call services
services/	         Build SQL queries dynamically based on inputs
utils/db.js	         PostgreSQL connection pool setup
routes/sales.js	     Mounts API endpoints

Frontend Modules
Module	                      Responsibility
Dashboard.jsx	     Main UI page, handles all data state and requests
components/	         Search bar, filter panel, table, summary, pagination
services/api.js	     Sends GET requests to backend with params
