#  Chat APP

A real-time chat application featuring the high-contrast, playful **"Nano Banana"** design theme. Built with React, TypeScript, and WebSockets.

## Features

*   **Live Demo**: [https://websocketsnotes-1.onrender.com/](https://websocketsnotes-1.onrender.com/)
*   **Real-time Messaging**: Instant message delivery using WebSockets.
*   **Live User List**: See who is online in real-time with color-coded avatars.
*   **Nano Banana UI**: A unique dark mode aesthetic with Jet Black backgrounds and vibrant Banana Yellow accents.
*   **Responsive Design**: Works seamlessly on desktop and mobile.
*   **System Notifications**: Alerts when users join or leave the chat.

## Tech Stack

*   **Frontend**: React, Vite, TypeScript, CSS3 (Variables & Flexbox).
*   **Backend**: Node.js, Express, `ws` (WebSocket library).
*   **Deployment**: Render (Backend) /Render (Frontend).

## Getting Started

### Prerequisites
*   Node.js (v14 or higher)
*   npm (v6 or higher)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <your-repo-url>
    cd Websockets
    ```

2.  **Setup Backend**
    ```bash
    # Install dependencies
    npm install

    # Start the backend server (runs on port 8080)
    npm run start
    ```

3.  **Setup Frontend**
    Open a new terminal:
    ```bash
    cd frontend/websockets

    # Install dependencies
    npm install

    # Start the development server
    npm run dev
    ```

4.  **Access the App**
    Open your browser and navigate to `http://localhost:5173`.

## Deployment

This project is configured for easy deployment.
*   **Backend**: Ready for Render.com.
*   **Frontend**: Ready for Vercel or Render Static Sites.

See [DEPLOY.md](./DEPLOY.md) for detailed step-by-step deployment instructions.

## Project Structure

```
Websockets/
├── src/                # Backend source code
│   └── index.ts        # WebSocket server entry point
├── frontend/
│   └── websockets/     # React Frontend
│       ├── src/
│       │   ├── components/  # React components (Chat, Sidebar, etc.)
│       │   ├── App.tsx      # Main application logic
│       │   └── index.css    # Global styles (Nano Banana Theme)
│       └── .env.production  # Production config
└── DEPLOY.md           # Deployment guide
```

## License

This project is open source and available under the [MIT License](LICENSE).
