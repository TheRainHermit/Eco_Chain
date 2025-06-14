import React, { useState } from 'react';
import ChatButton from './ChatButton';
import ChatBot from './ChatBot';

export const ChatContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
      }}>
        <ChatButton onClick={openModal} />
      </div>
      <ChatBot isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

//export default ChatContainer;