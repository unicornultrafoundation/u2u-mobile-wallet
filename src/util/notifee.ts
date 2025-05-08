import notifee from '@notifee/react-native';
import * as Notifications from 'expo-notifications';

export async function cancel(notificationId: string) {
  await notifee.cancelNotification(notificationId);
}

export async function onMessageReceivedNotifee(message: any) {
  console.log('A new FCM message arrived!', JSON.stringify(message));

  // const channelId = await notifee.createChannel({
  //   id: 'default',
  //   name: 'Default Channel',
  // });
  // notifee.displayNotification({
  //   title: message.notification.title,
  //   body: message.notification.body,
  //   android: {
  //     channelId: channelId,
  //   },
  //   data: message.data
  // });

  Notifications.scheduleNotificationAsync({
    content: {
      title: message.notification.title,
      body: message.notification.body,
      data: message.data
    },
    trigger: null,
  });
}