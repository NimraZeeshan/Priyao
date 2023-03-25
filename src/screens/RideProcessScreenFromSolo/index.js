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


import React, { useState, useEffect, useRef } from 'react';
import navigationService from '../../config/navigationService';
import { Easing } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import call from 'react-native-phone-call';
import { Metrix, NavigationService, Images, Colors } from '../../config';
// import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import SwipeButton from 'rn-swipe-button';
import { firebase } from '@react-native-firebase/database';
import { Header, ListItem, Avatar } from 'react-native-elements';
import { Center } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import { duration } from 'moment';


var screenWidth = Dimensions.get('window').width; //full screen width

export const RideProcessScreenFromSolo = (props) => {

  console.log('RideProcessScreenFromSolo', props.route.params);
  const rideData = props.route.params.rideData;
  const rideId = rideData.rideid;
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [timeDuration, setTimeDuration] = useState(null);
  const mapRef = useRef();

///
  const [pickAddress, setPickAddress] = useState(rideData.from_location);
  const [dropAddress, setDropAddress] = useState(rideData.to_location);
  const markerRef = useRef();
///
  useEffect(() => {
    setDistance(parseFloat(rideData.totalkm).toFixed(2))
  }, []);

  useEffect(() => {
    const onValueChange = firebase.app().database()
      .ref(`/rides/${rideId}/isRideEnded`)
      .on('value', snapshot => {

        if (snapshot.val()) {

          console.log('Ride Ended')
          //navigationService.navigate('DriverOnWayFromSoloScreen',{rideData});
          navigationService.navigate('PaymentFeedbackScreenFromSolo',{rideData});

        }
      });

    // Stop listening for updates when no longer required
    return () => firebase.app().database().ref(`/rides/${rideId}/isRiderAssigned`).off('value', onValueChange);
  }, [rideId]);

  // AsyncStorage.getItem('distanceKM').then((dis)=>{
  //   setDistance(Number(dis).toFixed(2))
  // });

  AsyncStorage.getItem('timeDuration').then((dura) => {
    setTimeDuration(Number(dura).toFixed(2))
  });

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
            const { width, height } = Dimensions.get('window');
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


  //TODO
  useEffect(() => {
    getLocation();
  }, []);


  //
  const rotationCar = new Animated.Value(0);

  const starting = () => {
    rotationCar.setValue(0);
    Animated.timing(rotationCar, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true

    }).start(() => starting())
  }

starting();
  const animating = () => {

    if (markerRef.current && mapRef.current) {
      markerRef.current.animateMarkerToCoordinate(location, 2000);
      mapRef.current.fitToSuppliedMarkers(dropAddress), {
        edgePadding:
        {

        },

      };
      mapRef.current.animateToRegion(location, 2000)
    }
    else {
      //location.timing(location).start();
    }
  };

  animating();


  const ready = res => {
    mapRef.current.fitToCoordinates(res, {
      // edgePadding: {
      //   right: 30,
      //   bottom: 30,
      //   left: 30,
      //   top: 10,
      // },
      animated: false,
    });
    //setDistance(res.distance);
    //setTimeDuration(res.duration);
  };
