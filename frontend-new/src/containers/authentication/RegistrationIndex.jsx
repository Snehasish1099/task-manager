import React from 'react'
import RegistrationPage from '../../../../frontend/src/components/RegistrationPage'
import { AuthHooks } from './Hooks'

const RegistrationIndex = () => {

  const { RegistrationApiCall } = AuthHooks()
  
  return (
    <RegistrationPage
      RegistrationApiCall={RegistrationApiCall}
    />
  )
}

export default RegistrationIndex