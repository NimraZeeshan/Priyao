import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  MainContainer,
  AuthHeader,
  CustomText,
  MessageCard,
  BookingCard,
  RoundImageContainer,
  SearchBar,
} from "../../components";
import {
  Colors,
  Metrix,
  Images,
  Fonts,
  FontType,
  NavigationService,
} from "../../config";
import { FadeImage } from "../FadeImage";
export const ServiceCard = ({
  image,
  title,
  vendorName,
  rate,
  bookService,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.mainContainer, styles.elevation, styles.shadow]}
      onPress={onPress}
    >
      <View style={styles.ImageContainer}>
        <FadeImage
          uri={image}
          style={styles.imageStyles}
          resizeMode="contain"
        />
      </View>
      <View style={styles.detailConatiner}>
        <View style={styles.titlevendorContainer}>
          <CustomText.MediumBlackText
            customStyle={{ fontFamily: Fonts["Semi-Bold"] }}
          >
            {title}
          </CustomText.MediumBlackText>
          {vendorName && (
            <CustomText.SmallBlackText
              customStyle={{
                fontSize: FontType.FontExtraSmall,
                color: Colors.Theme,
              }}
            >
              {vendorName}
            </CustomText.SmallBlackText>
          )}
          {bookService && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",

                width: "53%",
              }}
            >
              <CustomText.SmallBlackText
                customStyle={{ color: "#0D8056", fontWeight: "500" }}
              >
                Book Service
              </CustomText.SmallBlackText>
              <Image
                source={Images.ArrowIcon}
                style={{ height: 13, width: 20 }}
              />
            </View>
          )}
        </View>
        <View style={styles.rateContainer}>
          <CustomText.MediumBlackText>$</CustomText.MediumBlackText>
          <CustomText.LargeSemiBoldText>{rate}</CustomText.LargeSemiBoldText>
          <CustomText.MediumBlackText>/hr</CustomText.MediumBlackText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFF",
    width: "100%",
    height: Metrix.VerticalSize(170),
    borderRadius: 15,
  },
  ImageContainer: {
    width: "100%",
    height: "70%",
  },
  imageStyles: {
    height: "100%",
    width: "100%",
  },
  detailConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Metrix.HorizontalSize(10),
    alignItems: "center",
    height: "30%",
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
});
