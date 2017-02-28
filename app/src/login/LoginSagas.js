import { call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import LoginActions from './duck.Login'

export function* logIn({ email, password, auth }) {
  try {
    const token = yield call(auth.login, email, password)
    yield call(delay, 3000)
    yield put(LoginActions.loginSuccess())
    yield call(delay, 3000)
    console.log(token)
  } catch (err) {
    console.log(err)
    yield put(LoginActions.authFailure(err))
  }
}

export function* signUp({ email, password, auth }) {
  try {
    // attempt to add user to database
    yield call(auth.signup, email, password, 'Username-Password-Authentication')
    yield call(delay, 3000)
    yield put(LoginActions.signupSuccess())
    yield call(delay, 3000)
    yield put(LoginActions.loginRequest(email, password, auth))
  } catch (err) {
    console.log(err)
    yield put(LoginActions.authFailure(err))
  }
}
