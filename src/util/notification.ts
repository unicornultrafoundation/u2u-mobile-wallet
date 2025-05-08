import {PermissionsAndroid} from 'react-native';
import notifee, {AuthorizationStatus} from '@notifee/react-native';

export const requestUserPermissionIOS = async () => {
  const authStatus = await notifee.requestPermission();
  const enabled =
    authStatus.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus.authorizationStatus === AuthorizationStatus.PROVISIONAL;

  // if (enabled) {
  //   console.log('Authorization status ios:', authStatus);
  // }
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