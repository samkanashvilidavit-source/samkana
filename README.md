# ChocoCuCafe

A full-stack web application for a modern cafe, built with React (Vite), Express, TypeScript, and Tailwind CSS. The project features a product gallery, contact form, and admin-friendly architecture.

## Features
- **Frontend:**
  - Built with React + Vite for fast development and hot reloading
  - Modern UI with Tailwind CSS and Radix UI components
  - Product gallery, about, contact, and more
- **Backend:**
  - Express.js server with RESTful API endpoints
  - In-memory storage (can be swapped for a real database)
  - API for products, categories, contact inquiries, and cafe info
- **TypeScript:**
  - Type safety across both client and server
- **Authentication:**
  - Passport.js ready for local authentication (can be extended)
- **State Management:**
  - React Query for data fetching and caching
- **Other:**
  - Drizzle ORM for future database integration
  - Ready for deployment on Render, Railway, Vercel, or Netlify

## Project Structure
```
ChocoCuCafe/
├── client/           # React frontend (Vite)
│   ├── src/
│   ├── index.html
│   └── ...
├── server/           # Express backend
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
├── shared/           # Shared types and schema
│   └── schema.ts
├── attached_assets/  # Images and static assets
├── package.json      # Project scripts and dependencies
├── tsconfig.json     # TypeScript config
└── ...
```

## Scripts
- `npm run dev` — Start development server (Express + Vite)
- `npm run build` — Build frontend and backend for production
- `npm run start` — Start production server
- `npm run check` — Type-check the project
- `npm run db:push` — Push Drizzle ORM schema (if using a real DB)

## Development
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the dev server:
   ```sh
   npm run dev
   ```
   - Express API: http://localhost:5000
   - Vite dev server: http://localhost:5173 (if run separately)

## Deployment
- **Render.com** (Recommended):
  - Connect your GitHub repo, set build command: `npm install && npm run build`, start command: `npm run start`.
- **Railway.app**: For backend API.
- **Vercel/Netlify**: For static frontend (after `npm run build`).

## Environment Variables
- `PORT` — Port for the Express server (default: 5000)
- `NODE_ENV` — Set to `production` for production build

## Customization
- Add your products and cafe info in `server/storage.ts` or connect to a real database.
- Update UI in `client/src/components/`.

## License
MIT
