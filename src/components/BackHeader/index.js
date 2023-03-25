import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { Images, Metrix, NavigationService } from "../../config";
import { CustomText } from "..";

export const BackHeader = ({
  heading = "",
  customeStyle,
  btnImage = Images.BackBtn,
  backArrow = true,
}) => {
  return (
    <View
      style={[
        {
          // borderWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          //   height:Metrix.VerticalSize(100)
          paddingTop: Metrix.VerticalSize(10),
          paddingBottom: Metrix.VerticalSize(20),
        },
        customeStyle,
      ]}
    >
      {backArrow ? (
        <TouchableOpacity
          style={{ width: "25%" }}
          onPress={() => {
            NavigationService.goBack();
            StatusBar.setBarStyle("dark-content");
          }}
        >
          <Image
            source={btnImage}
            resizeMode={"contain"}
            style={{
              width: Metrix.HorizontalSize(30),
              height: Metrix.VerticalSize(30),
              marginLeft: Metrix.HorizontalSize(-10),
              // borderWidth: 1,
            }}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ width: "25%" }} />
      )}
      <View style={{ width: "50%", alignItems: "center" }}>
        <CustomText.MediumBoldBlackText>
          {heading}
        </CustomText.MediumBoldBlackText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
