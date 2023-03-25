import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { Metrix, Images } from "../../config";

export const AuthContainer = ({
  children,
  customeStyle,
  hidden = false,
  mainContainerStyle,
  barStyle = "dark-content",
  barBg = "#ffffff",
}) => {
  return (
    <>
      <ImageBackground
        source={Images.AuthBg}
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          padding: 0,
        }}
      />
      <SafeAreaView style={[{ flex: 1 }, mainContainerStyle]}>
        <StatusBar
          hidden={hidden}
          barStyle={barStyle}
          backgroundColor={barBg}
        />

        <View style={[styles.container, customeStyle]}>{children}</View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Metrix.HorizontalSize(30),
    paddingVertical: Metrix.VerticalSize(20),
    // borderWidth: 1,
    // backgroundColor: 'white',
  },
});
