# Live Reviews

A simple reviews application built with Node.js, Express, MongoDB, Mongoose, Socket.IO, and plain HTML, CSS, and JavaScript.

## Getting Started

### Requirements

- Node.js 22 or later
- MongoDB running locally or a MongoDB connection string
- Visual Studio Code with the Live Server extension, or another static file server

### Install and configure

From the project root, open PowerShell and navigate to the backend directory:

```powershell
cd backend
npm install
```

Create your `.env` file from the example file:

```powershell
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
}
```

Edit `backend/.env` and configure the following environment variables:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/live_reviews
```

Make sure MongoDB is running before starting the application.

The frontend connects to the backend at `http://localhost:3000`. Keep `PORT=3000` unless you also update the frontend API and Socket.IO URLs.

### Start the backend

From the `backend` directory, run:

```powershell
node app.js
```

For automatic restarts during development, use `nodemon app.js` if nodemon is installed. The server connects to MongoDB before it starts listening.

### Run the frontend

Open `frontend/index.html` with Visual Studio Code's Live Server. The frontend is served separately from the backend; the backend permits requests from local `localhost` and `127.0.0.1` origins.

### Use the application

- Select **Create review**, enter a title and content, then select **Save review**.
- Select **Edit** beside a review to change it, or **Delete** to remove it.
- Use **Reset** to clear a new review form or restore an edit form's loaded values. **Cancel** returns to the list without saving.
- Keep the reviews list open in multiple tabs to see successful changes appear without refreshing.

## Problem Statement

Reviews need a straightforward way to be created, viewed, updated, and deleted. The application stores reviews in MongoDB and uses Socket.IO to notify connected browser tabs when a review changes, so users can see updates without refreshing the list.

## Completed

- Express server with MongoDB/Mongoose connection and REST endpoints for listing, reading, creating, updating, and deleting reviews.
- Review records with required title and content fields and an automatically generated creation date.
- Plain HTML, CSS, and modern JavaScript pages for listing, creating, and editing reviews.
- Socket.IO events for review creation, update, and deletion, with the list refreshed in connected tabs.
- Backend startup, CRUD operations, frontend forms, and multi-tab real-time updates verified locally.
