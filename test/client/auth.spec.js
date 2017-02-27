import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'

import AuthService from '../../app/src/util/AuthService'

describe('Auth0', function() {
  before(function() {
    const auth = new CustomAuth(process.env.AUTH_CLIENT_ID, process.env.AUTH_DOMAIN)
  })

  describe('Signup', function() {

    it('Should add a new user to Auth0 database when signing up', function() {
      return auth0.signup('testUser@testing.com', '123')
    })
  })
})