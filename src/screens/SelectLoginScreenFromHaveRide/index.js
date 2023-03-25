import {
    StyleSheet,
    Text,
    View,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import {
    MainContainer,
    AuthHeader,
    AuthContainer,
    PrimaryInput,
    PrimaryButton,
    BackHeader,
    Loading,
  } from '../../components';
  
  import React from 'react';
  import {Metrix, NavigationService, Images, Colors} from '../../config';
  import navigationService from '../../config/navigationService';
  import {useState, useRef} from 'react';
  import { Center } from 'native-base';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  

  export const SelectLoginScreenFromHaveRide = () => {
    return (
      <>
        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            // width: 112.67,
            // height: 173.96,
            flex: 1,
            marginTop: 110,
            paddingHorizontal: 20,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={Images.Drive}
            style={{
              width: 304,
              height: 189.44,
            }}
            name="your-icon"
            size={20}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              //   flex: 1,
              color: 'black',
              //   fontFamily: 'FredokaOne-Regular',
              fontSize: 40,
             // marginTop: 30,
            }}
            numberOfLines={2}>
            Ride Sharing
          </Text>
  
          <Text
            style={{
              flex: 1,
              color: 'black',
              //   fontFamily: 'FredokaOne-Regular',
              fontSize: 12,
              textAlign: 'center',
              //textAlignVertical: 'center',
              //marginTop: -50,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            numberOfLines={2}>
            Travel with your friends or meet new people along the route and save
            up to 20% off with a ride sharing.
          </Text>
        </View>

        <View style={{
          //ride sharing bar
            width: wp('20%'),
            height: 8,
            alignSelf: 'center',
            position: 'relative',
            top: -50,
            backgroundColor: Colors.HeaderColour,
  
           }}>
        </View>

        <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 150}}>
          <PrimaryButton
            textColor={"white"}
            title={'Login'}
            color={'#707070'}
            customStyles={styles.PrimaryButton}
            onPress={() => {
              navigationService.navigate('LoginScreenFromHaveRide');
            }}
          />
          <PrimaryButton
            title={'Register'}
            color={Colors.HeaderColour}
            textColor="#4D4D4D"
            customStyles={styles.PrimaryButton2}
            onPress={() => {
              navigationService.navigate('Becomeadriverone');
            }}
          />
        </View>
       
      </>
    );
  };
  
  const styles = StyleSheet.create({
    PrimaryButton: {
      marginBottom: 10,
    },
    PrimaryButton2: {
      marginBottom: -70,
    },
  });










  // import {
  //   StyleSheet,
  //   Text,
  //   View,
  //   Pressable,
  //   ScrollView,
  //   KeyboardAvoidingView,
  //   Image,
  //   TouchableOpacity,
  //   } from 'react-native';
  //   import {
  //   MainContainer,
  //   AuthHeader,
  //   AuthContainer,
  //   PrimaryInput,
  //   PrimaryButton,
  //   BackHeader,
  //   Loading,
  //   } from '../../components';
    
  //   import React from 'react';
  //   import {Metrix, NavigationService, Images, Colors} from '../../config';
  //   import navigationService from '../../config/navigationService';
  //   import {useState, useRef} from 'react';
  //   import { Center } from 'native-base';
  //   import {
  //   widthPercentageToDP as wp,
  //   heightPercentageToDP as hp,
  //   } from 'react-native-responsive-screen';
    
  //   export const SelectLoginScreenFromHaveRide = () => {
  //   return (
  //   <>
  //   <View
  //   style={{
  //   flex: 1,
  //   marginTop: hp('10%'),
  //   paddingHorizontal: 20,
  //   alignSelf: 'center',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   }}>
  //   <Image
  //   source={Images.Drive}
  //   style={{
  //   width: wp('80%'),
  //   height: hp('35%'),
  //   }}
  //   name="your-icon"
  //   size={20}
  //   />
  //   </View>
  //   <View
  //   style={{
  //   flex: 1,
  //   alignSelf: 'center',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   }}>
  //   <Text
  //   style={{
  //   color: 'black',
  //   fontSize: hp('5%'),
  //   }}
  //   numberOfLines={2}>
  //   Ride Sharing
  //   </Text>
    
  //   <Text
  //         style={{
  //           flex: 1,
  //           color: 'black',
  //           fontSize: hp('2%'),
  //           textAlign: 'center',
  //           paddingHorizontal: 20,
  //         }}
  //         numberOfLines={2}>
  //         Travel with your friends or meet new people along the route and save
  //         up to 20% off with a ride sharing.
  //       </Text>
  //     </View>
  
  //     <View style={{
  //         width: wp('20%'),
  //         height: 8,
  //         alignSelf: 'center',
  //         position: 'relative',
  //         top: -hp('10%'),
  //         backgroundColor: Colors.HeaderColour,
  //        }}>
  //     </View>
  
  //     <View style={{paddingHorizontal: 20, marginBottom: hp('25%')}}>
  //       <PrimaryButton
  //         textColor={"white"}
  //         title={'Login'}
  //         color={'#707070'}
  //         customStyles={styles.PrimaryButton}
  //         onPress={() => {
  //           navigationService.navigate('LoginScreenFromHaveRide');
  //         }}
  //       />
  //       <PrimaryButton
  //         title={'Register'}
  //         color={Colors.HeaderColour}
  //         textColor="#4D4D4D"
  //         customStyles={styles.PrimaryButton2}
  //         onPress={() =>
  //  {
  //               navigationService.navigate('Becomeadriverone');
  //             }}
  //           />
  //         </View>
         
  //       </>
  //     );
  //   };
    
  //   const styles = StyleSheet.create({
  //     PrimaryButton: {
  //     marginBottom: hp('2%'),
  //     },
  //     PrimaryButton2: {
  //     marginBottom: hp('-14%'),
  //     },
  //     });
    