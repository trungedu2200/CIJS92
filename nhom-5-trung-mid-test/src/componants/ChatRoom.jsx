import React, { useState, useEffect, useRef } from 'react';
import { Button, Flex } from 'antd';
import '../App.css'
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { BsFillSendFill } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiFaceSmile } from "react-icons/ci";
import { AiFillPicture } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import { HiDotsHorizontal } from "react-icons/hi";

const ChatRoom = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://img.freepik.com/free-photo/3d-rendering-boy-wearing-cap-with-letter-r_1142-40523.jpg?t=st=1708314138~exp=1708317738~hmac=3e1685b7eff033921fa14f3289aa20f87f0d158c21ee322b96cffab8de581f71&w=826',
      lastChatTime: '',
    },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-with-brown-hair-eyeglasses_1142-40907.jpg?t=st=1708314584~exp=1708318184~hmac=71be296005b73672f5b9e9a47e9cb0f92508a9f76d5e7fa422972115aa1415b6&w=826',
      lastChatTime: '',
    },
    {
      id: 3,
      name: 'Ryan Johnson',
      avatar: 'https://img.freepik.com/free-photo/3d-illustration-cartoon-character-hoodie-cap_1142-48674.jpg?t=st=1708396414~exp=1708400014~hmac=23896be34be3efba2d397e95fb51f39a8f03bbc75f8e954d57d5a29a275ee5f5&w=826',
      lastChatTime: '',
    },
    {
      id: 4,
      name: 'Kim Kadashia',
      avatar: 'https://img.freepik.com/free-photo/3d-illustration-cute-little-girl-city-night_1142-40727.jpg?t=st=1708403482~exp=1708407082~hmac=d61b969c0c0219ac21bc2896065a7d362e34f44500212a31e215ddcac547be1f&w=826',
      lastChatTime: '',
    }
    // Add more users as needed
  ]); // List of chat users
  const [messages, setMessages] = useState({}); // Messages for each user
  const [selectedUser, setSelectedUser] = useState(null); // Currently selected user
  const [newMessage, setNewMessage] = useState(''); // New message being typed

  // Load chat data from localStorage on component mount
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages'));
    if (storedMessages) {
      setMessages(storedMessages);
    }
  }, []);

  // Save chat data to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Function to handle sending messages
  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    const currentTime = new Date().toLocaleTimeString();
    const updatedMessages = { ...messages };
    if (!updatedMessages[selectedUser.id]) {
      updatedMessages[selectedUser.id] = [];
    }
    updatedMessages[selectedUser.id].unshift({
      content: newMessage,
      time: currentTime,
      sender: 'me', // Assuming the sender is the current user for simplicity
    });
    setMessages(updatedMessages);
    // Update lastChatTime for the selected user
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          lastChatTime: currentTime
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setNewMessage('');
  };

  // Function to render messages for the selected user
  const renderMessages = () => {
    if (!selectedUser || !messages[selectedUser.id]) return null;
    return messages[selectedUser.id].map((message, index) => (
      <div key={index} className={message.sender === 'me' ? 'sent' : 'received'}>
        <div className="sent-message">{message.content}</div>
        <div className="sent-time">{message.time}</div>
      </div>
    ));
  };

  // Function to handle selecting a user from the list
  const selectUser = (userId) => {
    setSelectedUser(users.find(user => user.id === userId));
  };

  // Function to render the list of chat users
  const renderUserList = () => {
    return users.map((user) => (
      <div key={user.id} onClick={() => selectUser(user.id)} className={selectedUser && selectedUser.id === user.id ? 'user active' : 'user'}>
        <img src={user.avatar} alt={user.name} />
        <div className="info">
          <div className="name">{user.name}</div>
          <div className="time">{user.lastChatTime}</div>
        </div>
      </div>
    ));
  };

  return (
    <div className="chat-room">
      <div className="user-list">
        <Input placeholder="Peoples, Groups and Messages" style={{ margin: "0px 0 20px 0", background: "black", color: '#bebebe' }} prefix={<UserOutlined style={{ color: "#bebebe" }} />} />
        <div className="tabs">
          <div>All</div>
          <div>Read</div>
          <div>Unread</div>
        </div>
        {renderUserList()}
      </div>

      <div className="chat-box">
        {selectedUser && (
          <div className="chat-box-inner">
            <div className="header">
              <div>{selectedUser.name}</div>
              <div className="header-icon">
                <div className="header-icon-item"><IoCall /></div>
                <div className="header-icon-item"><FaVideo /></div>
                <div className="header-icon-item"><BsThreeDotsVertical /></div>
              </div>

            </div>
            <div className="messages">{renderMessages()}</div>
            <div className="input-box">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') sendMessage();
                }}
                placeholder="Type your message here..."
              />
              <div className="input-box-function">
                <div className="input-box-items">
                  <div className="input-box-icons"><CiFaceSmile/></div>
                  <div className="input-box-icons"><AiFillPicture/></div>
                  <div className="input-box-icons"><ImAttachment/></div>
                  <div className="input-box-icons"><HiDotsHorizontal/></div>
                </div>
                <button onClick={sendMessage}>Send <BsFillSendFill /></button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default ChatRoom
