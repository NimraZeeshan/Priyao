import React, { useState } from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Colors, Images, Metrix } from "../../config";
import { FadeImage } from "../FadeImage";
export const RoundImageContainer = ({
  image,
  circleWidth = 100,
  backgroundColor = "white",
  borderRadius = null,
  borderColor = "white",
  borderWidth = 0,
  styles = {},
  customContainerStyle = {},
  customImageStyles,
  imageStyle,
  defaultSource,
  isEdit = false,
}) => {
  const [imageLoading, setImageLoading] = useState(false);
  return (
    <View
      style={[
        { alignItems: "center", position: "relative" },
        customContainerStyle,
      ]}
    >
      <View
        style={{
          width: Metrix.HorizontalSize(circleWidth),
          backgroundColor: backgroundColor,
          height: Metrix.HorizontalSize(circleWidth),
          borderRadius: borderRadius
            ? Metrix.HorizontalSize(borderRadius)
            : Metrix.HorizontalSize(circleWidth / 2),
          borderColor: borderColor,
          // borderColor: "red",
          borderWidth: borderWidth,
          // borderWidth: 1,
          overflow: "hidden",
          ...styles,
        }}
      >
        <FadeImage
          uri={image}
          style={[{ width: "100%", height: "100%" }, customImageStyles]}
          resizeMode={"contain"}
          imageStyle={imageStyle}
          defaultSource={defaultSource}
        />
      </View>
      {isEdit && (
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 8,
            right: 0,
            width: Metrix.VerticalSize(25),
            height: Metrix.VerticalSize(25),
            backgroundColor: "#ffffff",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: Metrix.HorizontalSize(circleWidth / 2),
          }}
        >
          <Image
            source={Images.Pencil}
            style={{
              tintColor: Colors.Primary,
              width: "60%",
              height: "60%",
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
