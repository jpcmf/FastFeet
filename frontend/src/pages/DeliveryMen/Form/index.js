import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { Container, Header, StyledButton, Content } from './styles';

import AvatarInput from '../components/AvatarInput';

import history from '~/services/history';
import api from '~/services/api';

export default function DeliveryMenForm({ history: navigation }) {
  const { deliveryman } = navigation.location.state || '';
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    const errors = 0;

    if (data.name === '') {
      toast.error('O nome precisa ser preenchido.');
    }

    if (data.email === '') {
      toast.error('O e-mail precisa ser preenchido.');
    }

    if (errors >= 1) return;

    if (deliveryman) {
      try {
        setLoading(true);

        await api.put(`/deliverymen/${deliveryman.id}`, {
          name: data.name,
          email: data.email,
          avatar_id: data.avatar_id,
        });

        setLoading(false);

        toast.success('O entregador foi editado com sucesso.');
      } catch (error) {
        setLoading(false);

        toast.error('Erro ao editar entregador.');
      }
    } else {
      try {
        setLoading(true);

        await api.post(`/deliverymen`, {
          name: data.name,
          email: data.email,
          avatar_id: data.avatar_id,
        });

        setLoading(false);

        toast.success('O entregador foi cadastrado com sucesso.');

        history.push('/deliverymen');
      } catch (error) {
        setLoading(false);

        toast.error('Erro ao cadastrar entregador.');
      }
    }
  }

  return (
    <Container>
      <Form initialData={deliveryman} onSubmit={handleSubmit}>
        <Header>
          <p>{deliveryman ? 'Edição' : 'Cadastro'} de entregadores</p>
          <div className="headerButtons">
            <StyledButton
              onClick={() => history.push('/deliverymen')}
              type="button"
            >
              <MdKeyboardArrowLeft size={20} color="#fff" />
              VOLTAR
            </StyledButton>
            <StyledButton type="submit">
              <MdCheck size={20} color="#fff" />
              {loading ? 'SALVANDO...' : 'SALVAR'}
            </StyledButton>
          </div>
        </Header>

        <Content>
          <div className="searchInputs">
            <div className="avatar">
              <AvatarInput name="avatar_id" />
            </div>
            <div className="data">
              <span>Nome</span>
              <Input name="name" type="text" placeholder="John Doe" />
            </div>
            <div className="data">
              <span>E-mail</span>
              <Input
                name="email"
                type="email"
                placeholder="exemplo@fastfeet.com"
              />
            </div>
          </div>
        </Content>
      </Form>
    </Container>
  );
}

DeliveryMenForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
