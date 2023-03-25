import React from "react";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { primaryColor } from "../../Constants/styles";
import Modal from "react-native-modal";
import { Colors } from "../../config";

let screenHeight = Math.round(Dimensions.get("window").height);
let screenWidth = Math.round(Dimensions.get("window").width);
export const Loading = ({
  size = "large",
  color = "#FFF",
  loading,
  backdropOpacity=0.4,
}) => {
  if (loading) {
    return (
      //   <View
      //     style={{

      //       //   backgroundColor: "red",
      //       //   position: "absolute",
      //     }}
      //   >
      <Modal
        isVisible={loading}
        style={{
        //   height: screenHeight,
        //   width: screenWidth,
          alignItems:'center',
          justifyContent:'center'
        }}
        animationIn="fadeIn"
        backdropOpacity={backdropOpacity}
        animationOut="fadeOut"
        hasBackdrop
        coverScreen
      >
        <ActivityIndicator size={size} color={Colors.Primary} />
      </Modal>
      //   </View>
    );
  } else {
    return null;
  }
};
