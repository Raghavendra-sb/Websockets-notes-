import React, { useEffect, useRef } from 'react';

interface Message {
    type: 'chat' | 'system';
    content: string;
    sender?: string;
    color?: string;
    timestamp?: string;
}

interface MessageListProps {
    messages: Message[];
    currentUser: string;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="message-list">
            {messages.map((msg, index) => {
                if (msg.type === 'system') {
                    return (
                        <div key={index} className="system-message">
                            {msg.content}
                        </div>
                    );
                }

                const isMyMessage = msg.sender === currentUser;

                return (
                    <div
                        key={index}
                        className={`message-wrapper ${isMyMessage ? 'my-message' : 'other-message'}`}
                    >
                        {!isMyMessage && (
                            <div
                                className="message-avatar"
                                style={{ backgroundColor: msg.color }}
                                title={msg.sender}
                            >
                                {msg.sender?.[0].toUpperCase()}
                            </div>
                        )}
                        <div className="message-bubble">
                            {!isMyMessage && <div className="message-sender">{msg.sender}</div>}
                            <div className="message-content">{msg.content}</div>
                            <div className="message-time">
                                {msg.timestamp && new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
};
