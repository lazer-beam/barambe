import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'
import Promise from 'bluebird'

import { isTokenExpired } from './jwtHelper'

export default class AuthService {
  constructor(clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:1337/login',
        responseType: 'token',
      },
    })
    this.lock.on('authenticated', ::this._doAuthentication)
    this.lock.on('authorization_error', ::AuthService.authorizationError)

    this.login = ::this.login
    this.logout = ::AuthService.logout
    this.loggedIn = ::AuthService.loggedIn

    this.getProfile = Promise.promisify(this.lock.getProfile)
  }

  _doAuthentication(authResult) {
    AuthService.setToken(authResult.idToken)
    browserHistory.replace('/dashboard')
    this.getProfile(authResult.idToken).then(profile => {
      this.setProfile(profile)
    }).catch(err => console.log('Error loading the Profile: ', err))
  }

  static authorizationError(error) {
    console.log('Authentication Error', error)
  }

  login() { this.lock.show() }

  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile))
    this.emit('profile_updated', profile)
  }

  static loggedIn() {
    const token = AuthService.getToken()
    return !!token && !isTokenExpired(token)
  }

  static setToken(idToken) {
    localStorage.setItem('id_token', idToken)
  }

  static getProfile() {
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  static getToken() {
    return localStorage.getItem('id_token')
  }

  static logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
    browserHistory.replace('/home')
  }
}
