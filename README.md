# AgraBandhan Admin Panel

React-based admin dashboard for AgraBandhan matrimonial platform.

## Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS** for styling
- **React Router v6** for navigation
- **Axios** for API calls with JWT interceptors
- **Recharts** for analytics charts
- **Lucide React** for icons

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment config
cp .env.example .env.local
# Edit .env.local with your API URL

# Start dev server
npm run dev
```

Opens at `http://localhost:5173`

## Deployment (Vercel)

1. Connect your GitHub repo to Vercel
2. Set environment variable: `VITE_API_URL` = your Render backend URL
3. Build command: `npm run build`
4. Output directory: `dist`
5. Auto-deploys on push to `main`

## Pages

| Route | Page | Status |
|-------|------|--------|
| `/login` | OTP Login | Ready |
| `/` | Dashboard (stats, charts) | Ready (mock data) |
| `/users` | User management table | Ready (mock data) |
| `/moderation` | Profile moderation queue | Placeholder |
| `/analytics` | Detailed analytics | Placeholder |
| `/settings` | App settings | Placeholder |

## License

Proprietary. All rights reserved.
