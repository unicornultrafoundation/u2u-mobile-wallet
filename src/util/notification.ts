import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { IosAuthorizationStatus } from 'expo-notifications';

export const requestUserPermissionIOS = async (): Promise<boolean> => {
  if (Platform.OS !== 'ios') {
    return true;
  }
  const { status, ios } = await Notifications.requestPermissionsAsync({
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
  const { status } = await Notifications.requestPermissionsAsync();
  const enabled = status === 'granted';
  // if (enabled) {
  //   console.log('Authorization status android:', status);
  // }
  return enabled;
}