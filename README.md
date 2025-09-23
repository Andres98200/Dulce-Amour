🍰 Dulce Amour

A showcase web application for an artisanal bakery, allowing users to browse products, view detailed pages, and contact directly via WhatsApp.
Fullstack project deployed with Vercel (frontend) and Railway (backend), with database management using Supabase.

🚀 Tech Stack

Frontend: React + Vite + TypeScript + TailwindCSS

Backend: Express.js + Node.js

Database: PostgreSQL (Supabase) + Prisma ORM

Deployment: Vercel (frontend), Railway (backend)

Internationalization: i18next (French / Spanish)

UI/UX: Swiper.js (carousel), react-toastify (notifications)

✨ Features

🖼️ Product catalog with image carousel

📱 Fully responsive design (mobile-first)

🌍 Multilingual support (FR / ES)

🔍 Product detail page with description & price

📩 Direct WhatsApp contact with pre-filled messages

⚡ Optimized images (lazy loading, responsive sizes)

🔒 Authentication (WIP)

⚙️ Local Setup
1. Clone the repository
cd dulce-amour

3. Frontend
cd frontend
npm install
npm run dev

4. Backend
cd backend
npm install
npm run dev


Backend runs on: http://localhost:4000

Frontend runs on: http://localhost:5173

🔑 Environment Variables
Backend (.env)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.nutwcyfwvxxzdhuxznjl.supabase.co:5432/postgres?sslmode=require
PORT=4000
JWT_SECRET=your_secret

Frontend (.env)
VITE_API_URL=http://localhost:4000/api
VITE_AUTH_API_URL = http://localhost:4000

🛠️ Useful Scripts
Frontend

npm run dev → start Vite dev server

npm run build → production build

Backend

npm run dev → start Express server in dev mode

npm run prisma:migrate → apply Prisma migrations

npm run prisma:studio → open Prisma Studio (DB UI)

🚢 Deployment

Frontend (Vercel): automatic builds on main branch push

Backend (Railway): continuous deployment via GitHub
