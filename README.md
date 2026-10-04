# Chatify — Real-Time Chat Application

Connect, communicate, and chat seamlessly with Chatify.

**Chatify** is a full-stack real-time messaging application built using the MERN stack and Socket.IO. It enables users to communicate through an interactive chat interface with real-time message delivery and a responsive user experience.

## Live Demo

[**Explore Chatify**](https://chat-app-zeta-kohl.vercel.app/)

## Features

- **Real-Time Messaging:** Send and receive messages instantly using Socket.IO.
- **User Authentication:** Secure user registration and login.
- **One-to-One Chat:** Communicate privately with other registered users.
- **Real-Time Communication:** Bidirectional communication between clients and server.
- **Persistent Conversations:** Store messages and user data using MongoDB.
- **Responsive UI:** Clean and user-friendly interface across different screen sizes.
- **RESTful APIs:** Backend APIs for authentication, users, and chat functionality.
- **Secure Authentication:** JWT-based authentication and protected routes.
- **Full-Stack Architecture:** Separate frontend and backend for maintainability.
- **Cloud Deployment:** Frontend hosted on Vercel and backend deployed on Render.

## Tech Stack

### Frontend
- React.js
- JavaScript
- Tailwind CSS
- Axios
- React Router
- Socket.IO Client

### Backend
- Node.js
- Express.js
- Socket.IO
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- CORS
- dotenv

### Deployment
- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

## Application Architecture

```text
Chatify
│
├── Frontend
│   ├── React.js
│   ├── React Router
│   ├── Axios
│   └── Socket.IO Client
│
├── Backend
│   ├── Node.js
│   ├── Express.js
│   ├── REST APIs
│   ├── Socket.IO Server
│   ├── JWT Authentication
│   └── Protected Routes
│
└── Database
    └── MongoDB
        ├── Users
        └── Messages
```

## How It Works

1. Users register or log in to their accounts.
2. The frontend communicates with the backend through REST APIs.
3. The backend verifies user authentication using JWT.
4. Users select another user to start a conversation.
5. Socket.IO establishes real-time communication between connected clients.
6. Messages are transmitted instantly and stored in MongoDB.
7. The recipient receives new messages without manually refreshing the page.

## Project Structure

```text
Chatify/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── assets/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── lib/
│   ├── package.json
│   └── server.js
│
└── README.md
```

*Note: Adjust the folder names according to your actual repository.*

## Getting Started

### Prerequisites

- Node.js (v20 or later recommended)
- npm
- MongoDB Atlas account or local MongoDB
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/chatApp.git
cd chatApp
```

### 2. Install Dependencies

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### 3. Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Create a `.env` file inside the frontend directory if your application uses a configurable backend URL.

```env
VITE_BACKEND_URL=http://localhost:5000
```

Use the exact environment variable names referenced in your source code. Never expose credentials or API secrets in your GitHub repository.

### 4. Run the Application

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open the URL provided by Vite, usually:

```text
http://localhost:5173
```

## Deployment

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

**Live Application:** [Chatify](https://chat-app-zeta-kohl.vercel.app/)

## Key Learning Outcomes

Through building Chatify, I gained practical experience in:

- Full-stack development using the MERN stack.
- Implementing real-time communication with Socket.IO.
- Developing RESTful APIs using Express.js.
- Implementing JWT-based authentication.
- Managing user and message data with MongoDB.
- Handling client-server communication.
- Managing frontend state and API integration.
- Deploying a full-stack application using Vercel and Render.
- Understanding WebSocket-based communication and event-driven architecture.

## Future Improvements

- Group chat functionality.
- Online/offline user status.
- Typing indicators.
- Read receipts.
- Image and file sharing.
- Message search and deletion.
- Push notifications.
- Enhanced chat security.

## Author

**Ankit Verma**

B.Tech Computer Science and Engineering

GitHub: [Ankit9997verma](https://github.com/Ankit9997verma)

## Acknowledgements

- MongoDB for database services.
- Socket.IO for real-time communication.
- React and Node.js communities.
- Open-source libraries used throughout the project.

---

⭐ If you like Chatify, consider giving the repository a star!
