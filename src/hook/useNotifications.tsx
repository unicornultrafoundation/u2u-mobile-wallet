import { useInfiniteQuery } from "@tanstack/react-query"
import messaging from '@react-native-firebase/messaging';
import { useEffect } from "react"
import { Platform } from "react-native"
import { requestUserPermissionIOS, requestPermissionAndroid } from "../util/notification";
import { useNavigation } from "@react-navigation/native";


export const useNotifications = () => {
  const navigation = useNavigation<any>()
  useEffect(() => {
    if (Platform.OS === 'ios') requestUserPermissionIOS()
    else requestPermissionAndroid()

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      if (remoteMessage.data?.navigationId === 'external-sign') {
        navigation.navigate('SignExternalRequest', {
          signRequestID: remoteMessage.data?.signRequestId
        })
      }
    });

    return unsubscribe;
  }, [])

  return {
    
  }
}