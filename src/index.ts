import express from 'express'
import { WebSocketServer, WebSocket } from 'ws'

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer })

interface User {
    socket: WebSocket;
    username: string;
    color: string;
}

let users: User[] = [];

const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
    '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71'
];

function broadcastUserList() {
    const userList = users.map(u => ({ username: u.username, color: u.color }));
    console.log('Broadcasting user list:', userList); // Debug log
    const message = JSON.stringify({
        type: 'user_list',
        users: userList
    });

    users.forEach(user => {
        if (user.socket.readyState === WebSocket.OPEN) {
            user.socket.send(message);
        }
    });
}

wss.on('connection', function connection(ws) {
    let currentUser: User | null = null;
    console.log('New connection established');

    ws.on('error', console.error)

    ws.on('message', function message(data, isBinary) {
        try {
            const parsedMessage = JSON.parse(data.toString());
            console.log('Received message:', parsedMessage); // Debug log

            if (parsedMessage.type === 'join') {
                const username = parsedMessage.username;

                // Remove existing user with same username if any (simple conflict resolution)
                users = users.filter(u => u.username !== username);

                const color = colors[Math.floor(Math.random() * colors.length)];

                currentUser = { socket: ws, username, color };
                users.push(currentUser);

                console.log(`User joined: ${username}`);

                // Broadcast updated user list
                broadcastUserList();

                // Send welcome message just to this user
                ws.send(JSON.stringify({
                    type: 'system',
                    content: `Welcome to the chat, ${username}!`
                }));

            } else if (parsedMessage.type === 'chat') {
                if (!currentUser) return;

                const broadcastData = JSON.stringify({
                    type: 'chat',
                    content: parsedMessage.content,
                    sender: currentUser.username,
                    color: currentUser.color,
                    timestamp: new Date().toISOString()
                });

                // Broadcast to everyone
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(broadcastData, { binary: isBinary });
                    }
                });
            }
        } catch (e) {
            console.error("Failed to parse message", e);
        }
    })

    ws.on('close', () => {
        if (currentUser) {
            console.log(`User left: ${currentUser.username}`);
            users = users.filter(u => u !== currentUser);
            broadcastUserList();
        } else {
            console.log('Connection closed (no user logged in)');
        }
    });
})

httpServer.on('listening', () => {
    console.log('Server is listening on http://localhost:8080')
})