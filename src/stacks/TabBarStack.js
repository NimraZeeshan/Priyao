import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Messages,
  Home,
  Bookings,
  Notification,
  Settings,
  ProfileScreen,
  ChangePasswordScreen,
  PrivacyPolicyScreen,
} from "../screens";
import { Images, Metrix, NavigationService } from "../config";

const Tab = createBottomTabNavigator();

export const TabBarStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderWidth: 1,
          borderColor: "#ffffff00",
          height:
            Platform.OS == "android"
              ? Metrix.VerticalSize(60)
              : Metrix.VerticalSize(73),
          paddingVertical:
            Platform.OS == "android"
              ? Metrix.VerticalSize(0)
              : Metrix.VerticalSize(10),
          backgroundColor: "#ffffff",
          ...Metrix.createShadow,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  //   borderWidth: 1,
                  //   borderColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={focused ? Images.HomeActive : Images.HomeInActive}
                  resizeMode="contain"
                  style={{
                    width: Metrix.HorizontalSize(20),
                    height: Metrix.VerticalSize(20),
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={Bookings}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  //   borderWidth: 1,
                  //   borderColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={
                    focused ? Images.BrowserActive : Images.BrowserInActive
                  }
                  resizeMode="contain"
                  style={{
                    width: Metrix.HorizontalSize(20),
                    height: Metrix.VerticalSize(20),
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  //   borderWidth: 1,
                  //   borderColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={
                    focused ? Images.CommentActive : Images.CommentInActive
                  }
                  resizeMode="contain"
                  style={{
                    width: Metrix.HorizontalSize(20),
                    height: Metrix.VerticalSize(20),
                  }}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  //   borderWidth: 1,
                  //   borderColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={
                    focused
                      ? Images.NotificationActive
                      : Images.NotificationInActive
                  }
                  resizeMode="contain"
                  style={{
                    width: Metrix.HorizontalSize(20),
                    height: Metrix.VerticalSize(20),
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  //   borderWidth: 1,
                  //   borderColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={
                    focused ? Images.SettingActive : Images.SettingInActive
                  }
                  resizeMode="contain"
                  style={{
                    width: Metrix.HorizontalSize(20),
                    height: Metrix.VerticalSize(20),
                  }}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});
