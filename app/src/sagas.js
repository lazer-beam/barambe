import { takeEvery } from 'redux-saga'

/* ------------- Types ------------- */
import { LoginTypes } from './login/duck.Login'

import { signUp, logIn } from './login/LoginSagas'

export default function* rootSaga() {
  yield takeEvery(LoginTypes.SIGNUP_REQUEST, signUp)
  yield takeEvery(LoginTypes.LOGIN_REQUEST, logIn)
}
