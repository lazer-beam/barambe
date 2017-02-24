import { call, put } from 'redux-saga/effects'
import LoginActions from './duck.Login'

export function* signUp({ email, password, auth }) {
  try {
    yield call(auth.signup, email, password)
    yield put(LoginActions.signupSuccess('WRONG'))
  } catch (err) {
    yield put(LoginActions.authFailure(err))
  }
}

export default {
  signup,
}
