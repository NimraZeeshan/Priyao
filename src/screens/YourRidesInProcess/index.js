import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
    FlatList,
    Alert,
  } from 'react-native';
  import {
    AuthHeader,
    AuthContainer,
    PrimaryInput,
    PrimaryButton,
    Loading,
  } from '../../components';
  
  import React from 'react';
  import navigationService from '../../config/navigationService';
  import {Metrix, NavigationService, Images, Colors} from '../../config';
  // import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
  import SwipeButton from 'rn-swipe-button';
  import {Header, ListItem, Avatar} from 'react-native-elements';
  import {Center} from 'native-base';
  import {TextInput} from 'react-native-gesture-handler';
  import {useState, useRef} from 'react';
  import {Card} from 'react-native-shadow-cards';
  import StarRating from 'react-native-star-rating-widget';
  import {widthPercentageToDP} from 'react-native-responsive-screen';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { color } from 'react-native-reanimated';
  
 export const YourRidesInProcess = () => {
  
    return (
      <>
        <View
          style={{
            height: 79,
  
            backgroundColor: Colors.HeaderColour,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold', letterSpacing: 2,}}>Your Rides</Text>
          <Image
            source={Images.Menu}
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 49,
              width: 49,
              marginLeft: 5,
              marginTop: 5,
              position: 'absolute',
              alignSelf: 'flex-start',
              padding: 10,
              marginLeft: 20,
            }}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
         <Text  style={{fontSize: 20, marginVertical: 10, fontWeight: 'bold',}}> In Process     |     History</Text>
        </View>
  
        <View style={{flexDirection: 'column'}}>
        <Text style={{alignSelf: 'flex-end',
                      fontWeight: 'bold',
                      marginHorizontal: 73, 
                      marginVertical: -20,
                      color: Colors.HeaderColour,
                      }}>__________</Text>
        </View>
      </>
    );
  };
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       // marginTop: StatusBar.currentHeight || 0,
//     },
//     item: {
//       padding: 5,
//       marginVertical: 8,
//       marginHorizontal: 16,
//       borderRadius: 10,
//     },
//     title: {
//       fontSize: 14,
//     },
//   });
  