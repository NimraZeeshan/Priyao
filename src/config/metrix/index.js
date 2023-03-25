// import {Dimensions, PixelRatio, Platform} from 'react-native';
// import {isIphoneX} from './isIPhoneX';
import Colors from "../colors";
import { Dimensions, Platform, PixelRatio } from "react-native";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from "react-native-responsive-screen";
// let {height, width} = Dimensions.get('window');

// height -= Platform.OS == 'ios' ? (isIphoneX() ? 70 : 20) : 0;

// const scale = height / 812;

// const normalize = size => {
//   const newSize = size * scale;
//   return Math.round(PixelRatio.roundToNearestPixel(newSize));
// };

// const VerticalSize = (size = 812) => (size / 812) * height;
// const HorizontalSize = (size = 375) => (size / 375) * width;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const devHeight = 640; //Phone height during development
const devWidth = 360; //width

export const deviceHeight = Dimensions.get("window").height; //Device height
export const deviceWidth = Dimensions.get("window").width; //device width
export const deviceScale = Dimensions.get("window").scale;
export const defaultWindowMultiplier = 0.5;
export const defaultNavBarHeight = 65;

const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scalef = (size) => (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size) =>
  (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (scalef(size) - size) * factor;
export const moderateVerticalScale = (size, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

//gain
export const RNHeight = deviceHeight / devHeight;
export const RNWidth = deviceWidth / devWidth;

// based on iphone 5s's scale
export const scale = SCREEN_WIDTH / 320;

export const normalizeFont = (size) => {
  // For Normalizing the font size for all type of screens, Including iPad, iPhone, Tablet, Android
  const newSize = moderateScale(size);
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
};

// Use this function to normalize image size
export const normalizeWithScale = (size) => {
  // For Normalizing the Icon size for different screens
  return moderateScale(size, 0.4);
};

export const VerticalSize = (size) => {
  // For Normalizing the Height for different screens
  // return moderateScale(size, 0.25);
  return hp2dp((size / 760) * 100 + "%");
};

export const HorizontalSize = (size) => {
  // For Normalizing the Width for different screens
  // return moderateScale(size, 0.25)
  return wp2dp((size / 360) * 100 + "%");
  // return RNWidth * size;
};

export const createShadow = {
  shadowColor: Platform.OS == "android" ? "#000000" : "#D3D3D3",
  shadowOffset: {
    width: HorizontalSize(3),
    height: VerticalSize(2),
  },
  shadowOpacity: 3,
  shadowRadius: 18,

  elevation: VerticalSize(20),
};

// const createShadow = (
//   number = 24,
//   opacity = 0.58,
//   offset = {width: 0, height: 12},
//   radius = 16.0,
//   color = '#000000',
//   backgroundColor = '#ffffff',
// ) => {
//   return {
//     elevation: number,
//     shadowOffset: offset,
//     shadowOpacity: opacity,
//     shadowRadius: radius,
//     shadowColor: color,
//     backgroundColor,
//   };
// };

export default {
  Radius: VerticalSize(10),
  LightRadius: VerticalSize(6),
  ActiveOpacity: 0.5,
  customFontSize: normalizeFont,
  customImageSize: normalizeWithScale,
  // FontExtraSmall: normalize(12),
  // FontSmall: normalize(14),
  // FontRegular: normalize(16),
  // FontMedium: normalize(18),
  // FontLarge: normalize(26),
  // FontExtraLarge: normalize(30),
  VerticalSize,
  HorizontalSize,
  createShadow,
};
