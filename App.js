/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'
import {Alert, LogBox} from 'react-native';
//import SplashScreen from 'react-native-splash-screen';
import {NativeBaseProvider} from 'native-base';
import {MainStack} from './src/stacks/MainStack';
import {NavigationService} from './src/config';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import {AddtowalletScreen} from './src/screens/AddtowalletScreen';
import { Notifications } from './src/Notifications.android';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import navigationService from './src/config/navigationService';



messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const App = () => {

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken')
  console.log(fcmToken, "old token")
  if(!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if(fcmToken) {
        console.log(fcmToken, "new generated token");
        await AsyncStorage.setItem('fcmToken', fcmToken)
      } 
    } catch(error) {
        console.log("error raised in fcmToken")
    }
  }
}
getFcmToken();


  useEffect(() => {
    //requestUserPermission()
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp', JSON.stringify(remoteMessage));
    });

    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          JSON.stringify(remoteMessage),
        );
      }
    });
  }, []);


  useEffect(() => {
    const unsubcribe = messaging().onMessage((remoteMessage) => {
      console.log("handel in foreground >>>>>>>>>>> ", remoteMessage.notification.title)
      if(remoteMessage.notification.title === "NEW RIDE AVAILABLE"){
        
        navigationService.navigate('SoloRidesScreensTwo',{'remoteData': remoteMessage.data});
      }
      //const {notification, messageId} = remoteMessage;

      //   PushNotification.localNotification({
      //    channelId: "your-channel-id",
      //    id: messageId,
      //    body: notification.body,
      //    title: "android notification title",
      //    vibrate: true,
      //  });
      
    })
    return unsubcribe
  }, []);


  function CustomDrawerContent(props) {
    const progress = useDrawerProgress();

    const translateX = Animated.interpolateNode(progress, {
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });

    return (
      <DrawerContentScrollView {...props}>
        <Animated.View style={{transform: [{translateX}]}}>
          <DrawerItemList {...props} />
        </Animated.View>
      </DrawerContentScrollView>
    );
  }

  const Drawer = createDrawerNavigator();

  function MyDrawer() {
    return (
      <Drawer.Navigator
        useLegacyImplementation
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="AddtowalletScreen" component={AddtowalletScreen} />
        {/* {/* <Drawer.Screen name="Article" component={Article} /> */}
      </Drawer.Navigator>
    );
  }

  const ignoreWarns = [
    'Setting a timer for a long period of time',
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
    'ViewPropTypes will be removed',
    'AsyncStorage has been extracted from react-native',
    'EventEmitter.removeListener',
  ];
  const warn = console.warn;
  console.warn = (...arg) => {
    for (let i = 0; i < ignoreWarns.length; i++) {
      if (arg[0].startsWith(ignoreWarns[i])) return;
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer
        ref={ref => NavigationService.setTopLevelNavigator(ref)}
        theme={{colors: {background: '#ffffff'}}}>
        <MainStack />
        <Notifications />
        {/* <MyDrawer /> */}
      </NavigationContainer>
      {/* <NavigationContainer independent={true}>
        <MyDrawer />
      </NavigationContainer> */}
    </NativeBaseProvider>
  );
};

export default App;
