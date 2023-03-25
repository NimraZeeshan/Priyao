import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { Metrix, Colors, Fonts, Images } from "../../config";
import { CustomText } from "..";

export const PrimaryButton = ({
  title,
  onPress,
  isLoading,
  disabled,
  width,
  color,
  textColor,
  // width = "100%",
  // color = Colors.Primary,
  // textColor = "#ffffff",
  customStyles,
  borderColor,
  borderWidth,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={[
      styles.buttonContainer,
      {
        backgroundColor: disabled ? "rgba(171, 26, 78, 0.7)" : color,
        width: width,
        borderColor: borderColor,
        borderWidth: borderWidth,
      },
      customStyles,
    ]}
    disabled={disabled || isLoading}
  >
    {isLoading ? (
      <ActivityIndicator color={textColor} />
    ) : (
      <CustomText.SmallBlackText
        customStyle={{ color: textColor, fontWeight: "bold" }}
      >
        {title}
      </CustomText.SmallBlackText>
      // <Text style={{ color: textColor }}>{title}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    height: Metrix.VerticalSize(45),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Metrix.VerticalSize(10),
    // ...Metrix.createShadow(),
  },
  // titleText:{
  //   fontFamily: Fonts['Futura-Medium'],
  //   fontSize: Metrix.customFontSize(16),
  //   color: Colors.Primary,
  // }
});
