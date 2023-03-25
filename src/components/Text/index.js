import React from "react";
import { Text, StyleSheet, ImageBackground } from "react-native";
import { Metrix, Colors, Fonts, FontType, Images } from "../../config";
import { normalizeFont } from "../../config/metrix";

const LargeBoldText = ({
  children,
  ellipsizeMode,
  numberOfLines,
  customStyle,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.BoldText, customStyle]}
    >
      {children}
    </Text>
  );
};

const LargeMediumBoldText = ({
  children,
  ellipsizeMode,
  numberOfLines,
  customStyle,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.MediumBoldText, customStyle]}
    >
      {children}
    </Text>
  );
};
const LargeSemiBoldText = ({
  children,
  ellipsizeMode,
  numberOfLines,
  customStyle,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.SemiBold, customStyle]}
    >
      {children}
    </Text>
  );
};

const MediumLargeBlackText = ({
  children,
  ellipsizeMode,
  numberOfLines,
  customStyle,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.MediumLargeBlackText, customStyle]}
    >
      {children}
    </Text>
  );
};

const MediumBoldBlackText = ({
  children,
  ellipsizeMode,
  numberOfLines,
  customStyle,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.MediumBoldBlackText, customStyle]}
    >
      {children}
    </Text>
  );
};

const MediumBlackText = ({
  children,
  ellipsizeMode,
  numberOfLines,
  customStyle,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.MediumBlackText, customStyle]}
    >
      {children}
    </Text>
  );
};

const MediumGreyText = ({
  children,
  ellipsizeMode,
  numberOfLines,
  customStyle,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.MediumGreyText, customStyle]}
    >
      {children}
    </Text>
  );
};

const RegularBlackText = ({
  children,
  ellipsizeMode,
  numberOfLines,
  customStyle,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.RegularBlackText, customStyle]}
    >
      {children}
    </Text>
  );
};

const RegularGreyText = ({
  children,
  ellipsizeMode,
  numberOfLines,
  customStyle,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.RegularGreyText, customStyle]}
    >
      {children}
    </Text>
  );
};

const SmallGreyText = ({
  children,
  ellipsizeMode,
  numberOfLines,
  customStyle,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.SmallGreyText, customStyle]}
    >
      {children}
    </Text>
  );
};

const SmallBlackText = ({
  children,
  ellipsizeMode,
  numberOfLines,
  customStyle,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.SmallBlackText, customStyle]}
    >
      {children}
    </Text>
  );
};

const LightBlackText = ({
  children,
  ellipsizeMode,
  numberOfLines,
  customStyle,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.LightBlackText, customStyle]}
    >
      {children}
    </Text>
  );
};

const LightGreyText = ({
  children,
  ellipsizeMode,
  numberOfLines,
  customStyle,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.LightGreyText, customStyle]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  BoldText: {
    fontFamily: Fonts["Bold"],
    fontWeight: "900",
    fontSize: FontType.FontExtraLarge,
    color: Colors.SecondaryTextColor,
  },
  MediumBoldText: {
    fontFamily: Fonts["Bold"],
    fontWeight: "900",
    fontSize: FontType.FontMediumLarge,
    color: Colors.SecondaryTextColor,
  },
  SemiBold: {
    fontFamily: Fonts["Semi-Bold"],
    fontSize: FontType.FontLarge,
    color: Colors.SecondaryTextColor,
  },
  MediumBoldBlackText: {
    fontFamily: Fonts["Semi-Bold"],
    fontSize: FontType.FontMedium,
    color: Colors.SecondaryTextColor,
  },
  MediumBlackText: {
    fontFamily: Fonts["Medium"],
    fontSize: FontType.FontRegular,
    color: Colors.SecondaryTextColor,
  },
  MediumGreyText: {
    fontFamily: Fonts["Medium"],
    fontSize: FontType.FontRegular,
    color: Colors.PrimaryTextColor,
  },
  RegularBlackText: {
    fontFamily: Fonts["Regular"],
    fontSize: FontType.FontRegular,
    color: Colors.SecondaryTextColor,
  },
  RegularGreyText: {
    fontFamily: Fonts["Regular"],
    fontSize: FontType.FontRegular,
    color: Colors.PrimaryTextColor,
  },
  MediumLargeBlackText: {
    fontFamily: Fonts["Bold"],
    fontSize: normalizeFont(22),
    color: Colors.SecondaryTextColor,
  },
  SmallGreyText: {
    fontFamily: Fonts["Regular"],
    fontSize: FontType.FontSmall,
    color: Colors.PrimaryTextColor,
  },
  SmallBlackText: {
    fontFamily: Fonts["Regular"],
    fontSize: FontType.FontSmall,
    color: Colors.SecondaryTextColor,
  },
  LightBlackText: {
    fontFamily: Fonts["Light"],
    fontSize: FontType.FontSmall,
    color: Colors.SecondaryTextColor,
  },
  LightGreyText: {
    fontFamily: Fonts["Light"],
    fontSize: FontType.FontSmall,
    color: Colors.PrimaryTextColor,
  },
});

export default {
  LargeBoldText,
  LargeSemiBoldText,
  MediumBoldBlackText,
  MediumBlackText,
  MediumGreyText,
  RegularBlackText,
  RegularGreyText,
  MediumLargeBlackText,
  SmallGreyText,
  SmallBlackText,
  LightBlackText,
  LightGreyText,
  LargeMediumBoldText,
};
