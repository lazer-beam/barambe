import React from 'react'
import { Message } from 'semantic-ui-react'

const selectMessage = {
  emailTaken: (
    <Message negative size="small">
      <Message.Header>Shit Bro!</Message.Header>
      <p>That email already has an account.</p>
    </Message>
  ),
  userInvalid: (
    <Message negative size="small">
      <Message.Header>Awww, nuts!</Message.Header>
      <p>That email already has an account.</p>
    </Message>
  ),
}

const LoginMessages = props => {
  console.log(selectMessage[props.msg])
  return (
    <div>
      {selectMessage[props.msg]}
    </div>
  )
}

export default LoginMessages
