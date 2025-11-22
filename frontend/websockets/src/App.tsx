import { useEffect, useState } from 'react'
import { Login } from './components/Login'
import { Sidebar } from './components/Sidebar'
import { MessageList } from './components/MessageList'
import { MessageInput } from './components/MessageInput'
import './App.css'

interface User {
  username: string;
  color: string;
}

interface Message {
  type: 'chat' | 'system';
  content: string;
  sender?: string;
  color?: string;
  timestamp?: string;
}

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received WebSocket message:', data); // Debug log

        if (data.type === 'user_list') {
          console.log('Updating user list:', data.users); // Debug log
          setUsers(data.users);
        } else if (data.type === 'chat' || data.type === 'system') {
          setMessages(prev => [...prev, data]);
        }
      } catch (e) {
        console.error('Failed to parse message', e);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleLogin = (username: string) => {
    if (socket && isConnected) {
      console.log('Logging in as:', username); // Debug log
      socket.send(JSON.stringify({
        type: 'join',
        username
      }));
      setCurrentUser(username);
    }
  };

  const handleSendMessage = (content: string) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify({
        type: 'chat',
        content
      }));
    }
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Sidebar users={users} currentUser={currentUser} />
      <div className="chat-container">
        <div className="chat-header">
          <h2>Global Chat</h2>
          <div className="connection-status">
            <span className={`status-dot ${isConnected ? 'online' : 'offline'}`}></span>
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>
        <MessageList messages={messages} currentUser={currentUser} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}

export default App
