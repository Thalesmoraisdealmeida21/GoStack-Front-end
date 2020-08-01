import React, {useCallback,  useRef, useContext} from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Platform, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { useNavigation } from "@react-navigation/core";


import  Button from './../../components/Button';
import  Input from './../../components/Input';
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import Logo from './../../assets/logo.png';
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText} from "./styles";
import {useAuth} from './../../hooks/auth';


const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>();
  const navigator = useNavigation();

  const {signIn} = useAuth();

  const handleSignIn = useCallback( async (data)=> {
        await signIn({
          email: data.email,
          password: data.password
        });
  }, [])


  const handleGoToSignUp = useCallback(()=> {
    navigator.navigate('SignUp');
  }, [])


  return (
    <>

    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
      <ScrollView keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex: 1}}
      >
      <Container>
        <Image source={Logo}></Image>
        <Title>
          Faça seu logon
        </Title>


      <Form  ref={formRef} onSubmit={handleSignIn}>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          name="email"
          icon="mail"
          returnKeyType="next"
          placeholder="E-mail"
          onSubmitEditing={()=> {

          }}
         />
          <Input
          name="password"
          returnKeyType="send"
          onSubmitEditing={() => {formRef.current?.submitForm()}}
          secureTextEntry icon="lock" placeholder="Senha"></Input>
        <Button style={{width: 350}} onPress={()=>{
          formRef.current?.submitForm();
        }}>Entrar</Button>
      </Form>


        <ForgotPassword onPress={()=>{}}>
          <ForgotPasswordText>
              Esqueci minha senha
          </ForgotPasswordText>
        </ForgotPassword>



      </Container>



      </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={()=>{}}>

      <Icon name="log-in" size={20} color='#ff9000'></Icon>
          <CreateAccountButtonText onPress={handleGoToSignUp} >Criar um conta</CreateAccountButtonText>
      </CreateAccountButton>


    </>
  )
}


export default SignIn;
