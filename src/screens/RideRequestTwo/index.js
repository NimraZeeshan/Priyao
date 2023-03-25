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
  PermissionsAndroid,
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
// import {Card, Center} from 'native-base';
import {TextInput} from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {useState, useEffect} from 'react';
import {Card} from 'react-native-shadow-cards';




export const RideRequestTwo = () => {
  const [location, setLocation] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            const {width, height} = Dimensions.get('window');
            const ASPECT_RATIO = width / height;
            const LATITUDE_DELTA = 0.015;
            const LONGITUTDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

            const INITIAL_POSITION = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUTDE_DELTA,
            };
            setLocation(INITIAL_POSITION);
          },
          error => {
            console.log(error.code, error.message);
            setLocation(false);
          },
          // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
    console.log(location);
  };

  useEffect(() => {
    getLocation();
  }, []);


  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              // borderColor: 'black',
              // borderWidth: 1,
              height: 79,
              backgroundColor: Colors.HeaderColour,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
           <TouchableOpacity
                  onPress={() => {
                  navigationService.navigate('OnliineSoloRide');}}>
            <Image
              source={Images.BackArrow}
              style={{
                height: 49,
                width: 49,
              }}></Image>
           </TouchableOpacity>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#707070'}}>
              Ride Request
            </Text>
            <Image source={{}} style={{height: 49, width: 49}}></Image>
          </View>
          <View
            style={{
              margin: 20,
              flexDirection: 'row',
            }}>
             <TouchableOpacity
                onPress={() => {
                  navigationService.navigate('DriverRideRequestScreenTwo'); //RideDeetailsScreen
                }}>
            <Image
              source={Images.AsimSamall}
              style={{height: 49, width: 49}}>

            </Image>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'column',
                margin: 5,
              }}>
              <Text>Asim Azhar</Text>
              <Text style={{color: '#97ADB6'}}>+92 300 0000000</Text>
            </View>
          </View>
          <View
            style={{
              // borderColor: 'black',
              // borderWidth: 1,
              flexDirection: 'row',
              margin: 20,
              width: '85%',
            }}>
            <Image
              source={Images.StraightLocation}
              style={{height: 94.91, width: 12, margin: 5, marginTop: -10}}></Image>
            <View style={{flexDirection: 'column', margin: 5}}>
              <Text style={{color: '#97ADB6', marginTop: -30}}>Pick Up</Text>
              <Text style={{fontSize: 18}}>Dolmin Mall Clifton</Text>
              <Image source={Images.Line} style={{marginVertical: 10}}></Image>
              <Text style={{color: '#97ADB6'}}>Drop Off</Text>
              <Text style={{fontSize: 18}}>Chase Up Super Mart Karachi</Text>
            </View>
          </View>
          <View
            style={{
              // borderColor: 'black',
              // borderWidth: 1,
              flexDirection: 'row',
              margin: -10,
              width: '80%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
            <Text style={{fontSize: 21}}>Distance</Text>
            <Text style={{fontSize: 23, color: '#97ADB6'}}>300m</Text>
          </View>

          <View
            style={{
              // borderColor: 'black',
              // borderWidth: 1,
              margin: 20,
              flexDirection: 'column',
            }}>
            <Text style={{marginLeft: 15, color: '#97ADB6'}}>
              Estimated Fare
            </Text>
            <Text
              style={{marginLeft: 12, marginVertical: -7, color: Colors.HeaderColour, fontSize: 30, fontWeight: 'bold',}}>
              PKR 350
            </Text>
            <Card style={{height: 40, borderRadius: 12, marginVertical: 10}}>
              <View
                style={{
                  // borderColor: 'black',
                  // borderWidth: 1,
                  marginTop: 5,
                  flexDirection: 'row',
                }}>
                <Image
                  source={Images.ClockIcon}
                  style={{height: 29.25, width: 29.25, marginLeft: 5,}}></Image>
                <View style={{flexDirection: 'column', marginLeft: 5}}>
                  <Text style={{marginTop: -4}}>Pick Up TIme</Text>
                  <Text>07:16 Pm</Text>
                </View>
              </View>
            </Card>
          </View>

          <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 10,
          }}>
           <MapView
            scrollEnabled={true}
            showsUserLocation={true}
            showsTraffic={false}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={location}
        //  onRegionChangeComplete={(location)=>{setLocation(location)}}
        // image={Images.MapCarSmall} add image to marker
        ></MapView>
        </View>
          {/* <View
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              margin: 10,
              borderRadius: 10,
            }}>
            <Image
              source={Images.Map}
              style={{width: 354, height: 274}}></Image>
          </View> */}
        </ScrollView>
      </SafeAreaView>
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
    width: '80%',
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
    width: 330,
    height: 380,
    borderRadius: 50,
    marginVertical: -30,
    //marginTop: -20,
    marginHorizontal: 1,
  },
});
