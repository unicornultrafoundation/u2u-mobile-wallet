import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import messaging from '@react-native-firebase/messaging';
import { useEffect } from "react"
import { Platform } from "react-native"
import { requestUserPermissionIOS, requestPermissionAndroid } from "../util/notification";
import { useNavigation } from "@react-navigation/native";
import { useWallet } from "./useWallet";
import { fetchAllNoti } from "../service/notifications";
import { useNetwork } from "./useNetwork";

export interface Notifications {
  title: string;
  description: string;
  notificationData: Record<string, any>;
  type: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const useNotifications = () => {
  const {networkConfig} = useNetwork()
  const {wallet, getAuthObj} = useWallet()
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

  const {data: notifications, fetchNextPage, isFetching} = useInfiniteQuery({
    queryKey: ['notification', wallet.address],
    queryFn: async ({pageParam = 1}): Promise<Notifications[]> => {
      if (!networkConfig) return []
      const authHeaders = await getAuthObj()
      const rs = await fetchAllNoti(
        networkConfig?.api_endpoint,
        {
          page: pageParam,
          limit: 10,
          authObj: authHeaders
        }
      )
      return rs.data.map((i: Record<string, any>) => {
        console.log(i)
        i.createdAt = new Date(i.createdAt)
        i.updatedAt = new Date(i.updatedAt)
        return i
      }) || []
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPageParam = lastPage.length === 0 ? undefined : pages.length + 1
      return nextPageParam
    },
  })

  return {
    notifications,
    fetchNextPage,
    isFetching
  }
}