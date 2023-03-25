import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
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
} from "../../components";
import {
  Colors,
  Metrix,
  Images,
  Fonts,
  FontType,
  NavigationService,
} from "../../config";
export const SearchBar = ({
  onPressSearch,
  onPressFilter,
  filter,
  placeholder,
  customMainStyle,
  placeholderTextColor,
  onChangeText,
  value,
  keyboardType,
  autoCapitalize,
  returnKeyType,
  onSubmitEditing,
  secureTextEntry,
  inputRef,
  multiline,
  searchIcon,
}) => {
  return (
    <View
      style={[
        styles.searchBarContainer,
        styles.elevation,
        styles.shadow,
        customMainStyle,
      ]}
    >  
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          width: "10%",
          justifyContent: "center",
          alignItems: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onPressSearch}
      >
        <Image
          source={Images.SearchIcon}
          style={{
            // position: "absolute",
            height: 18,
            width: 18,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          width: filter ? "75%" : "90%",
          borderRightWidth: filter ? 0.5 : 0,
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100%",
          borderRightColor: Colors.Theme,
        }}
      >
        <TextInput
          // keyboardAppearance={'dark'}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          ref={inputRef}
          multiline={multiline}
          selectionColor={Colors.Primary}
          placeholder={placeholder}
          style={styles.textInput}
          placeholderTextColor={placeholderTextColor}
          textAlignVertical="center"
          // {...props}
        />
      </View>
      {/* {searchIcon2 && (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          width: "10%",
          justifyContent: "center",
          alignItems: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onPressSearch2}
      >
        <Image
          source={Images.SearchIcon}
          style={{
            // position: "absolute",
            height: 18,
            width: 18,
          }}
        />
      </TouchableOpacity>
    )} */}
      {filter && (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.filterIcon}
          onPress={onPressFilter}
        >
          <Image
            source={Images.FilterIcon}
            style={{
              // position: "absolute",
              height: 18,
              width: 18,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    height: Metrix.VerticalSize(45),
    alignItems: "center",
    borderColor: Colors.Theme,
    borderRadius: Metrix.VerticalSize(10),
    backgroundColor: "#FFFFFF",
    // backgroundColor: "#FFFFFF",
    // marginTop: 15,
    // width: "100%",
    // height: Metrix.VerticalSize(45),
    // borderRadius: 10,
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "flex-start",
    // padding: 20,
    // alignItems: "center",
    // justifyContent: "space-between",
  },
  textInput: { height: Metrix.VerticalSize(50) },
  SearchIcon: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  filterIcon: {
    width: "15%",
    justifyContent: "center",
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
