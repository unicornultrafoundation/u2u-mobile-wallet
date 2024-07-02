import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import messaging from '@react-native-firebase/messaging';
import { useEffect } from "react"
import { Platform } from "react-native"
import { requestUserPermissionIOS, requestPermissionAndroid } from "../util/notification";
import { useNavigation } from "@react-navigation/native";
import { useWallet } from "./useWallet";
import { fetchAllNoti, markAllNotiRead } from "../service/notifications";
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

export const useNotifications = (status = 'all') => {
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

  const {data: notifications, fetchNextPage, isFetching, refetch} = useInfiniteQuery({
    queryKey: ['notification', wallet.address, networkConfig?.api_endpoint, status],
    queryFn: async ({pageParam = 1}): Promise<Notifications[]> => {
      if (!networkConfig) return []
      const authHeaders = await getAuthObj()
      const rs = await fetchAllNoti(
        networkConfig?.api_endpoint,
        {
          page: pageParam,
          limit: 10,
          authObj: authHeaders,
          status
        }
      )
      return rs.data.map((i: Record<string, any>) => {
        i.createdAt = new Date(i.createdAt)
        i.updatedAt = new Date(i.updatedAt)
        return i
      }) || []
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPageParam = lastPage.length === 0 ? undefined : pages.length + 1
      return nextPageParam
    },
    refetchInterval: 5000
  })

  const {data: countUnread} = useQuery({
    queryKey: ['count-unread', wallet.address, networkConfig?.api_endpoint],
    queryFn: async () => {
      if (!networkConfig) return 0
      const authHeaders = await getAuthObj()
      const rs = await fetchAllNoti(
        networkConfig?.api_endpoint,
        {
          page: 1,
          limit: 10,
          authObj: authHeaders,
          status: 'unread'
        }
      )
      return rs.count
    },
    refetchInterval: 60000,
    refetchOnWindowFocus: true
  })

  const {mutateAsync} = useMutation({
    mutationKey: ['mark-noti-read', wallet.address, networkConfig?.api_endpoint],
    mutationFn: async () => {
      if (!networkConfig) return
      const authHeaders = await getAuthObj()
      return markAllNotiRead(networkConfig.api_endpoint, authHeaders)
    }
  })

  return {
    notifications,
    fetchNextPage,
    isFetching,
    countUnread,
    refetchNoti: refetch,
    markAsRead: mutateAsync
  }
}