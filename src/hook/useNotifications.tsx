import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { Platform } from "react-native"
import { requestUserPermissionIOS, requestPermissionAndroid } from "../util/notification";
import { useNavigation } from "@react-navigation/native";
import { useWallet } from "./useWallet";
import { fetchAllNoti, markAllNotiRead, markNotiRead } from "../service/notifications";
import { useNetwork } from "./useNetwork";
import * as ExpoNotifications from 'expo-notifications';
import { onMessageReceivedNotifee } from "../util/notifee";

ExpoNotifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

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

  function handleNotificationNavigation(data: any) {
    const navigationId = data?.navigationId;
    if (navigationId === 'discover') {
      const newsId = data?.newsId;
      if (newsId) {
        navigation.navigate('DiscoverStack', {screen: 'NewsDetails', params: {id: newsId}});
      } else {
        navigation.navigate('DiscoverStack', {screen: 'Home'});
      }
    }
    if (navigationId === 'external-sign') {
      const signRequestId = data?.signRequestId;
      if (signRequestId) {
        navigation.navigate('WalletStack', {
          screen: 'SignExternalRequest',
          params: {signRequestID: signRequestId}
        });
      }
    }
    if (navigationId === 'ecosystem') {
      const url = data?.url;
      if (url) {
        navigation.navigate('EcosystemStack', {screen: 'DAppWebView', params: {url}});
      }
    }
    if (navigationId === 'chat-detail') {
      const conversationID = data?.conversationID;
      if (conversationID) {
        navigation.navigate('WalletStack', {screen: 'ChatDetail', params: {conversationID}});
      }
    }
  }

  useEffect(() => {
    if (Platform.OS === 'ios') requestUserPermissionIOS()
    else requestPermissionAndroid()

    const receivedSub = ExpoNotifications.addNotificationReceivedListener(onMessageReceivedNotifee);
    return () => receivedSub.remove();
  }, [])

  // Subscribe to notification response events (taps, etc.)
  useEffect(() => {
    const responseSub = ExpoNotifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      handleNotificationNavigation(data);
    });
    return () => responseSub.remove();
  }, []);

  // Handle initial notification if app was opened from quit state
  useEffect(() => {
    async function bootstrap() {
      const response = await ExpoNotifications.getLastNotificationResponseAsync();
      if (response) {
        const data = response.notification.request.content.data;
        handleNotificationNavigation(data);
      }
    }
    bootstrap();
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
    initialPageParam: 1,
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