import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { Colors, Images, Metrix } from "../../config";
import { FadeImage } from "../FadeImage";
import { CustomText } from "..";

export const HorizontalImageList = ({
  imageData = [],
  customStyles,
  customImageStyle,
  customListStyle,
  selected,
}) => {
  const renderItem = ({ item, index }) => {
    console.log("index--item", index);
    console.log("selected--item", selected);
    return (
      <View
        style={[
          {
            // borderWidth: 2,
            width: Metrix.HorizontalSize(60),
            height: Metrix.VerticalSize(60),
            marginHorizontal: Metrix.VerticalSize(5),
          },
          customImageStyle,
        ]}
      >
        <FadeImage
          uri={item?.image}
          resizeMode="cover"
          imageStyle={{
            borderRadius: Metrix.VerticalSize(10),
            borderWidth: index == selected ? 1 : 0,
            borderColor: index == selected ? Colors.Primary : "#ffffff00",
          }}
        />
      </View>
    );
  };

  const emptyComponent = () => {
    return (
      <View>
        <CustomText.MediumGreyText>No Images Yet !</CustomText.MediumGreyText>
      </View>
    );
  };

  return (
    <View style={[{ flex: 1 }, customStyles]}>
      <FlatList
        data={imageData}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id}
        horizontal
        ListEmptyComponent={emptyComponent}
        style={customListStyle}
        contentContainerStyle={{
          paddingVertical: Metrix.HorizontalSize(10),
          // justifyContent:'center',
          // borderWidth:1
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
