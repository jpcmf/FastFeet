import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import OrdersList from '~/pages/Orders/List';
import OrdersForm from '~/pages/Orders/Form';

import DeliveryMenList from '~/pages/DeliveryMen/List';
import DeliveryMenForm from '~/pages/DeliveryMen/Form';

import RecipientsList from '~/pages/Recipients/List';
import RecipientsForm from '~/pages/Recipients/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" exact component={OrdersList} isPrivate />
      <Route path="/orders/edit" component={OrdersForm} isPrivate />

      <Route path="/deliverymen" exact component={DeliveryMenList} isPrivate />
      <Route path="/deliverymen/edit" component={DeliveryMenForm} isPrivate />

      <Route path="/recipients" exact component={RecipientsList} isPrivate />
      <Route path="/recipients/edit" component={RecipientsForm} isPrivate />
    </Switch>
  );
}
