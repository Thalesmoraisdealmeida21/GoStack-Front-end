import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useToast } from '../../hooks/Toast';
import { Container, Background, Content } from './style';

import logo from '../../assets/logo.svg';

import { useAuth } from '../../hooks/AuthContext';

import Input from '../../components/input';
import Button from '../../components/button';
import getValidationErrors from '../../utils/getValidationErrors';

interface DataUser {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: DataUser) => {
      signIn(data);

      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail Obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Senha Obrigatória')
            .required('Senha Obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }

      addToast({
        type: 'error',
        title: 'Auth Error',
        description: 'Erro ao fazer login, verifique suas credenciais',
      });
    },
    [signIn, addToast],
  );
  return (
    <Container>
      <Content>
        <img src={logo} alt="GO Barber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input icon={FiMail} name="email" type="text" placeholder="E-mail" />
          <Input
            icon={FiLock}
            type="password"
            name="password"
            placeholder="Senha"
          />

          <Button type="submit"> Entrar</Button>
          <a href="/forgot">Esqueci minha senha</a>
        </Form>

        <a href="/create">
          <FiLogIn />
          Esqueci minha senha
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
