import React, { useState } from 'react';
import ChatUserList from './componants/ChatUserList';
import ChatBox from './componants/ChatBox';

const App = () => {
  const users = [
    { id: 1, name: 'Aline Coper' },
    { id: 2, name: 'Jack Sparrow' },
    { id: 3, name: 'Sara Holland' },
    { id: 4, name: 'Oliver Maleah' },
    { id: 5, name: 'Laurinda Easton' },
    { id: 6, name: 'Merrick Lacie' },
  ];

  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleUserClick = (userId) => {
    setMessages([]);
    setSelectedUser(users.find((user) => user.id === userId));
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const timestamp = new Date().toLocaleTimeString();
      const updatedMessages = [...messages, { text: newMessage, timestamp }];
      setMessages(updatedMessages);
      setNewMessage('');
      console.log(`Sending message to ${selectedUser.name}: ${newMessage}`);
    }
  };

  return (
    <div className="app">
      <ChatUserList users={users} onUserClick={handleUserClick} />
      {selectedUser && (
        <ChatBox
          selectedUser={selectedUser}
          messages={messages}
          onSendMessage={handleSendMessage}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      )}
    </div>
  );
};

export default App;