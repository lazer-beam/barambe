import { call, put, delay } from 'redux-saga/effects'
import LoginActions from './duck.Login'

export function* signUp({ email, password, auth }) {
  try {
    yield call(auth.signup, email, password)
    yield delay(3000)
    yield put(LoginActions.signupSuccess('WRONG'))
  } catch (err) {
    yield put(LoginActions.authFailure(err))
  }
}

export function* logIn() {
  try {
    yield delay(200)
  } catch (err) {
    console.log(err)
  }
}

// export default {
//   signup,
// }
