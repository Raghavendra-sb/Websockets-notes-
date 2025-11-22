import React from 'react';

interface User {
    username: string;
    color: string;
}

interface SidebarProps {
    users: User[];
    currentUser: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ users, currentUser }) => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>Online Users ({users.length})</h3>
            </div>
            <div className="users-list">
                {users.map((user, index) => (
                    <div key={index} className="user-item">
                        <div
                            className="user-avatar"
                            style={{ backgroundColor: user.color }}
                        >
                            {user.username[0].toUpperCase()}
                        </div>
                        <span className={`user-name ${user.username === currentUser ? 'current-user' : ''}`}>
                            {user.username} {user.username === currentUser && '(You)'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
