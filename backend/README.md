# Backend - Sales Management API

This is the backend for the Sales Management System built with **Node.js**, **Express**, and **PostgreSQL**.

It provides APIs for:
- Searching
- Filtering
- Sorting
- Pagination
- Summary data

## Setup Instructions

1. Go to the backend folder:

```bash
cd backend

npm install

PORT=5000
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=your_db_name

npm run dev

API will run at: http://localhost:5000