import { useEffect, useState } from 'react';

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      setSocket(socket);
    };

    socket.onmessage = (message) => {
      console.log("Received message:", message.data);
      setLatestMessage(message.data);
    };

    return () => socket.close();
  }, []);

  if (!socket) {
    return (
      <div>
        Connecting to socket server...
      </div>
    );
  }

  return (
    <div>
      <input 
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type message"
      />

      <button onClick={() => socket.send(inputMessage)}>
        Send
      </button>

      <h2>Latest Message:</h2>
      <p>{latestMessage}</p>
    </div>
  );
}

export default App;
