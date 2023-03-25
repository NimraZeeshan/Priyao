import React, { useState } from "react";
import FadeIn from "react-native-fade-in-image";
import {
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Colors } from "../../config";

const full = { width: "100%", height: "100%" };

const landing = { flex: 1, alignItems: "center", justifyContent: "center" };
const Placeholder = () => (
  <View style={landing}>
    <ActivityIndicator
      color={Colors.Theme}
      style={styles.RenderItemImage}
      // style={{ position: "absolute", zIndex: 1 }}
    />
  </View>
);

export const FadeImage = ({
  uri,
  style,
  resizeMode = "contain",
  imageStyle,
  defaultSource,
}) => (
  <FadeIn
    style={style}
    renderPlaceholderContent={Platform.OS == "ios" && <Placeholder />}
    placeholderStyle={{ backgroundColor: "#FFFFFF" }}
  >
    <Image
      source={uri}
      style={[full, imageStyle]}
      resizeMode={resizeMode}
      defaultSource={defaultSource}
    />
  </FadeIn>
);

const styles = StyleSheet.create({
  RenderItemImage: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    position: "absolute",
    // borderWidth: 1,
  },
  RenderImage: {
    // borderWidth:1,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
});
