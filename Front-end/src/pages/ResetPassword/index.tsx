import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useToast } from '../../hooks/Toast';
import { Container, Background, Content, AnimationContainer } from './style';
import {useHistory, useLocation} from 'react-router-dom'

import logo from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/button';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const location = useLocation();

  const history = useHistory();


  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {


      try {
        formRef.current?.setErrors({});


        const schema = Yup.object().shape({
          password: Yup.string()
            .required('Senha Obrigatória'),
            password_confirmation: Yup.string().oneOf(
              [Yup.ref('password')],
              'As senhas precisam ser iguais'
            ),
        });

        const token = location.search.replace('?token=', '');

        if(!token){
          addToast({
            type: 'error',
            title: 'Erro JWT Token não encontrado',
            description: 'Erro ao fazer reset da senha, verifique suas informações',
          });
        }
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/reset',{
          password: data.password,
          password_confirmation: data.password_confirmation
        })


        history.push('/');


      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }


      addToast({
        type: 'error',
        title: 'Erro ao resetar senha',
        description: 'Erro ao fazer reset da senha, verifique suas informações',
      });
      }

    },
    [addToast, history, location.search],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
        <img src={logo} alt="GO Barber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar Senha</h1>
            <Input
              icon={FiLock}
              type="password"
              name="password"
              placeholder="Nova Senha"
            />

          <Input
              icon={FiLock}
              type="password"
              name="password_confirmation"
              placeholder="Confirmação da Senha"
            />

            <Button type="submit"> Alterar Senha </Button>
          </Form>
        </AnimationContainer>

      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
