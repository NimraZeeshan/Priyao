import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { CustomText } from "../../components";
import { Colors, Metrix, Images, Fonts, FontType } from "../../config";
import { FadeImage } from "../FadeImage";
import moment from "moment";

export const ReviewCard = ({ data }) => {
  return (
    <View style={[styles.mainContainer, styles.elevation, styles.shadow]}>
      <View style={styles.ImageContainer}>
        <FadeImage
          uri={data?.image}
          style={styles.imageStyles}
          resizeMode="contain"
        />
      </View>
      <View style={styles.detailConatiner}>
        <CustomText.MediumBlackText
          customStyle={{
            fontFamily: Fonts["Semi-Bold"],
            fontSize: Metrix.customFontSize(14),
          }}
        >
          {data?.name}
        </CustomText.MediumBlackText>
        <View style={{ marginTop: 4 }}>
          {data?.rating == 5 ? (
            <View style={styles.starsContainer}>
              <Image
                source={Images.StarIcon}
                style={{
                  height: 10,
                  width: 10,
                  marginRight: Metrix.HorizontalSize(2),
                }}
              />
              <Image
                source={Images.StarIcon}
                style={{
                  height: 10,
                  width: 10,
                  marginRight: Metrix.HorizontalSize(2),
                }}
              />
              <Image
                source={Images.StarIcon}
                style={{
                  height: 10,
                  width: 10,
                  marginRight: Metrix.HorizontalSize(2),
                }}
              />
              <Image
                source={Images.StarIcon}
                style={{
                  height: 10,
                  width: 10,
                  marginRight: Metrix.HorizontalSize(2),
                }}
              />
              <Image
                source={Images.StarIcon}
                style={{
                  height: 10,
                  width: 10,
                  marginRight: Metrix.HorizontalSize(2),
                }}
              />
            </View>
          ) : data?.rating == 4 ? (
            <View style={styles.starsContainer}>
              <Image
                source={Images.StarIcon}
                style={{
                  height: 10,
                  width: 10,
                  marginRight: Metrix.HorizontalSize(2),
                }}
              />
              <Image
                source={Images.StarIcon}
                style={{
                  height: 10,
                  width: 10,
                  marginRight: Metrix.HorizontalSize(2),
                }}
              />
              <Image
                source={Images.StarIcon}
                style={{
                  height: 10,
                  width: 10,
                  marginRight: Metrix.HorizontalSize(2),
                }}
              />
              <Image
                source={Images.StarIcon}
                style={{
                  height: 10,
                  width: 10,
                  marginRight: Metrix.HorizontalSize(2),
                }}
              />
            </View>
          ) : data?.rating == 3 ? (
            <View style={styles.starsContainer}>
              <Image
                source={Images.StarIcon}
                style={{
                  height: 10,
                  width: 10,
                  marginRight: Metrix.HorizontalSize(2),
                }}
              />
              <Image
                source={Images.StarIcon}
                style={{
                  height: 10,
                  width: 10,
                  marginRight: Metrix.HorizontalSize(2),
                }}
              />
              <Image
                source={Images.StarIcon}
                style={{
                  height: 10,
                  width: 10,
                  marginRight: Metrix.HorizontalSize(2),
                }}
              />
            </View>
          ) : data?.rating == 2 ? (
            <View style={styles.starsContainer}>
              <Image
                source={Images.StarIcon}
                style={{
                  height: 10,
                  width: 10,
                  marginRight: Metrix.HorizontalSize(2),
                }}
              />
              <Image
                source={Images.StarIcon}
                style={{
                  height: 10,
                  width: 10,
                  marginRight: Metrix.HorizontalSize(2),
                }}
              />
            </View>
          ) : (
            <View style={styles.starsContainer}>
              <Image
                source={Images.StarIcon}
                style={{
                  height: 10,
                  width: 10,
                  marginRight: Metrix.HorizontalSize(2),
                }}
              />
            </View>
          )}
        </View>
        <CustomText.MediumGreyText
          customStyle={{
            fontSize: Metrix.customFontSize(12),
            marginTop: 4,
          }}
        >
          {data?.review}
        </CustomText.MediumGreyText>
      </View>
      <View style={styles.timeContainer}>
        <CustomText.SmallGreyText
          customStyle={{
            fontSize: Metrix.customFontSize(12),
            // color: "#BDBDBD",
          }}
        >
          {moment(data?.time).fromNow() > "5 days ago"
            ? moment(data?.time).format("D MMM, YYYY")
            : moment(data?.time).fromNow()}
          {/* {data?.time} */}
        </CustomText.SmallGreyText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFF",
    width: "95%",
    height: Metrix.VerticalSize(65),
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: Metrix.VerticalSize(10),
  },
  ImageContainer: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyles: {
    height: 40,
    width: 40,
  },
  detailConatiner: {
    width: "55%",
    paddingLeft: Metrix.HorizontalSize(10),
    // height:"80%",
    // borderWidth:1
  },
  titlevendorContainer: {
    height: "75%",
    justifyContent: "space-around",
  },
  rateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  elevation: {
    elevation: 20,
    shadowColor: Colors.Theme,
    shadowRadius: 20,
  },
  shadow: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: Colors.Theme,
    shadowOpacity: 0.1,
    elevation: 5,
    // background color must be set
    // backgroundColor : "#0000" // invisible color
  },

  starsContainer: {
    flexDirection: "row",
  },
  timeContainer: {},
});
