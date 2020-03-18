import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  const { id } = payload;

  const response = yield call(api.get, `/deliverymen/${id}`);

  if (response.data && +response.data.id === +id) {
    yield put(signInSuccess(response.data));
    return;
  }

  yield put(signFailure());

  Alert.alert(
    'Falha na autenticação.',
    'O ID de entregador não foi encontrado.'
  );
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
