import React, {useEffect} from 'react';

import { Container } from './styles';
import {FiXCircle, FiAirplay, FiCheckCircle, FiInfo } from 'react-icons/fi'
import { useToast} from './../../../hooks/Toast'

interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}


interface ToastProps {
  message: ToastMessage;
  style: object;
}


const icons = {
  info: <FiInfo size={18}></FiInfo>,
  success: <FiCheckCircle size={18}></FiCheckCircle>,
  error: <FiAirplay size={18}></FiAirplay>

}



const Toast: React.FC<ToastProps> =  ({ message, style }) => {
  const { removeToast } = useToast();




  useEffect(()=> {

      const timer = setTimeout(()=>{
        removeToast(message.id)
      }, 3000);


      return () => {
        clearTimeout(timer);
      }
  }, [removeToast, message.id])

  return(
    <Container style={style}  type={message.type || 'info'}>
         <div>
            {icons[message.type || 'info']}
            <strong>{message.title}</strong>
            <p>{message.description}</p>
          </div>
          <button type="button" onClick={()=>{removeToast(message.id)}}>
            <FiXCircle />
          </button>
    </Container>
  )
}


export default Toast;
