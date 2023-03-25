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
import {Metrix, NavigationService, Images, Colors} from '../../config';
// import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import SwipeButton from 'rn-swipe-button';
import {Header, ListItem, Avatar} from 'react-native-elements';
import {Center} from 'native-base';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {useEffect, useRef, useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';



export const SelectRideScreen = () => {
  
  const [userDropoffAddress, setUserDropoffAddress] = useState("");
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const Press1 = () => setActive1(!active1);
  const Press2 = () => setActive2(!active2);
  const Press3 = () => setActive3(!active3);


  useEffect(async()=>{
    setUserDropoffAddress(await AsyncStorage.getItem('userDropoffAddress'));
  },[])


  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        // padding: 16,
        height: 450,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
      }}>
      {/* <Text>Swipe down to close</Text> */}
      <View
        style={{
          // borderColor: 'black',
          // borderWidth: 1,
          height: 70,
          backgroundColor: '#707070',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 20, color: 'white'}}>Select A Ride</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          //   borderColor: 'black',
          //   borderWidth: 1,
          height: 80,
          margin: 20,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity onPress={Press1}>
          <Image
            source={Images.PriayoStandardremovebg}
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 64,
              width: 104,
              marginTop: 30,
              backgroundColor: active1 ? '#707070' : '#F4F4F4',
              borderRadius: 10,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={Press2}>
          <Image
            source={Images.PriayoStandardremovebg}
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 64,
              width: 104,
              marginTop: 30,
              backgroundColor: active2 ? '#707070' : '#F4F4F4',
              borderRadius: 10,
              marginLeft: 20,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={Press3}>
          <Image
            source={Images.PriayoStandardremovebg}
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 64,
              width: 104,
              marginTop: 30,
              backgroundColor: active3 ? '#707070' : '#F4F4F4',
              borderRadius: 10,
              marginLeft: 20,
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          // borderColor: 'black',
          // borderWidth: 1,
          justifyContent: 'space-between',
          marginRight: 20,
          marginLeft: 20,
        }}>
        <Text>Pirayo Luxuary</Text>
        <Text>Pirayo Standard</Text>
        <Text>Pirayo Basic</Text>
      </View>
      <View>
        <Text
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            fontSize: 34,
            color: '#707070',
          }}>
          Estimated Fare
        </Text>
        <Text
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            fontSize: 34,
            color: Colors.HeaderColour,
          }}>
          PKR 350
        </Text>
      </View>
      <PrimaryButton
        textColor={"white"}
        title={'Create Trip'}
        color={'#707070'}
        customStyles={styles.PrimaryButton}
        onPress={() => {
          navigationService.navigate('FindingCaptainScreenFromSolo');
        }}
      />
    </View>
  );

  const sheetRef = React.useRef(null);

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
        <Image
          source={Images.MapBig}
          style={{
            //   borderColor: 'black',
            //   borderWidth: 1,
            height: 500,
            width: 500,
            alignSelf: 'flex-start',
            position: 'absolute',
          }}></Image>

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

            //image={Images.MArkerMap}
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
            width: '90%',
            alignSelf: 'center',
            marginTop: 50,
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
            <Text
              style={styles.input}
              placeholder="Chase Up Super Mart Karachi"
            >{userDropoffAddress}</Text>
          </View>
        </View>
      </View>
      {/* <PrimaryButton textColor={'white'} customStyles={{
           width: '50%',
           marginVertical: 10,
           backgroundColor: '#707070',
           marginHorizontal: 120,
          }}
            title="Open Bottom Sheet"
            width={'60%'}
            
            onPress={() => sheetRef.current.snapTo(1)}
          /> */}
      <View
        style={{
          flex: 1,
          // backgroundColor: 'papayawhip',
          alignItems: 'center',
          justifyContent: 'center',
        }}></View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[400, 450, 300]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    // paddingTop: 100,
  },
  listItem: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#333',
    padding: 25,
  },
  PrimaryButton: {
    marginTop: 30,
    width: '95%',
    alignSelf: 'center',
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
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 30,
  },
});