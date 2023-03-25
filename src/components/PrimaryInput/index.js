import { Icon } from "native-base";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Metrix, Images } from "../../config";
import { CustomText } from "..";
//import AntDesign from 'react-native-vector-icons/Entypo';

export const PrimaryInput = ({
  onChangeText,
  value,
  placeholder = "",
  keyboardType = "default",
  onSubmitEditing,
  returnKeyType,
  autoCapitalize,
  customStyle,
  secureTextEntry,
  onEyePress,
  hidepswdState,
  eye,
  inputRef,
  styleContainer,
  multiline = false,
  placeholderTextColor = Colors.PrimaryTextColor,
  textAlignVertical = "center",
  isIcon,
  iconImage,
  onBtnPress,
  heading = "",
  maxLength = 10000,
  editable,
  isVerified,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  // console.log("----", placeholder, isFocused);
  return (
    <>
      <CustomText.SmallGreyText
        customStyle={{
          marginBottom: Metrix.VerticalSize(15),
          marginTop: Metrix.VerticalSize(0),
        }}
      >
        {heading}
      </CustomText.SmallGreyText>
      <View
        style={[
          styles.textContainer,
          {
            borderColor: isFocused ? Colors.Primary : "#0D805625",
          },
          styleContainer,
        ]}
      >
        <TextInput
          // keyboardAppearance={'dark'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor={Colors.Primary}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          style={[styles.textInput, customStyle]}
          secureTextEntry={secureTextEntry}
          ref={inputRef}
          multiline={multiline}
          placeholderTextColor={placeholderTextColor}
          textAlignVertical={textAlignVertical}
          maxLength={maxLength}
          {...props}
          editable={editable}
        />

        {eye ? (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.eyeStyle}
            onPress={onEyePress}
          >
            {hidepswdState ? (
              <Image
                source={Images.EyeDisableIcon}
                style={{
                  width: "45%",
                  height: "45%",
                  tintColor: Colors.PrimaryTextColor,
                }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={Images.EyeAbleIcon}
                style={{
                  width: "45%",
                  height: "45%",
                  tintColor: Colors.Primary,
                }}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {isIcon ? (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.eyeStyle}
            onPress={onBtnPress}
          >
            <Image
              source={iconImage}
              style={{
                width: "40%",
                height: "60%",
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {isVerified && (
          <View
            // activeOpacity={0.6}
            style={styles.eyeStyle}
            // onPress={onBtnPress}
          >
            <Image
              source={iconImage}
              style={{
                width: "40%",
                height: "60%",
              }}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputHeading: {},
  textContainer: {
    borderWidth: 1,
    borderRadius: Metrix.VerticalSize(10),
    // borderColor: Colors.WhiteTwentyOpacity,
    height: Metrix.VerticalSize(45),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Metrix.VerticalSize(10),
    // alignItems:'center'
    // paddingHorizontal: Metrix.HorizontalSize(0),
    // marginHorizontal: Metrix.HorizontalSize(0),
  },
  textInput: {
    // borderColor: "red",
    // borderWidth: 1,
    color: Colors.PrimaryTextColor,
    fontSize: Metrix.customFontSize(14),
    paddingLeft: Metrix.HorizontalSize(20),
    fontFamily: Fonts["Regular"],
    // paddingHorizontal: Metrix.HorizontalSize(0),
    // marginHorizontal: Metrix.HorizontalSize(0),
    // borderWidth: 1,
    // borderColor: Colors.SecondaryTextColor,
    height: "100%",
    width: "87%",
  },
  eyeStyle: {
    // borderWidth: 1,
    // borderColor: "orange",
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
