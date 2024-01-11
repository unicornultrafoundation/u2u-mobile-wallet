import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';

export const useBiometric = () => {
  const [hasHardware, setHasHardware] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [authType, setAuthType] = useState<LocalAuthentication.AuthenticationType[]>([])

  useEffect(() => {
    (async () => {
      setHasHardware(await LocalAuthentication.hasHardwareAsync())
      setIsEnrolled(await LocalAuthentication.isEnrolledAsync())
      setAuthType(await LocalAuthentication.supportedAuthenticationTypesAsync())
    })()
  }, [])

  const trigger = async () => {
    const options = {

    }
    return LocalAuthentication.authenticateAsync(options)
  }

  return {
    hasHardware,
    isEnrolled,
    authType,
    trigger
  }
}