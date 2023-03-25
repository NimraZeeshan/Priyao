import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {AuthStack} from './AuthStack';
import {HomeStack} from './HomeStack';

import {useDispatch, useSelector} from 'react-redux';
import { SetYourLocation } from '../screens';

export const MainStack = () => {
  const MainStack = createStackNavigator();
  const authorize = useSelector(state => state?.user?.authorize);
  console.log('auth=====', authorize);
  const AuthScreens = AuthStack.map(stack => <MainStack.Screen {...stack} />);
  // const HomeScreens = HomeStack.map((stack) => <MainStack.Screen {...stack} />);

  return (
    <>
      <MainStack.Navigator
        //initialRouteName={'RideScreen'}
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        {authorize ? HomeScreens : AuthScreens}
      </MainStack.Navigator>
    </>
  );
};
