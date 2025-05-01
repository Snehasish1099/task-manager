import React from 'react'
import LoginPage from '../../../../frontend/src/components/LoginPage'
import { AuthHooks } from './Hooks'

const LoginIndex = () => {
  
  const { LoginApiCall } = AuthHooks()

  return (
    <LoginPage
      LoginApiCall={LoginApiCall}
    />
  )
}

export default LoginIndex