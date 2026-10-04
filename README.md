# Chatify

Chatify is a React/Vite frontend and an Express, Socket.IO, and MongoDB backend.

## Requirements

- Node.js 20.19+ (or 22.12+) and npm
- A reachable MongoDB instance (local or MongoDB Atlas)

Resend, Cloudinary, and Arcjet credentials are optional for local development.
Without Resend, signup still works but welcome emails are skipped. Cloudinary is
needed for profile pictures and image messages.

## Local development

1. Copy the example environment files:

   ```powershell
   Copy-Item backend\.env.example backend\.env
   Copy-Item frontend\.env.example frontend\.env
   ```

2. Edit `backend\.env`. Set `MONGO_URI` to your MongoDB connection string and
   replace `JWT_SECRET` with a private, random value. Keep the local defaults
   for `PORT`, `CLIENT_URL`, and `NODE_ENV`.

3. Install dependencies:

   ```powershell
   npm ci --prefix backend
   npm ci --prefix frontend
   ```

4. Start the backend and frontend in separate terminals from the repository
   root:

   ```powershell
   npm run dev --prefix backend
   ```

   ```powershell
   npm run dev --prefix frontend
   ```

5. Open <http://localhost:5173>. The frontend uses the backend at
   <http://localhost:3000>.

## Production build

Run `npm run build` from the repository root to install dependencies and build
the frontend. Configure the backend environment for your deployment, then run
`npm start` from the repository root. The backend serves the built frontend.

For a separate frontend deployment, set `VITE_BACKEND_URL` to the backend
origin when building the frontend. Configure `CLIENT_URL` on the backend to the
frontend's origin.

## Deploy to Render

This repository includes a [`render.yaml`](./render.yaml) Blueprint for a
single Render web service. It builds the frontend and serves it, the API, and
Socket.IO from the backend on the same origin.

1. Push the repository to GitHub and make sure `render.yaml` is included.
2. In Render, choose **New + > Blueprint**, connect this repository, and deploy
   the Blueprint. Render generates `JWT_SECRET` and prompts you for `MONGO_URI`.
3. Provide a MongoDB Atlas connection string as `MONGO_URI`. Ensure the Atlas
   database user has access and the Atlas network access list permits
   connections from the Render service.
4. After deployment, open the `https://<your-service>.onrender.com` URL shown
   in Render.

Render supplies the service URL and port at runtime. The app uses the Render
URL for production origin checks, so no `CLIENT_URL` or `PORT` override is
needed for the default single-service deployment. Do not commit credentials or
put them in `render.yaml`.

To enable welcome emails, add both `RESEND_API_KEY` and `EMAIL_FROM` to the
service's environment in Render. To enable image uploads, also add
`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
These integrations are optional; the app can run without them.
