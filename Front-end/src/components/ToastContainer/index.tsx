import React from 'react';

import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Container, Toast } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map(message => (
        <Toast
          key={message.id}
          type={message.type}
          hasDescription={!!message.description}
        >
          <div>
            <FiAlertCircle />
            <strong>{message.title}</strong>
            <p>{message.description}</p>
          </div>
          <button type="button">
            <FiXCircle />
          </button>
        </Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
