import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import messaging from '@react-native-firebase/messaging';
import { useEffect } from "react"
import { Platform } from "react-native"
import { requestUserPermissionIOS, requestPermissionAndroid } from "../util/notification";
import { useNavigation } from "@react-navigation/native";
import { useWallet } from "./useWallet";
import { fetchAllNoti, markAllNotiRead, markNotiRead } from "../service/notifications";
import { useNetwork } from "./useNetwork";
import notifee, { EventType } from '@notifee/react-native';
import { onMessageReceivedNotifee } from "../util/notifee";

export interface Notifications {
  id: string;
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

    const unsubscribe = messaging().onMessage(onMessageReceivedNotifee);

    return unsubscribe;
  }, [])

  // Subscribe to events notifee
  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('in here')
          const data = detail.notification?.data
          console.log('noti data', data)
          const navigationId = data?.navigationId;
          
          if (navigationId === 'discover') {
            const newsId = data?.newsId
            if (newsId) {
              navigation.navigate('DiscoverStack', {screen: 'NewsDetails', params: {id: newsId}})
            } else {
              navigation.navigate('DiscoverStack', {screen: 'Home'})
            }
          }

          if (navigationId === 'external-sign') {
            const signRequestId = data?.signRequestId
            if (signRequestId) {
              navigation.navigate(
                'WalletStack', 
                {
                  screen: 'SignExternalRequest',
                  params: {
                    signRequestID: signRequestId
                  }
                }
              )
            }
          }

          if (navigationId === 'ecosystem') {
            const url = data?.url;
            if (url) {
              navigation.navigate('EcosystemStack', {screen: 'DAppWebView', params: {url: url}})
            }
          }

          if (navigationId === 'chat-detail') {
            const conversationID = data?.conversationID;
            if (conversationID) {
              navigation.navigate('WalletStack', {screen: 'ChatDetail', params: {conversationID: conversationID}})
            }
          }
          break;
      }
    });
  }, []);

  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log('Notification caused application to open', initialNotification.notification);
      console.log('Press action used to open the app', initialNotification.pressAction);
    }
  }

  useEffect(() => {
    bootstrap()
  }, []);

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

  const {mutateAsync: mutateReadSingle} = useMutation({
    mutationKey: ['mark-single-noti-read', wallet.address, networkConfig?.api_endpoint],
    mutationFn: async (notiID: string) => {
      if (!networkConfig) return
      const authHeaders = await getAuthObj()
      return markNotiRead(networkConfig.api_endpoint, authHeaders, notiID)
    }
  })

  return {
    notifications,
    fetchNextPage,
    isFetching,
    countUnread,
    refetchNoti: refetch,
    markAsRead: mutateAsync,
    markSingleRead: mutateReadSingle
  }
}