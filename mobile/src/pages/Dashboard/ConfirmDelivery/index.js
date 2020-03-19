import React, { useState } from 'react';
import { Alert, Text, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { useNavigation } from '@react-navigation/native';
import { useCamera } from 'react-native-camera-hooks';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  TopBox,
  PictureButton,
  SendButton,
  TextButton,
  Camera,
} from './styles';

import api from '~/services/api';

export default function ConfirmDelivery({ initialProps, route }) {
  const navigation = useNavigation();
  const { order } = route.params;

  const deliveryman = useSelector(state => state.auth);

  const [
    { cameraRef, type, ratio, autoFocus, autoFocusPoint },
    { takePicture },
  ] = useCamera(initialProps);

  const [takenPicture, setTakenPicture] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handlePicture() {
    const data = await takePicture({ quality: 0.5 });

    setTakenPicture(data);
  }

  async function handleSubmit() {
    setLoading(true);

    try {
      const data = new FormData();

      data.append('file', {
        // uri: Platform.OS === 'ios' ? picture : picture.replace('file://', ''),
        uri: takenPicture.uri,
        name: 'deliverySignature.jpg',
        type: 'image/jpge',
      });

      const response = await api.post('files', data);

      await api.put(`deliveryman/${deliveryman.id}/order/${order.id}`, {
        end_date: new Date(),
        signature_id: response.data.id,
      });
      Alert.alert('Entrega confirmada com sucesso.');

      navigation.popToTop();
    } catch (error) {
      console.tron.warn(`Erro = ${error}`);

      Alert.alert(
        'Não foi possível confirmar a entrega',
        'Houve um erro em nosso sistema'
      );
    }

    setLoading(false);
  }

  return (
    <Container>
      <TopBox />
      <Camera
        ref={cameraRef}
        autoFocusPointOfInterest={autoFocusPoint.normalized}
        type={type}
        ratio={ratio}
        autoFocus={autoFocus}
      />
      <PictureButton onPress={handlePicture}>
        <Icon name="camera" size={29} color="#fff" />
      </PictureButton>
      <SendButton onPress={handleSubmit}>
        <TextButton>Enviar</TextButton>
      </SendButton>
    </Container>
  );
}

ConfirmDelivery.propTypes = {
  initialProps: PropTypes.object,
  route: PropTypes.object.isRequired,
};
