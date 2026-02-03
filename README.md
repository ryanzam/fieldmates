# Fieldmates

**Team coordination tool for remote field workers**

Fieldmates helps teams of mobile / remote workers (field service technicians, delivery teams, inspectors, surveyors, maintenance crews, etc.) stay connected, assigned, and productive — even when they're spread across locations with limited connectivity.

> Currently in **early development** / proof-of-concept stage.

## ✨ Features (planned / in-progress)

- Real-time task assignment & status updates
- Location check-ins & geofencing
- Offline-first support for poor connectivity areas
- Team messaging & announcements
- Photo / document attachments from the field
- Simple dashboard for coordinators / dispatchers
- Mobile-friendly web interface (PWA-capable)

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State & Data Fetching**: (t.b.d. — likely TanStack Query / Zustand / Redux Toolkit)
- **Backend** (planned): Node.js / Express or Next.js API routes
- **Database** (planned): MongoDB
- **Authentication** (planned): JWT or NextAuth / Clerk
- **Deployment** (future): Vercel / Netlify (frontend), Render / Railway (backend)

## 🚀 Quick Start (Development)

### Prerequisites

- Node.js ≥ 20
- npm / yarn

### 1. Clone the repository

```bash
git clone https://github.com/ryanzam/fieldmates.git
cd fieldmates

pnpm install
# or
npm install
# or
yarn install

pnpm dev
# or
npm run dev
# or
yarn dev
```

## 📂 Project Structure

fieldmates/
├── public/                 → static assets
├── src/
│   ├── assets/             → images, icons, etc.
│   ├── components/         → reusable UI components
│   ├── pages/              → page-level components 
│   ├── constants/          → all the constants
│   ├── services/           → services required
 (or app router if using)
│   ├── hooks/              → custom React hooks
│   ├── lib/                → utilities, api clients, constants
│   ├── types/              → TypeScript type definitions
│   ├── App.tsx
│   └── main.tsx
├── .eslintrc.cjs           → ESLint configuration
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json

### Screenshots
![alt text](c:/Users/ran/Downloads/fieldmates.gif)