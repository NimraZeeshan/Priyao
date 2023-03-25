import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Metrix, Images, Colors } from "../../config";
import { CustomText } from "..";
import { FadeImage } from "../FadeImage";
export const NotificationCard = ({
  date,
  notifcation,
  from,
  dateTime,
  user,
  onPress,
  image,
  name,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{ width: "100%" }}
      onPress={onPress}
    >
      <View style={[styles.cardContainer, styles.elevation, styles.shadow]}>
        <View>
          <FadeImage
            uri={image}
            style={styles.cardImage}
            resizeMode={"contain"}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            marginLeft: Metrix.HorizontalSize(10),
            width: "60%",
          }}
        >
          <CustomText.MediumGreyText
            customStyle={{ fontSize: Metrix.customFontSize(10) }}
          >
            {date}
          </CustomText.MediumGreyText>
          <View style={styles.textContainer}>
            <CustomText.SmallGreyText>
              <CustomText.SmallGreyText customStyle={{ color: Colors.Theme }}>
                {name}
              </CustomText.SmallGreyText>{" "}
              {notifcation}
            </CustomText.SmallGreyText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: Metrix.VerticalSize(15),
    width: Metrix.VerticalSize(300),
    height: Metrix.VerticalSize(80),
    borderRadius: 10,
    // display:"flex",
    flexDirection: "row",
    // justifyContent:"space-between",
    // padding: 3,
    alignItems: "center",
    // borderWidth:1
  },
  elevation: {
    elevation: 4,
    shadowColor: "#42526E",
    shadowRadius: 5,
  },
  shadow: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#42526E",
    shadowOpacity: 0.2,
    elevation: 5,
    // background color must be set
    // backgroundColor : "#0000" // invisible color
  },
  cardImage: {
    width: Metrix.HorizontalSize(60),
    height: Metrix.VerticalSize(60),
    marginLeft: Metrix.HorizontalSize(15),
  },
  count: {
    color: Colors.Theme,
    // fontSize: fontH2V4,
    // fontFamily: fontFamily.Primary.Medium,
  },
  count2: {
    color: Colors.PrimaryTextColor,
    // fontSize: fontH3V3,
    // fontFamily: fontFamily.Primary.Medium,
  },
  CardText: {
    color: Colors.PrimaryTextColor,
    // fontSize: fontH2V4,
    // fontFamily: fontFamily.Primary.Regular,
  },
});
