import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Sign from '~/pages/Sign';
import HelloWorld from '~/pages/HelloWorld';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={HelloWorld} />
      <Route path="/page" component={Sign} />
    </Switch>
  );
}
