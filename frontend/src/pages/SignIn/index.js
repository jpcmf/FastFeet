import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.png';
import { StyledForm, Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido.')
    .required('O e-mail é obrigatório.'),
  password: Yup.string()
    .min(6, 'A senha deve conter no mínimo 6 caracteres.')
    .required('A senha é obrigatória.'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  useEffect(() => {
    document.title = 'FastFeet | Login';
  });

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <StyledForm schema={schema} onSubmit={handleSubmit}>
        <img src={logo} alt="FastFeet" />
        <div>
          <label htmlFor="email">SEU E-MAIL</label>
          <Input name="email" type="email" placeholder="Seu e-mail" />
        </div>
        <div>
          <label htmlFor="password">SUA SENHA</label>
          <Input name="password" type="password" placeholder="Sua senha" />
        </div>
        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </StyledForm>
    </Container>
  );
}
