import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BackHeader } from "../BackHeader";
import { CustomText } from "..";
import { Metrix } from "../../config";
import { Images } from "../../config";

export const AuthHeader = ({
  heading = "",
  paragraph = "",
  arrow,
  numberOfLines,
  customStyleAuthHeader,
}) => {
  return (
    <View style={customStyleAuthHeader}>
      {arrow && <BackHeader backArrow={arrow} />}
      <CustomText.LargeBoldText
        customStyle={{
          marginBottom: Metrix.VerticalSize(10),
          width: "90%",
        }}
        numberOfLines={numberOfLines}
      >
        {heading}
      </CustomText.LargeBoldText>
      {/* <CustomText.RegularGreyText
        customStyle={{ marginBottom: Metrix.VerticalSize(30) }}
      >
        {paragraph}
      </CustomText.RegularGreyText> */}
    </View>
  );
};

const styles = StyleSheet.create({});
