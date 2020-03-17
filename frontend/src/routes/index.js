import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import OrderList from '~/pages/Orders/List';
import HelloWorld from '~/pages/HelloWorld';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/orders" exact component={OrderList} isPrivate />
    </Switch>
  );
}
