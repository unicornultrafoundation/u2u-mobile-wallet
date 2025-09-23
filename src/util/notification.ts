import { Platform } from 'react-native';
// (Device guard removed)
// Avoid top-level import; dynamically import inside functions
import { IosAuthorizationStatus } from 'expo-notifications';

export const requestUserPermissionIOS = async (): Promise<boolean> => {
  if (Platform.OS !== 'ios') {
    return true;
  }
  // proceed even on simulator
  const ExpoNotifications = await import('expo-notifications');
  const { status, ios } = await ExpoNotifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
    },
  });
  const enabled = status === 'granted' || ios?.status === IosAuthorizationStatus.PROVISIONAL || ios?.status === IosAuthorizationStatus.AUTHORIZED;
  // if (enabled) {
  //   console.log('Authorization status ios:', status, ios);
  // }
  return enabled;
}

export const requestPermissionAndroid = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true;
  }
  const ExpoNotifications = await import('expo-notifications');
  const { status } = await ExpoNotifications.requestPermissionsAsync();
  const enabled = status === 'granted';
  // if (enabled) {
  //   console.log('Authorization status android:', status);
  // }
  return enabled;
}