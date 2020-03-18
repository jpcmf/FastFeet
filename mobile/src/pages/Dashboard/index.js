import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from '@react-navigation/compat';
import PropTypes from 'prop-types';

import { format, parseISO } from 'date-fns';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '~/store/modules/auth/actions';

import {
  StyledActivityIndicator,
  Container,
  Header,
  DeliverymanAvatar,
  Avatar,
  DeliverymanData,
  WelcomeData,
  DeliverymanName,
  Logout,
  Orders,
  OrdersHeader,
  OrdersHeaderText,
  OrdersHeaderLink,
  OrdersHeaderLinkText,
  OrderList,
  OrderText,
  OrdersLinksContainer,
  OrderBox,
  OrderTitle,
  OrderDetails,
  OrderDate,
  OrderDateTextTitle,
  OrderDateText,
  OrderCity,
  OrderCityTextTitle,
  OrderCityText,
  OrderViewDetails,
  OrderViewDetailsText,
  OrderProgressBar,
  ProgressBar,
  ProgressBarContent,
  ProgressBarDots,
  ProgressBarMessages,
  WaitingDot,
  WaitingText,
  WithdrawDot,
  WithdrawText,
  DeliveredDot,
  DeliveredText,
  NoOrderText,
} from './styles';

import api from '~/services/api';

function Dashboard({ navigation, isFocused }) {
  const deliveryman = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [delivered, setDelivered] = useState(false);

  const dispatch = useDispatch();

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (orders.length !== 0 && pageNumber > total) return;

    if (loading) return;

    setLoading(true);

    const response = await api.get(`/deliveryman/${deliveryman.id}/orders`, {
      params: {
        page: pageNumber,
        delivered,
      },
    });

    const data = response.data.rows.map(order => ({
      ...order,
      formattedDate: format(parseISO(order.createdAt), 'MM/dd/yyyy'),
    }));

    const totalItems = response.data.count;
    setTotal(Math.ceil(totalItems / 7));

    setLoading(false);
    setPage(pageNumber + 1);
    setOrders(shouldRefresh ? data : [...orders, ...data]);
  }

  function refreshList() {
    setRefreshing(true);
    loadPage(1, true);

    setRefreshing(false);
  }

  useEffect(() => {
    loadPage();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (total === 0) {
      setTotal(1);
    }

    async function loadList() {
      console.tron.log(delivered);

      refreshList();
    }
    loadList();
  }, [delivered, isFocused]); // eslint-disable-line

  async function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Header>
        <DeliverymanAvatar>
          <Avatar
            source={
              !deliveryman.avatar
                ? {
                    uri: `https://ui-avatars.com/api/?name=${deliveryman.name}&background=7159c1&color=fff`,
                  }
                : { uri: deliveryman.avatar.url }
            }
          />
        </DeliverymanAvatar>

        <DeliverymanData>
          <WelcomeData>Bem vindo de volta,</WelcomeData>
          <DeliverymanName>{deliveryman.name}</DeliverymanName>
        </DeliverymanData>
      </Header>
    </Container>
  );
}

const TabBarIcon = ({ tintColor }) => (
  <Icon name="event" size={20} color={tintColor} />
);

Dashboard.navigationOptions = {
  tabBarLabel: 'Check-in',
  tabBarIcon: TabBarIcon,
};

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default Dashboard;