////

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
          backgroundColor: Colors.HeaderColour,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ fontSize: 20 }}>Your ride is in process</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          //   borderColor: 'black',
          //   borderWidth: 1,
          height: 100,
          margin: 20,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigationService.navigate('MessageScreen');
          }}>
          <Image
            source={Images.Message}
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 44,
              width: 44,
              marginTop: 30,
            }}
          />
        </TouchableOpacity>
        <Image
          source={Images.user}
          style={{
            //   borderColor: 'black',
            //   borderWidth: 1,
            height: 87.2,
            width: 87.2,
            marginLeft: 50,
          }}
        />
        <TouchableOpacity
          onPress={(() => {
            phoneCall();
          })}>
          <Image
            source={Images.Call}
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 44,
              width: 44,
              marginTop: 30,
              marginLeft: 50,
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            fontSize: 34,
            color: '#707070',
          }}>
          Asim Azhar
        </Text>
      </View>
      <View
        style={{
          borderColor: 'black',
          borderWidth: 0.2,
          height: 80,
          width: '95%',
          alignSelf: 'center',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 63,
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            position: 'absolute',
          }}>
          <Image
            source={Images.CarSmall}
            style={{
              width: 95.81,
              height: 33.46,
              justifyContent: 'center',
            }}></Image>
          <Text style={{ alignSelf: 'center' }}>Toyota Corolla</Text>
          <Text style={{ alignSelf: 'center', color: Colors.HeaderColour, fontSize: 20 }}>
            PKR 600
          </Text>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 25,
            color: '#707070',
            marginTop: 50,
          }}>
          ARY 6068
        </Text>
      </View>
      {/* <PrimaryButton
        title={'Arrived'}
        color={Colors.HeaderColour}
        customStyles={styles.PrimaryButton}
        onPress={() => {
          navigationService.navigate('PaymentFeedbackScreenFromSolo'); //toggleModal
        }}
      /> */}
    </View>
  );

  ////for Phone Call
  let phoneCall = () => {

    const args = {
      number: `${9093900003}`, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
      skipCanOpen: true // Skip the canOpenURL check
    }

    call(args)
      .catch(console.error);

  };
  ////

  const sheetRef = React.useRef(null);

  return (
    <>
      <View
        style={{
          // borderColor: 'black',
          // borderWidth: 1,
          //   flex: 1,
          marginTop: 0,
          height: '200%',
        }}>
        <MapView
          scrollEnabled={true}
          showsUserLocation={true}
          showsTraffic={false}
          style={styles.map}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          coordinates={location}
          initialRegion={location}>

{location && (
            <Marker
              style={{
                paddingVertical: 1,
                paddingHorizontal: 1,
                borderRadius: 1,
                elevation: 1,
                // transform: [{rotate: `${heading}deg`}],
                // anchor: {x: 0.5, y: 0.5},
                // centerOffset: {x: 0.5, y: 0.5}

              }}
              // draggable={true}
              // onDragEnd={location}
              ref={markerRef}
              coordinate={location}
              pinColor={'green'}
            // anchor={{x: 0.5, y: 1}}
            // centerOffset={{x: 0.5, y: 1}}
            //flat={true}
            //tracksViewChanges={true}
            //opacity={0.5}
            // image = { Images.ResizeCar }
            >
              <Animated.Image source={Images.ResizeCar}
                style={{
                  width: 40,
                  height: 40,
                  transform: [{ rotate: rotationCar }],
                }}
              //resizeMode = "contain"
              />
            </Marker>
          )}
          {/* {dropoff && <Marker coordinate={dropoff} pinColor={'red'} />} */}

          <MapViewDirections
            // origin={pickup}
            origin={location}
            destination={dropAddress}
            //coordinates={watch}
            strokeColor="hotpink"
            strokeWidth={4}
            mode="DRIVING"
            splitWaypoints={true}
            timePrecision="none"
            apikey="AIzaSyBa2ozEcLg_aU9nrsqxfz3_2dWc30s3cLo"
            optimizeWaypoints={false}
            onReady={ready}
          />
        </MapView>


        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            height: 40,
            backgroundColor: 'white',
            width: '98%',
            //justifyContent: 'center',
            marginVertical: 50,
            alignSelf: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 7
            }}>
            <Text style={{ color: '#97ADB6' }}>Time Taken</Text>
            <Text style={{ color: '#97ADB6' }}>Distance Km</Text>
            <Text style={{ color: '#97ADB6' }}>Estimated Fare</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 25
            }}>
            <Text style={{ color: '#707070' }}>  {timeDuration} </Text>
            <Text style={{ color: '#707070' }}> {distance} </Text>
            <Text style={{ color: '#707070' }}> {'Pkr ' + rideData.totalfare}</Text>
          </View>
        </View>
      </View>
      {/* <PrimaryButton
          title="Open Bottom Sheet"
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
        snapPoints={[180, 450, 200]}
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
    marginVertical: 50,
    alignSelf: 'center',
    width: '60%',
  },
  PrimaryButton2: {
    marginTop: 30,
    width: '15%',
    left: 20,
  },
  PrimaryButton3: {
    width: '60%',
    marginLeft: 70,
  },
  footerStyle: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    height: 60,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
