import { call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import LoginActions from './duck.Login'

export function* logIn({ email, password, auth }) {
  try {
    const token = yield call(auth.login, email, password)
    yield put(LoginActions.loginSuccess())
    console.log(token)
  } catch (err) {
    console.log(err)
    yield put(LoginActions.authFailure(err))
  }
}

export function* signUp({ email, password, auth }) {
  try {
    yield call(auth.signup, email, password, 'Username-Password-Authentication')
    yield put(LoginActions.loginSuccess(auth.getProfile()))

    const item = yield call(auth.login, email, password)
    yield put(LoginActions.loginSuccess())
    const info = yield call(auth.doUserInfo, item.accessToken)
    yield put(LoginActions.closeModal())
    console.log(info)
    // yield call(delay, 3000)
    // yield* login({ email, password, auth2 })
    // yield* call(auth.login, email, password)
    // yield put(LoginActions.loginSuccess(auth.getProfile()))
  } catch (err) {
    console.log(err)
    yield put(LoginActions.authFailure(err))
  }
}
