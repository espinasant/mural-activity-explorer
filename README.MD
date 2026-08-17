# Activity Viewer

A full-stack app for exploring collaborative board activity — filter sticky notes by author, color, and time, and scrub through a timeline to see how the board evolved.

- **Server** — Node.js + Express API (`/notes`, `/stats`)
- **Client** — React + TypeScript

SEE IT LIVE IN: https://mural-activity-explorer.espina-sant.workers.dev/

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later

## Environment configuration

The server and client each have their own environment variables. Create the files below before running the app.

### Server (`server/`)

| Variable | Required | Example | Description                |
| -------- | -------- | ------- | -------------------------- |
| `PORT`   | Yes      | `5001`  | Port for the API server |


Create `server/.env.local`:

```env
PORT=5001
```

### Client (`client/`)

| Variable       | Required | Example                 | Description                |
| -------------- | -------- | ----------------------- | -------------------------- |
| `VITE_API_URL` | Yes      | `http://localhost:5001` | Base URL of the API server |

Create `client/.env.local`:

```env
VITE_API_URL=http://localhost:5001
```

Vite loads `.env.local` automatically in development. Make sure `VITE_API_URL` matches the port your server is running on.

## Getting started

Install dependencies in both packages, then start the **server first**, followed by the **client**.

### 1. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Start the server

From the `server/` directory:

```bash
npm run dev
```

The API will be available at `http://localhost:5001`. You can verify it with:

```bash
curl http://localhost:5001/health
```

### 3. Start the client

In a **separate terminal**, from the `client/` directory:

```bash
npm run dev
```

Vite will print the local URL (typically `http://localhost:5173`). Open it in your browser.

## Available scripts

### Server

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start the API with hot reload     |
| `npm run build` | Compile TypeScript to `dist/`     |
| `npm start`     | Run the compiled production build |
| `npm run test`  | Run unit tests                    |
| `npm run test:watch`| Run unit tests in watch mode      |

### Client

| Command             | Description                         |
| ------------------- | ----------------------------------- |
| `npm run dev`       | Start the Vite dev server           |
| `npm run build`     | Type-check and build for production |
| `npm run preview`   | Preview the production build        |
| `npm run lint`      | Run ESLint                          |
| `npm run typecheck` | Run TypeScript without emitting     |
| `npm run test`      | Run unit tests                       |
| `npm run test:watch`| Run unit tests in watch mode         |

## Project structure

```
activity-viewer/
├── server/          # Express API
│   └── src/
├── client/          # React frontend
│   └── src/
└── NOTES.md  # Design decisions and API docs
```

For API contracts, data flow, and design rationale, see [ARCHITECTURE.md](./ARCHITECTURE.md).
