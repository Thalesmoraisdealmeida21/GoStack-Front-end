import React, {useCallback,  useRef} from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { useNavigation } from "@react-navigation/core";


import  Button from './../../components/Button';
import  Input from './../../components/Input';

import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import api from './../../services/api';
import Logo from './../../assets/logo.png';
import { Container, Title, BackToLogon, BackToLogonText} from "./styles";


const SignUp: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const navigator = useNavigation();

  const handleSignUp = useCallback(async (data: object)=> {
        try {
          await api.post('/users', data);

          Alert.alert('Usuário criado com sucesso');
          navigator.goBack();
        } catch (err) {
          Alert.alert('Ocorreu um erro ao criar o usuário');
        }
  }, [])


  const handleGoToSignIn = useCallback(()=> {
    navigator.navigate('SignIn');
  }, [])


  return (
    <>

    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
      <ScrollView>
      <Container>
        <Image source={Logo}></Image>
        <Title>
          Criar sua Conta
        </Title>


      <Form  ref={formRef} onSubmit={handleSignUp}>

        <Input
        autoCapitalize="words"


        name="name" icon="user" placeholder="user"></Input>
        <Input name="email"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        icon="mail" placeholder="E-mail"></Input>
        <Input name="password" secureTextEntry icon="lock" placeholder="Senha"></Input>
        <Button style={{width: 350}} onPress={()=>{
          formRef.current?.submitForm();
        }}>Criar Conta</Button>
      </Form>






      </Container>



      </ScrollView>
      </KeyboardAvoidingView>

      <BackToLogon onPress={()=>{}}>

      <Icon name="arrow-left" size={20} color='#fff'></Icon>
          <BackToLogonText onPress={handleGoToSignIn} >Voltar para o Logon</BackToLogonText>
      </BackToLogon>


    </>
  )
}


export default SignUp;
