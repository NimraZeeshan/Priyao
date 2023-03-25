import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Metrix } from "../../config";

export const MainContainer = ({
  children,
  customeStyle,
  hidden = false,
  mainContainerStyle,
  barStyle = "dark-content",
  barBg = "#ffffff",
}) => {
  return (
    <SafeAreaView style={[{ flex: 1 }, mainContainerStyle]}>
      <StatusBar hidden={hidden} barStyle={barStyle} backgroundColor={barBg} />
      <View style={[styles.container, customeStyle]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Metrix.HorizontalSize(30),
    paddingVertical: Metrix.VerticalSize(5),
    // marginTop: Metrix.VerticalSize(10),
    // borderWidth: 1,
    // backgroundColor: 'white',
  },
});
