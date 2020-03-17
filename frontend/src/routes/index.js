import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import OrdersList from '~/pages/Orders/List';
import OrdersForm from '~/pages/Orders/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" exact component={OrdersList} isPrivate />
      <Route path="/orders/edit" component={OrdersForm} isPrivate />
    </Switch>
  );
}
