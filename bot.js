const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
    console.log('Bot connected');

    // Join as BotUser
    ws.send(JSON.stringify({
        type: 'join',
        username: 'BotUser'
    }));
});

ws.on('message', function message(data) {
    try {
        const parsed = JSON.parse(data);
        console.log('Bot received:', parsed);

        if (parsed.type === 'chat' && parsed.sender !== 'BotUser') {
            // Reply to chat messages
            setTimeout(() => {
                ws.send(JSON.stringify({
                    type: 'chat',
                    content: `Hello ${parsed.sender}, I received your message: "${parsed.content}"`
                }));
            }, 1000);
        }
    } catch (e) {
        console.error(e);
    }
});
