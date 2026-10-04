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

For a separate frontend deployment (for example, Vercel hosting the frontend
and Render hosting the backend), configure both sides:

- Set `VITE_BACKEND_URL` in Vercel to the Render service origin, such as
  `https://chatapp-hvpl.onrender.com`. This is used for both API requests and
  Socket.IO connections. Redeploy the Vercel frontend after setting it.
- Set `CLIENT_URL` in Render to the Vercel site's exact origin, such as
  `https://your-app.vercel.app`, with no trailing slash. This origin is used by
  the backend's HTTP and Socket.IO CORS rules.

## Deploy to Render

This repository includes a [`render.yaml`](./render.yaml) Blueprint for a
single Render web service. It builds the frontend and serves it, the API, and
Socket.IO from the backend on the same origin.

The Render build command explicitly installs frontend development dependencies
because Vite is a dev dependency and is required to build the frontend.
If configuring the service manually instead of using the Blueprint, use:

```sh
npm ci --prefix backend && npm ci --include=dev --prefix frontend && npm run build --prefix frontend
```

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
