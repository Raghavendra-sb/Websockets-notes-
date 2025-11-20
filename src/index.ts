import express from 'express'                     // Import Express framework
import { WebSocketServer } from 'ws'              // Import WebSocket server class from 'ws'

// ------------------- EXPRESS SERVER SETUP -------------------

const app = express()                             // Create an Express application

// Start HTTP server on port 8080 (required for WebSockets to attach to)
const httpServer = app.listen(8080)               // Express is listening on 8080

// ------------------ WEBSOCKET SERVER SETUP ------------------

// Create a WebSocketServer and attach it to the same HTTP server
const wss = new WebSocketServer({ 
    server: httpServer                            // Bind WS server to existing Express server
})

// When a new WebSocket client connects
wss.on('connection', function connection(ws) {
    
    // Log any WebSocket errors
    ws.on('error', console.error)

    // Listen for any incoming messages from this client
    ws.on('message', function message(data, isBinary) {
        console.log('received: %s', data);

        // Broadcast this message to ALL connected clients
        wss.clients.forEach(function each(client) {

            // Check if client connection is open
            if (client.readyState === ws.OPEN) {
                // Send the received message to each client
                client.send(data, { binary: isBinary })
            }
        })
    })

    // When a client connects, send a welcome message
    ws.send('Hello! Message From Server!!')
})


httpServer.on('listening', () => {
    console.log('Server is listening on http://localhost:8080')
})