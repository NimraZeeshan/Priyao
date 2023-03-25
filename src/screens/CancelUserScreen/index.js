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
  import RadioGroup from 'react-native-radio-buttons-group';

  const radioButtonsData = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: "I don't need the ride anymore",
      value: "Idon'tneedtherideanymore",
    },
    {
      id: '2',
      label: 'I changed my mind', 
      value: 'Ichangedmymind',
    },
    {
      id: '3',
      label: "Captain isn't replying",
      value: "Captainisn'treplying",
    },
    {
      id: '4',
      label: "Car or captain details didn't match",
      value: "Carorcaptaindetailsdidn'tmatch",
    },
  ];
  
  export const CancelUserScreen = () => {
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);
   
     
      function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
      }
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

            {/* <View
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 150,
                width: '75%',
                alignSelf: 'center',
                marginTop: 40,
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
            </View> */}

     <View
      style={{
        backgroundColor: 'white',
        height: 50,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        //marginHorizontal: 270,
        marginTop: 380,
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <View
        style={{
          // borderColor: 'black',
          // borderWidth: 1,
          height: 70,
          marginBottom: 350,
          backgroundColor: 'green',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 20, color: 'white'}}>Select a Reason</Text>
      </View>

      {/* <Card
        style={{
          height: 60,
          alignSelf: 'center',
          
          borderRadius: 40,
          //   alignItems: 'center',
          //   justifyContent: 'space-between',
        }}>

        <View> 
           <View style={{flexDirection: 'column', marginLeft: 30}}>
              <Text style={{fontSize: 13, textAlign: 'center', color: '#707070'}}>
                i don't need the ride any more
              </Text>
            
          </View>
        </View>
      </Card> */}

      {/* <Card
        style={{
          height: 50,
          alignSelf: 'center',
          borderRadius: 40,
          alignItems: 'center',
          //   justifyContent: 'space-between',
        }}>
        <View
          style={{
            //   borderColor: 'black',
            //   borderWidth: 1,
            height: 50,
            width: '80%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>

         <Text style={{marginLeft: 5, fontSize: 12}}>Suzuki Mehran</Text>
        </View>
       </Card> */}
       
      </View>

            </View>
          {/* </View> */}

          {/* <View
        style={{
          borderColor: 'black',
          borderWidth: 0.5,
          height: 52,
          width: '60%',
          alignSelf: 'center',
          justifyContent: 'center',
          marginVertical: -200,
          alignItems: 'center',
          borderRadius: 20,
        }}>
        <Text>Didn't paid the amount</Text>
      </View>

         <View
        style={{
          borderColor: 'black',
          borderWidth: 0.5,
          height: 52,
          width: '60%',
          alignSelf: 'center',
          justifyContent: 'center',
          marginVertical: 210,
          alignItems: 'center',
          borderRadius: 20,
        }}>
        <Text>I changed my mind</Text>
      </View>

      <View
        style={{
          borderColor: 'black',
          borderWidth: 0.5,
          height: 52,
          width: '60%',
          alignSelf: 'center',
          justifyContent: 'center',
          marginVertical: -200,
          alignItems: 'center',
          borderRadius: 20,
        }}>
        <Text>Captain isn't replying</Text>
      </View>

      <View
        style={{
          borderColor: 'black',
          borderWidth: 0.5,
          height: 52,
          width: '75%',
          alignSelf: 'center',
          justifyContent: 'center',
          marginVertical: 210,
          alignItems: 'center',
          borderRadius: 20,
        }}>
        <Text>Car or captain details didn't match</Text>
      </View> */}
       {/* <Card style={{height: 60, alignSelf: 'center', marginTop: -220, width: 230, flexDirection: 'column'}}>
        <Text style={{textAlign: 'center', paddingVertical: 20,}}>I don't need the ride anymore</Text>
      </Card>

      <Card style={{height: 60, alignSelf: 'center', marginTop: 10, width: 230, flexDirection: 'column'}}>
        <Text style={{textAlign: 'center', paddingVertical: 20,}}>I changed my mind</Text>
      </Card> */}
      {/* <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
          /> */}
      {/* <Card style={{height: 60, alignSelf: 'center', marginTop: 10, width: 230, flexDirection: 'column'}}>
       <Text style={{textAlign: 'center', paddingVertical: 20,}}>Captain isn't replying</Text>
      </Card>

      <Card style={{height: 60, alignSelf: 'center', marginTop: 10, width: 230, flexDirection: 'column'}}>
       <Text style={{textAlign: 'center', paddingVertical: 20,}}>Car or captain details didn't match</Text>
      </Card> */}
      <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -350
      }}>
        <RadioGroup containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            elevation: 2,
            borderRadius: 10,
            width: '78%',
            height: '50%',
            // marginHorizontal: 39,
            // marginVertical: -180,
            
          }}
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
          />
      </View>

          <PrimaryButton
          textColor={'white'}
          title={'Cancel'}
          customStyles={styles.PrimaryButton}
          onPress={() => {
            navigationService.navigate('HomeScreen'); //CurrentRideSeatScreen
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
      marginTop: -70,
      
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
      opacity: 0.3,
    },
  });