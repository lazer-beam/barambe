import auth0 from 'auth0-js'
import Promise from 'bluebird'
import { EventEmitter } from 'events'
import { browserHistory } from 'react-router'

import { isTokenExpired } from './jwtHelper'

export default class CustomAuth extends EventEmitter {
  constructor(clientID, domain) {
    super()
    // Configure Auth0
    this.auth0 = new auth0.WebAuth({
      clientID: '4sTpMtCBPcYY4UACaf1XjiSCzn7q97XK',
      domain: 'barambe.auth0.com',
      responseType: 'token id_token',
      redirectUri: 'http://localhost:1337/login',
    })
    this.auth0.client.login = Promise.promisify(this.auth0.client.login)
    this.auth0.client.userInfo = Promise.promisify(this.auth0.client.userInfo)
    this.auth0.redirect.signupAndLogin = Promise.promisify(this.auth0.redirect.signupAndLogin)
    this.auth0.parseHash = Promise.promisify(this.auth0.parseHash)

    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
  }

  login(username, password) {
    const creds = { username, password, realm: 'Username-Password-Authentication' }
    this.auth0.client.login(creds).then(authResult => {
      if (authResult && authResult.idToken && authResult.accessToken) {
        this.setToken(authResult.accessToken, authResult.idToken)
        browserHistory.replace('/home')
      }
    }).catch(err => console.log(err.description))
  }

  signup(email, password) {
    const creds = { email, password, connection: 'Username-Password-Authentication' }
    this.auth0.redirect.signupAndLogin(creds).then(() => {
      console.log('signup success!')
    }).catch(err => {
      console.log(err)
    })
    // this.auth0.redirect.signupAndLogin({
    //   email,
    //   password,
    //   connection: 'Username-Password-Authentication',
    // }, (err) => {
    //   if (err) {
    //     alert('Error: ' + err.description)
    //   }
    // })
  }

  parseHash(hash) {
    this.auth0.parseHash({ hash }).then(authResult => {
      this.setToken(authResult.accessToken, authResult.idToken)
      browserHistory.replace('/dashboard')
      return this.auth0.client.userInfo(authResult.accessToken)
    }).then(profile => {
      this.setProfile(profile)
    }).catch(err => {
      console.log(err)
    })

    // this.auth0.parseHash({ hash }, (err, authResult) => {
    //   if (authResult && authResult.accessToken && authResult.idToken) {
    //     this.setToken(authResult.accessToken, authResult.idToken)
    //     browserHistory.replace('/home')
    //     this.auth0.client.userInfo(authResult.accessToken, (error, profile) => {
    //       if (error) {
    //         console.log('Error loading the Profile', error)
    //       } else {
    //         this.setProfile(profile)
    //       }
    //     })
    //   } else if (authResult && authResult.error) {
    //     alert('Error: ' + authResult.error)
    //   }
    // })
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setToken(accessToken, idToken) {
    // Saves user access token and ID token into local storage
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('id_token', idToken)
  }

  setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }
}
