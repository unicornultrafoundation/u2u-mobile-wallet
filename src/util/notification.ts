import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

export const requestUserPermissionIOS = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status ios:', authStatus);
  }
}

export const requestPermissionAndroid = async () => {
  const authStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  const enabled =
    authStatus === 'granted';

  // if (enabled) {
  //   console.log('Authorization status android:', authStatus);
  // }

  return enabled
}