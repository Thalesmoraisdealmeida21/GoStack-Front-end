import React, { useRef, useCallback, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useToast } from '../../hooks/Toast';
import { Container, Background, Content, AnimationContainer } from './style';
import {useHistory, Link} from 'react-router-dom'

import logo from '../../assets/logo.svg';


import Input from '../../components/input';
import Button from '../../components/button';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();



  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {

      setLoading(true);


      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail Obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });



          await api.post('/password/forgot', {
            email: data.email,
          })

          addToast({
            type: 'success',
            title: 'E-mail de recuperação enviado',
            description: 'Enviamos um e-mail para confirmar a recuperação de senha.'
          })



      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          addToast({
            type: 'error',
            title: 'Erro na recuperação de senha',
            description: 'Ocorreu um erro ao tentar realziar a recuperação de senha, tente novamente !',
          });
        }

      } finally {
          setLoading(false);
      }



    },
    [addToast],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
        <img src={logo} alt="GO Barber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar Senhan</h1>
            <Input icon={FiMail} name="email" type="text" placeholder="E-mail" />


            <Button loading={loading} type="submit"> Recuperar </Button>

          </Form>

          <Link to="/signup">
            <FiLogIn />
            Voltar ao Login
          </Link>
        </AnimationContainer>

      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
