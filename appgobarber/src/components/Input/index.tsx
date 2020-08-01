import React, {useEffect, useRef, useImperativeHandle} from 'react';
import {Container, TextInput, Icon} from './styles'
import { TextInputProps } from 'react-native'
import { useField} from '@unform/core';


interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}
const Input: React.RefForwardingComponent<InputRef ,InputProps> = ({name, icon, ...rest}, ref) => {

  const { registerField, fieldName, error, defaultValue = '' } = useField(name);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});



  useEffect(()=>{
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',

      clearValue() {
        inputValueRef.current.value = '';
      }
    });
  },[fieldName, registerField]);

    return (
      <Container>
        <Icon name={icon} size={20} color="#666360"></Icon>
        <TextInput
          placeholderTextColor="#666360"
          onChangeText={value => {
            inputValueRef.current.value = value;
          }}
          {...rest}
        ></TextInput>
      </Container>
    )

}
  export default Input;
