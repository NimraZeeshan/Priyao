import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
    FlatList,
    Dimensions,
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
  import {Metrix, NavigationService, Images} from '../../config';
  // import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
  import SwipeButton from 'rn-swipe-button';
  import {Header, ListItem, Avatar} from 'react-native-elements';
  import {Center} from 'native-base';
  import {TextInput} from 'react-native-gesture-handler';
  import Animated from 'react-native-reanimated';
  import BottomSheet from 'reanimated-bottom-sheet';
  // import {useState, useRef} from 'react';
  import {useEffect, useRef, useState} from 'react';
  import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
  import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
  
  import {Card} from 'react-native-shadow-cards';
import { Colors } from 'react-native/Libraries/NewAppScreen';
  
  export const FindingCaptainScreen = () => {

    return (
        <>
          <View
            style={{
              // borderColor: 'black',
              // borderWidth: 1,
              //   flex: 1,
              marginTop: 0,
              height: 500,
            }}>
            {/* <Image
              source={Images.MapBig}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 500,
                width: 500,
                alignSelf: 'flex-start',
                position: 'absolute',
              }}></Image> */}
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              region={{
                latitude: 24.8825,
                longitude: 67.0694,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              <Marker
                coordinate={{latitude: 24.8825, longitude: 67.0694}}
                pinColor={'purple'} // any color
                title={'HEllo'}
                description={'description'}
                image={Images.MArkerMap}
    
                // image={Images.MArkerMap}
              />
             
              {/* <GooglePlacesAutocomplete
                placeholder="Search"
                styles={{
                  textInput: {
                    marginTop: 50,
                    marginRight: 10,
                    marginLeft: 10,
                  },
                }}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(data, details);
                }}
                query={{
                  key: 'AIzaSyBa2ozEcLg_aU9nrsqxfz3_2dWc30s3cLo',
                  language: 'en',
                }}
              /> */}
            </MapView>

            <View
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 150,
                width: '85%',
                alignSelf: 'center',
                marginTop: 60,
                backgroundColor: 'white',
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={Images.lineDropLocation}
                style={{marginLeft: 10}}></Image>
              <View style={{width: '85%', flexDirection: 'column'}}>
                <Text>Pick Up</Text>
                <TextInput style={styles.input} placeholder="Dolmin Mall Clifton" />
                <Text style={{marginTop: 10}}>Drop Off</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Chase Up Super Mart Karachi"
                />
              </View>
            </View>
          </View>

          <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    //paddingVertical: -400,
                }}>
          <Image source={Images.Dot}
                 style={{
                    width: 300,
                    height: 300,
                    marginVertical: -300   
            }}></Image>
            </View>

            <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    //paddingVertical: -400,
                }}>
            <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: '#97ADB6',
                    marginVertical: -90 
          }}>Finding Captain</Text>
            </View>

          <PrimaryButton
          textColor={'white'}
          title={'Go Ahead'}
          customStyles={styles.PrimaryButton}
          onPress={() => {
            navigationService.navigate('DriveronwayScreen'); //CurrentRideSeatScreen
          }}
        />
        </>
    )
};

const styles = StyleSheet.create({

    PrimaryButton: {
      width: '50%',
      alignSelf: 'center',
      backgroundColor: 'red',
      marginVertical: 70,
      
    },
    input: {
      // height: 50,
      // borderWidth: 1,
      borderBottomWidth: 0.2,
      height: 50,
      paddingHorizontal: 20,
      marginTop: 10,
      borderRadius: 10,
      width: '100%',
      height: 40,
    },
    shadow: {
      borderColor: 'black', // if you need
      borderWidth: 0.2,
      overflow: 'hidden',
      shadowColor: '#707070',
      shadowRadius: 5,
      shadowOpacity: 0.5,
      height: 55,
      alignSelf: 'center',
      marginTop: 10,
      width: '95%',
      borderRadius: 10,
      flexDirection: 'row',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 30,
      height: 700,
      opacity: 0.5,
    },
  });