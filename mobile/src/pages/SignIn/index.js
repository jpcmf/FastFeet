import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Image, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [id, setId] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit(idDeliveryman) {
    if (id === '') {
      Alert.alert('O ID precisa ser informado.');
      return;
    }

    dispatch(signInRequest(idDeliveryman));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} alt="FastFeet" />
        <Form>
          <FormInput
            icon="account-circle"
            keyboardType="number-pad"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Informe seu ID de cadastro"
            returnKeyType="next"
            onSubmitEditing={() => handleSubmit(id)}
            value={id}
            onChangeText={setId}
          />

          <SubmitButton loading={loading} onPress={() => handleSubmit(id)}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
