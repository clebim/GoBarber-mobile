import { all, takeLatest, put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';
import { updateProfileSuccess, updateProfileFailure } from './action';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = Object.assign(
      { name, email },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, 'users', profile);
    
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));

  } catch(err) {
    Alert.alert(
      'Falha na atualização',
      'Houve um erro na atualização do perfil, verifique seus dados'
    );
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
]);