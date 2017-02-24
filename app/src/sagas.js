import { takeEvery } from 'redux-saga'

/* ------------- Types ------------- */
import { LoginTypes } from './login/duck.Login'

import { signUp } from './login/LoginSagas'

export default function* rootSaga() {
  yield [
    takeEvery(LoginTypes.SIGNUP_REQUEST, signUp),
  ]
}
