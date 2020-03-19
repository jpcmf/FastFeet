import React from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from '@react-navigation/compat';
import PropTypes from 'prop-types';

import { format, parseISO } from 'date-fns';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  InfoContainer,
  OrderInfo,
  InfoTitle,
  TitleText,
  OrderInfoTitle,
  OrderInfoText,
  DeliveryInfo,
  DeliveryInfoTitle,
  DeliveryInfoText,
  DeliveryDates,
  DeliveryDateTitle,
  DeliveryDateText,
  DeliveryStartDate,
  DeliveryEndDate,
  ActionButtons,
  Withdraw,
  WithdrawText,
  Action,
  ActionBox,
  ActionText,
  TopBox,
} from './styles';

import api from '~/services/api';

function OrderDetails({ route, navigation }) {
  const { item } = route.params;

  const formattedStartDate = item.end_date
    ? format(parseISO(item.start_date), 'dd/MM/yyyy')
    : null;

  const formattedEndDate = item.end_date
    ? format(parseISO(item.start_date), 'dd/MM/yyyy')
    : null;

  const getFormattedStatus = order => {
    let status = '';

    if (order.canceled_at) {
      status = 'Cancelada';

      return status;
    }

    if (order.end_date) {
      status = 'Entregue';

      return status;
    }

    if (order.start_date) {
      status = 'Retirada';

      return status;
    }

    status = 'Pendente';

    return status;
  };

  async function handleWithdraw(order) {
    async function applyStartDate() {
      await api.put(`deliveryman/${order.deliveryman_id}/order/${order.id}`, {
        start_date: new Date(),
      });

      navigation.goBack();

      Alert.alert('Encomenda retirada com sucesso.');
    }

    Alert.alert(
      'Retirar encomenda',
      'Deseja retirar a encomenda?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => applyStartDate(),
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <Container>
      <TopBox>
        <InfoContainer persistenScrollbar>
          <OrderInfo>
            <InfoTitle>
              <Icon name="local-shipping" size={20} color="#7D40E7" />
              <TitleText>Informações da entrega</TitleText>
            </InfoTitle>

            <OrderInfoTitle>DESTINATÁRIO</OrderInfoTitle>
            <OrderInfoText>{item.recipient.name}</OrderInfoText>

            <OrderInfoTitle>ENDEREÇO DE ENTREGA</OrderInfoTitle>
            <OrderInfoText>
              {item.recipient.street}, {item.recipient.number}{' '}
              {item.recipient.complement
                ? ` - ${item.recipient.complement}`
                : ''}
              {' - '}
              {item.recipient.city} - {item.recipient.state},{' '}
              {item.recipient.cep}
            </OrderInfoText>

            <OrderInfoTitle>PRODUTO</OrderInfoTitle>
            <OrderInfoText>{item.product}</OrderInfoText>
          </OrderInfo>

          <DeliveryInfo>
            <InfoTitle>
              <Icon name="event" size={20} color="#7D40E7" />
              <TitleText>Situação da entrega</TitleText>
            </InfoTitle>

            <DeliveryInfoTitle>PRODUTO</DeliveryInfoTitle>
            <DeliveryInfoText>{getFormattedStatus(item)}</DeliveryInfoText>
            <DeliveryDates>
              <DeliveryStartDate>
                <DeliveryDateTitle>DATA DE RETIRADA</DeliveryDateTitle>
                <DeliveryDateText>
                  {formattedStartDate !== null
                    ? formattedStartDate
                    : '__/__/__'}
                </DeliveryDateText>
              </DeliveryStartDate>

              <DeliveryEndDate>
                <DeliveryDateTitle>DATA DE RETIRADA</DeliveryDateTitle>
                <DeliveryDateText>
                  {formattedEndDate !== null ? formattedEndDate : '__/__/__'}
                </DeliveryDateText>
              </DeliveryEndDate>
            </DeliveryDates>
          </DeliveryInfo>

          <ActionButtons>
            {!item.start_date && !item.canceled_at && (
              <Withdraw onPress={() => handleWithdraw(item)}>
                <WithdrawText>RETIRAR ENCOMENDA</WithdrawText>
              </Withdraw>
            )}

            {item.start_date && !item.canceled_at && !item.end_date && (
              <Action>
                <ActionBox
                  onPress={() =>
                    navigation.navigate('ReportProblem', { order: item })
                  }
                >
                  <Icon name="cancel" size={20} color="#E74040" />
                  <ActionText>Informar{'\n'}Problema</ActionText>
                </ActionBox>
                <ActionBox
                  onPress={() =>
                    navigation.navigate('ViewProblem', { order: item })
                  }
                >
                  <Icon name="error" size={20} color="#E7BA40" />
                  <ActionText>Visualizar{'\n'}Problemas</ActionText>
                </ActionBox>
                <ActionBox
                  onPress={() =>
                    navigation.navigate('ConfirmDelivery', { order: item })
                  }
                >
                  <Icon name="check-circle" size={20} color="#7D40E7" />
                  <ActionText>Confirmar{'\n'}Entrega</ActionText>
                </ActionBox>
              </Action>
            )}
          </ActionButtons>
        </InfoContainer>
      </TopBox>
    </Container>
  );
}

OrderDetails.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default withNavigationFocus(OrderDetails);
