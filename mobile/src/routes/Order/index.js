import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Order from '~/pages/Dashboard';
import OrderDetail from '~/pages/Dashboard/OrderDetails';
import ReportProblem from '~/pages/Dashboard/ReportProblem';
import ConfirmDelivery from '~/pages/Dashboard/ConfirmDelivery';
import ViewProblem from '~/pages/Dashboard/ViewProblem';

const Stack = createStackNavigator();

export default function OrderNavigator() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Order"
          component={Order}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetail}
          options={{
            headerBackTitleVisible: false,
            headerTitle: 'Detalhes da encomenda',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTransparent: true,
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="ReportProblem"
          component={ReportProblem}
          options={{
            headerBackTitleVisible: false,
            headerTitle: 'Informar um problema',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTransparent: true,
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="ViewProblem"
          component={ViewProblem}
          options={{
            headerBackTitleVisible: false,
            headerTitle: 'Visualizar problemas',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTransparent: true,
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="ConfirmDelivery"
          component={ConfirmDelivery}
          options={{
            headerBackTitleVisible: false,
            headerTitle: 'Confirmar entrega',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTransparent: true,
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </>
  );
}
