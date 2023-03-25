import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { Menu, MenuItem, Position } from "react-native-enhanced-popup-menu";
import { Images, Metrix } from "../../config";
import { CustomText } from "..";

export const DropdownMenu = (props) => {
  const {
    items,
    selected,
    myFunc,
    heading,
    customContainerStyles,
    customMainContainerStyle,
    customTextStyle,
    customInnerContainerStyle,
    customMenuStyles,
    arrow = Images.ArrowDown,
  } = props;
  const [textRef] = useState(React.createRef());
  let menuRef: Menu | null = null;
  const setMenuRef = (ref) => (menuRef = ref);
  return (
    <View
      style={[
        {
          marginBottom: Metrix.VerticalSize(30),
        },
        customMainContainerStyle,
      ]}
    >
      {heading && (
        <CustomText.SmallBlackText
          customStyle={{
            // borderWidth: 1,
            marginBottom: Metrix.VerticalSize(10),
          }}
        >
          {heading}
        </CustomText.SmallBlackText>
      )}
      <View style={[styles.container, customContainerStyles]}>
        <TouchableOpacity
          onPress={() => {
            menuRef.show(textRef.current, Position.BOTTOM_LEFT);
          }}
          ref={textRef}
          style={[
            {
              // borderWidth: 1,
              flex: 1,
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            },
            customInnerContainerStyle,
          ]}
        >
          <CustomText.SmallGreyText customStyle={[customTextStyle]}>
            {selected}
          </CustomText.SmallGreyText>

          <Image
            source={arrow}
            resizeMode="contain"
            style={{
              width: Metrix.HorizontalSize(10),
              height: Metrix.VerticalSize(10),
              //   borderWidth: 1,
              // borderColor: 'green',
              // height:"100%"
            }}
          />
        </TouchableOpacity>
        <Menu
          ref={setMenuRef}
          style={[
            {
              //   width: Metrix.HorizontalSize(130),
              // borderWidth:1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              padding: Metrix.HorizontalSize(4),
              height: Metrix.VerticalSize(120),
              // borderColor:'blue'
              //   width:'100%'
            },
            customMenuStyles,
          ]}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={items}
            // style={{borderWidth: 1,borderColor:'orange'}}
            renderItem={({ item, index }) => {
              // console.log("item", item);
              return (
                <MenuItem
                  key={index}
                  style={{
                    alignItems: "flex-start",
                    width: "100%",
                    height: Metrix.VerticalSize(40),
                    //   marginTop: Metrix.VerticalSize(-2),
                    justifyContent: "center",
                    // borderWidth: 1,
                    // borderColor: 'red',
                    paddingLeft: Metrix.HorizontalSize(10),
                  }}
                  onPress={() => {
                    menuRef.hide();
                    myFunc(item.title, item.title);
                  }}
                >
                  <View
                    style={{
                      height: Metrix.VerticalSize(45),
                      justifyContent: "center",
                      alignSelf: "center",
                      alignItems: "center",
                      // borderWidth:1,
                      width: "100%",
                    }}
                  >
                    <CustomText.SmallGreyText>
                      {item.title}
                    </CustomText.SmallGreyText>
                  </View>
                </MenuItem>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: Metrix.VerticalSize(10),
    paddingLeft: Metrix.HorizontalSize(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#6F747D4D",
    borderRadius: Metrix.VerticalSize(10),
    width: "100%",
    height: Metrix.VerticalSize(45),
  },
});
