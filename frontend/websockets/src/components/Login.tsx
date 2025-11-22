import React, { useState } from 'react';

interface LoginProps {
    onLogin: (username: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            onLogin(username.trim());
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Welcome</h1>
                <p>Enter your username to join the chat</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                        autoFocus
                    />
                    <button type="submit" className="login-button">
                        Join Chat
                    </button>
                </form>
            </div>
        </div>
    );
};
