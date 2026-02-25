# Form Builder

A modern **MERN stack** form builder with drag-and-drop functionality, real-time validation, and production-ready deployment.

---

## 🌐 Live Application

| Component | URL |
|-----------|-----|
| **Frontend** | https://form-builder-3t3d-a156eevn7-inglehitexa-gmailcoms-projects.vercel.app |
| **Backend API** | https://form-builder-backend-gt5t.onrender.com |
| **Health Check** | https://form-builder-backend-gt5t.onrender.com/api/health |

---

## 🔧 Environment Variables

### Backend (`.env`)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/form-builder
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (Automatic - No setup needed!)
- **Local dev** (`.env.development`): `VITE_API_URL=http://localhost:5000/api`
- **Production** (`.env.production`): `VITE_API_URL=https://form-builder-backend-gt5t.onrender.com/api`

---

## ▶️ How to Run

### 1. Install dependencies:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Create `.env` file (Backend only):
```bash
cp backend/.env.example backend/.env
# Edit and add your MongoDB credentials
```

### 3. Start Backend (Terminal 1):
```bash
cd backend
npm start
# Runs on http://localhost:5000
```

### 4. Start Frontend (Terminal 2):
```bash
cd frontend
npm run dev
# Opens http://localhost:3000
```

### 5. Test:
- Open http://localhost:3000
- Create a form → Submit → Data saved to MongoDB ✅

---

## 📦 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 18.2.0 |
| **Build Tool** | Vite | 5.0.0 |
| **Styling** | Tailwind CSS | 3.2.4 |
| **Routing** | React Router | 6.8.0 |
| **Backend** | Express.js | Latest |
| **Database** | MongoDB + Mongoose | Latest |
| **Hosting** | Vercel (frontend) + Render (backend) | - |

---

## 🚀 Deploy to Production

- **Frontend**: Push to GitHub → Vercel auto-deploys
- **Backend**: Push to GitHub → Render auto-deploys  
- **Database**: MongoDB Atlas (already configured)

---

## ✨ Features

- ✅ Create, edit, delete forms
- ✅ Drag-and-drop form builder
- ✅ Multiple input types (text, email, password, number, date)
- ✅ Real-time form validation
- ✅ Form submissions saved to MongoDB
- ✅ Responsive design (mobile + desktop)
- ✅ Modern UI with animations
- ✅ Production-ready deployment

---

Last Updated: February 25, 2026
