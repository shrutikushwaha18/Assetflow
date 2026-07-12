# AssetFlow

AssetFlow is a MERN-based Enterprise Asset & Resource Management System with modular backend services and a React/Tailwind frontend.

## Structure
- server/ - Express.js API with MVC-style folders
- client/ - React + Tailwind client app

## Run locally
1. Start MongoDB on localhost:27017
2. In the server folder: npm install && npm run dev
3. In the client folder: npm install && npm run dev
4. The project creates a seeded admin account on server start if none exists:

	- Email: admin@assetflow.test
	- Password: AdminPass123!

If the backend port 3000 is in use the server will auto-increment to the next available port (5006, 5007, ...). The frontend reads API base from `VITE_API` in `client/.env` (set to http://localhost:3000 by default).
