# ReloCity — Inter-City Relocation Guide & Service Connect Platform

A modern full-stack web application that helps users relocating to a new city explore city guides, discover housing, schools, hospitals, search services, and connect with verified providers.

![ReloCity](https://img.shields.io/badge/ReloCity-v1.0-blue) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Express](https://img.shields.io/badge/Express-4.x-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## 🚀 Features

- **City Guides** — Explore detailed city information including cost of living, transport, famous areas
- **Service Listings** — Browse housing, schools, and hospitals with filters
- **Search & Filter** — Filter by city, category, rating, and search text
- **Reviews & Ratings** — Read and write reviews with star ratings
- **Authentication** — JWT-based register/login system
- **Admin Dashboard** — Manage listings, users, and verify providers
- **Responsive Design** — Works perfectly on desktop, tablet, and mobile

## 📁 Project Structure

```
relocation platform/
├── client/          # Next.js 14 Frontend (App Router)
│   ├── app/         # Pages and layouts
│   ├── components/  # Reusable UI components
│   ├── context/     # React Context (Auth)
│   ├── services/    # API service layer (Axios)
│   └── data/        # Seed data for frontend
│
├── server/          # Express.js Backend
│   ├── controllers/ # Route handlers
│   ├── routes/      # API route definitions
│   ├── models/      # Mongoose schemas
│   ├── middleware/   # Auth & error handling
│   ├── config/      # Database configuration
│   └── utils/       # Seed data & helpers
│
└── README.md
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ installed
- npm (comes with Node.js)
- MongoDB Atlas account (optional — app works without it)

### 1. Clone the project
```bash
cd "relocation platform"
```

### 2. Install Backend
```bash
cd server
npm install
```

### 3. Configure Environment
```bash
# Copy the example env file
cp .env.example .env
# Edit .env with your MongoDB URI (optional)
```

### 4. Install Frontend
```bash
cd ../client
npm install
```

### 5. Run the Application

**Start Backend** (Terminal 1):
```bash
cd server
npm run dev
```

**Start Frontend** (Terminal 2):
```bash
cd client
npm run dev
```

Visit: **http://localhost:3000**

## 🔑 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@relocity.com | admin123 |
| User | user@relocity.com | user123 |

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | JWT | Get profile |
| GET | `/api/cities` | Public | List cities |
| GET | `/api/cities/:id` | Public | City details |
| GET | `/api/listings` | Public | List listings |
| POST | `/api/listings` | Admin | Create listing |
| PUT | `/api/listings/:id` | Admin | Update listing |
| DELETE | `/api/listings/:id` | Admin | Delete listing |
| GET | `/api/reviews/:listingId` | Public | Get reviews |
| POST | `/api/reviews` | JWT | Add review |
| GET | `/api/admin/stats` | Admin | Dashboard stats |
| GET | `/api/admin/users` | Admin | List users |

## 🎨 Tech Stack

**Frontend**: Next.js 14, React, Tailwind CSS, Axios
**Backend**: Node.js, Express.js, JWT, bcryptjs
**Database**: MongoDB Atlas + Mongoose
**Deployment**: Vercel (frontend) + Render (backend)

## 📄 License

MIT License — feel free to use this project for learning and portfolio.
