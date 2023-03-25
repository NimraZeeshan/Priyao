import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Metrix, Images, Colors, Fonts } from "../../config";
import { CustomText } from "..";
import moment from "moment";
import { FadeImage } from "../FadeImage";
export const MessageCard = ({
  date,
  message,
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
            width: "71%",
          }}
        >
          <View style={styles.nameDateContainer}>
            <CustomText.MediumBlackText
              customStyle={{
                fontWeight: "700",
              }}
            >
              {name}
            </CustomText.MediumBlackText>
            <CustomText.MediumGreyText
              customStyle={{
                fontSize: Metrix.customFontSize(10),
                color: "#E50914",
              }}
            >
              {moment(date).fromNow() > "5 days ago"
                ? moment(date).format("D MMM, YYYY")
                : moment(date).fromNow()}
            </CustomText.MediumGreyText>
          </View>

          <View style={styles.textContainer}>
            <CustomText.SmallGreyText ellipsizeMode="tail" numberOfLines={1}>
              {message}
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
    marginTop: Metrix.VerticalSize(20),
    width: "100%",
    height: Metrix.VerticalSize(68),
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
    width: Metrix.HorizontalSize(45),
    height: Metrix.VerticalSize(45),
    marginLeft: Metrix.HorizontalSize(15),
  },
  nameDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    width: "90%",
    marginVertical: Metrix.VerticalSize(3),
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
