import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";
import { Metrix, Images, Colors } from "../../config";
import { FadeImage } from "../FadeImage";
import ProgressBar from "react-native-animated-progress";
export const Rating = ({ stars, progress }) => {
  return (
    <View style={styles.mainContainerStyle}>
      {stars == 5 ? (
        <View style={styles.starsContainer}>
          <Image
            source={Images.StarIcon}
            style={{
              height: 12,
              width: 12,
              marginLeft: Metrix.HorizontalSize(2),
            }}
          />
          <Image
            source={Images.StarIcon}
            style={{
              height: 12,
              width: 12,
              marginLeft: Metrix.HorizontalSize(2),
            }}
          />
          <Image
            source={Images.StarIcon}
            style={{
              height: 12,
              width: 12,
              marginLeft: Metrix.HorizontalSize(2),
            }}
          />
          <Image
            source={Images.StarIcon}
            style={{
              height: 12,
              width: 12,
              marginLeft: Metrix.HorizontalSize(2),
            }}
          />
          <Image
            source={Images.StarIcon}
            style={{
              height: 12,
              width: 12,
              marginLeft: Metrix.HorizontalSize(2),
            }}
          />
        </View>
      ) : stars == 4 ? (
        <View style={styles.starsContainer}>
          <Image
            source={Images.StarIcon}
            style={{
              height: 12,
              width: 12,
              marginLeft: Metrix.HorizontalSize(2),
            }}
          />
          <Image
            source={Images.StarIcon}
            style={{
              height: 12,
              width: 12,
              marginLeft: Metrix.HorizontalSize(2),
            }}
          />
          <Image
            source={Images.StarIcon}
            style={{
              height: 12,
              width: 12,
              marginLeft: Metrix.HorizontalSize(2),
            }}
          />
          <Image
            source={Images.StarIcon}
            style={{
              height: 12,
              width: 12,
              marginLeft: Metrix.HorizontalSize(2),
            }}
          />
        </View>
      ) : stars == 3 ? (
        <View style={styles.starsContainer}>
          <Image
            source={Images.StarIcon}
            style={{
              height: 12,
              width: 12,
              marginLeft: Metrix.HorizontalSize(2),
            }}
          />
          <Image
            source={Images.StarIcon}
            style={{
              height: 12,
              width: 12,
              marginLeft: Metrix.HorizontalSize(2),
            }}
          />
          <Image
            source={Images.StarIcon}
            style={{
              height: 12,
              width: 12,
              marginLeft: Metrix.HorizontalSize(2),
            }}
          />
        </View>
      ) : stars == 2 ? (
        <View style={styles.starsContainer}>
          <Image
            source={Images.StarIcon}
            style={{
              height: 12,
              width: 12,
              marginLeft: Metrix.HorizontalSize(2),
            }}
          />
          <Image
            source={Images.StarIcon}
            style={{
              height: 12,
              width: 12,
              marginLeft: Metrix.HorizontalSize(2),
            }}
          />
        </View>
      ) : (
        <View style={styles.starsContainer}>
          <Image
            source={Images.StarIcon}
            style={{
              height: 12,
              width: 12,
              marginLeft: Metrix.HorizontalSize(2),
            }}
          />
        </View>
      )}
      <View style={styles.progressBar}>
        <ProgressBar
          progress={
            progress == 5
              ? 100
              : progress == 4
              ? 80
              : progress == 3
              ? 60
              : progress == 2
              ? 40
              : progress == 1
              ? 20
              : 0
          }
          height={5}
          backgroundColor={Colors.Theme}
          animated={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainerStyle: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  starsContainer: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: Metrix.VerticalSize(5),
    marginRight: Metrix.HorizontalSize(3),
  },
  progressBar: {
    width: "60%",
    height: "70%",
    alignSelf: "center",
  },
});
