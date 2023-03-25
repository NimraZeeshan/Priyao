import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';

import React from 'react';
import navigationService from '../../config/navigationService';
import {Metrix, NavigationService, Images, Colors} from '../../config';
// import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import SwipeButton from 'rn-swipe-button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const Carscreen = () => {
  onSlideRight = () => {
    //perform Action on slide success.
  };

  return (
    <>
      <View
        style={{
          height: hp(10),
          width: wp('100%'),
          backgroundColor: Colors.HeaderColour,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'black',
          borderWidth: 1,
          alignSelf: 'center',
        }}>
        <SwipeButton
          disabled={false}
          //disable the button by doing true (Optional)
          swipeSuccessThreshold={70}
          height={48}
          //height of the button (Optional)
          width={330}
          //width of the button (Optional)
          // title="Ofline"
          titleColor="black"
          //Text inside the button (Optional)
          //thumbIconImageSource={thumbIcon}

          //You can also set your own icon (Optional)
          onSwipeSuccess={() => {
            alert('Online');
          }}
          //After the completion of swipe (Optional)
          railFillBackgroundColor="#e688a1" //(Optional)
          railFillBorderColor="#e688ff" //(Optional)
          thumbIconBackgroundColor="#FF1717" //(Optional)
          // thumbIconBorderColor="#ed9aff" //(Optional)
          railBackgroundColor="#FFFFFF" //(Optional)
          // railBorderColor="#bbeaff" //(Optional)
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          width: wp(100),
          // marginTop: 20,
        }}>
        <Image
          source={Images.BigCar}
          style={{
            //   borderColor: 'black',
            //   borderWidth: 1,
            height: hp('90%'),
            width: wp('95%'),

            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </View>

      {/* <RNSlidingButton
          style={{
            width: 240,
          }}
          height={35}
          onSlidingSuccess={this.onSlideRight}
          slideDirection={SlideDirection.RIGHT}>
          <View style={{}}>
            <Text numberOfLines={1} style={styles.titleText}>
              SLIDE RIGHT TO ACCEPT >
            </Text>
          </View>
        </RNSlidingButton> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});
