import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
// import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { store, persistor } from './store';
// import App from './App';

import Routes from './routes';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
        {/* <StatusBar barStyle="dark-content" backgroundColor="#ee4e62" /> */}
        {/* <App /> */}
      </PersistGate>
    </Provider>
  );
}
