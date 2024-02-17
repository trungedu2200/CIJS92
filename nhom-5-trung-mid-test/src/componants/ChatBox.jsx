import React from 'react'
import '../App.css'
import { Input,Button } from 'antd';

const ChatBox = ({ selectedUser, messages, onSendMessage, newMessage, setNewMessage }) => {
  return (
    <div className="chat-box">
      <h2>{selectedUser.name}</h2>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index}>
            <span className="timestamp">{message.timestamp}</span>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button onClick={onSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default ChatBox
