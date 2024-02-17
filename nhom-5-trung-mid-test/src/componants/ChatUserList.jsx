import React from 'react'
import '../App.css'
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const ChatUserList = ({ users, onUserClick }) => {
  return (
    <div className="chat-user-list">
      <Input size="large" placeholder="Search..." prefix={<UserOutlined />} />
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => onUserClick(user.id)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatUserList
