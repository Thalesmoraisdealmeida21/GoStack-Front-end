import React, {useCallback} from 'react';
import { Container } from './styles';
import Toast from './Toast'
import { useTransition } from 'react-spring'
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

  const messagesWithTransitions =  useTransition(
    messages,
    message => message.id,
    {
        from: { right: '-100%'},
        enter: { right: '0'},
        leave: {right: '-100%'}
    })


  return (
    <Container>
      {messagesWithTransitions.map(({item, key, props}) => (
        <Toast
          key={key}
          style={props}
          message={item}
        />

      ))}
    </Container>
  );
};

export default ToastContainer;
