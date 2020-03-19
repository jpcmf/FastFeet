import React, { useState } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import {
  Container,
  ReportContainer,
  Form,
  StyledTextInput,
  StyledButton,
} from './styles';

import api from '~/services/api';

export default function ReportProblem({ navigation, route }) {
  const { order } = route.params;

  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    if (description === '') {
      Alert.alert('Atenção', 'A mensagem precisa ser preenchida.');

      setLoading(false);

      console.tron.log(order.id);
    }

    await api.post(`delivery/${order.id}/problems`, {
      description,
    });

    setDescription('');

    setLoading(false);

    navigation.goBack();

    Alert.alert('Sucesso', 'O problema foi registrado com sucesso.');
  }
  return (
    <Container>
      <ReportContainer>
        <Form>
          <StyledTextInput
            multiline
            placeholder="Descreva aqui o problema que na entrega."
            textAlignVertical="top"
            numberOfLines={10}
            onChangeText={setDescription}
            onSubmitEditing={handleSubmit}
            value={description}
          />
          <StyledButton loading={loading} onPress={handleSubmit}>
            Enviar
          </StyledButton>
        </Form>
      </ReportContainer>
    </Container>
  );
}

ReportProblem.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
