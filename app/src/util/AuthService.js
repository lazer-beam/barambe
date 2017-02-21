import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'
import Promise from 'bluebird'

import { isTokenExpired } from './jwtHelper'

export default class AuthService {
  constructor(clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:1337/dashboard',
        responseType: 'token',
      },
    })
    this.lock.on('authenticated', ::this._doAuthentication)
    this.lock.on('authorization_error', ::this._authorizationError)
    this.login = ::this.login
    this.getProfileBlu = Promise.promisify(this.lock.getProfile)
  }

  _doAuthentication(authResult) {
    this.setToken(authResult.idToken)
    // navigate to the home route
    browserHistory.replace('/dashboard')
    // Async loads the user profile data
    this.getProfileBlu(authResult.idToken).then(profile => {
      this.setProfile(profile)
    }).catch(err => console.log('Error loading the Profile: ', err))
  }

  _authorizationError(error) {
    console.log('Authentication Error', error)
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setProfile(profile) {
    // Saves profile data to local storage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  static setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  static getProfile() {
    // Retrieves the profile data from local storage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  static getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  static logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }
}
