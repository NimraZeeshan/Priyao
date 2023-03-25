import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Fonts, Metrix, Images } from "../../config";
export const SettingCard = ({ image, name, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.cardContainer, styles.elevation, styles.shadow]}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Image
              source={image}
              resizeMode="contain"
              style={styles.cardImage}
            />
          </View>
          <View style={{ marginLeft: Metrix.HorizontalSize(15) }}>
            <Text style={styles.count}>{name}</Text>
          </View>
        </View>
        <Image source={Images.GreyArrow} style={{ height: 14, width: 14 }} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 30,
    width: "100%",
    height: Metrix.VerticalSize(60),
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    // borderWidth: 1
  },
  elevation: {
    elevation: 6,
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
    width: Metrix.HorizontalSize(20),
    height: Metrix.VerticalSize(20),
    // borderWidth:1,
  },
  count: {
    color: "#0E134F",
    fontFamily: Fonts.Medium,
    fontSize: Metrix.customFontSize(16),
    height: Metrix.VerticalSize(23),
    // borderWidth:1,
  },
});
