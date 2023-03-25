import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';



export const Notifications = (props) => {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      PushNotification.localNotification({
        channelId: "channel-id", // (required)
        channelName: "My channel",
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        // bigPictureUrl: remoteMessage.notification.android.imageUrl,
        // smallIcon: remoteMessage.notification.android.imageUrl,
      });

    });

    return unsubscribe;

  }, []);

  return null;

};