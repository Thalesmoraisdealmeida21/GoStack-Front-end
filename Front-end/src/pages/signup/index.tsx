import React, { useCallback, useRef } from 'react';
import {
  FiArrowLeft,
  FiLock,
  FiUser,
  FiMail,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Background, Content } from './style';
import api from '../../services/api';


import {useToast} from './../../hooks/Toast'

import getValidationErrors from '../../utils/getValidationErrors';
import {Link, useHistory} from 'react-router-dom'

import logo from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/button';



interface SignUpFormData {
  name: string;
  email: string;
  password: string;

}
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('E-mail Obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('Senha Obrigatória')
          .min(6, 'Senha precisa ter no minimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data)

      addToast({
          title: 'Sistema',
          type: "success",
          description: 'Cadastro Realizado com sucesso'
       })

       history.push('/');

    } catch (err) {

      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro no cadastro do usuário',
        description: 'Ocorreu um erro ao cadastrar o usuário'
      })

    }
  }, [addToast]);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="GO Barber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input icon={FiUser} name="name" type="text" placeholder="Nome" />
          <Input icon={FiMail} name="email" type="text" placeholder="E-mail" />
          <Input
            icon={FiLock}
            type="password"
            name="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/">
          <FiArrowLeft />
          Voltar para o logon
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
