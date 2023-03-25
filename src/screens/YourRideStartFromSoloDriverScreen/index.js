import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  PermissionsAndroid,
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
import Geolocation from 'react-native-geolocation-service';
import { Metrix, NavigationService, Images } from '../../config';
// import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import SwipeButton from 'rn-swipe-button';
import { Header, ListItem, Avatar } from 'react-native-elements';
import { Center } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
// import {useState, useRef} from 'react';
import { useEffect, useRef, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Easing } from 'react-native-reanimated';
import { Card } from 'react-native-shadow-cards';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const YourRideStartFromSoloDriverScreen = (props) => {

  console.log('data from notfication', props.route.params);

  const rideData =props.route.params.remoteData;
  console.log("YourRideStartFromSoloDriverScreen", rideData.id);

  const [location, setLocation] = useState(null);
  const [pickAddress, setPickAddress] = useState(rideData.from_location);
  const [dropAddress, setDropAddress] = useState(rideData.to_location);
  const mapRef = useRef();
  const markerRef = useRef();


    ////Rider started ride
   
const riderStartedRide = async () => {

  var riderId = await AsyncStorage.getItem('riderId');

  const formData = new FormData();
  formData.append('driver_id', riderId);
  formData.append('car_id', 0);
  formData.append('ride_id', rideData.rideid);
  formData.append('userid', rideData.id);

  console.log('driver_id', riderId);
  console.log('car_id', 0);
  console.log('ride_id', rideData.rideid);
  console.log('userid', rideData.id);
  

  setTimeout(() => {
    fetch(`http://asaanweb.com/pirayo/index.php/Ride/riderstartedride`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(res => {
        console.log('Rider started the ride>>>>>>>>>>>>>>>> ', res);
        
        navigationService.navigate('YouAreOnDestinationFromDriverScreen', { 'remoteData': rideData });
      })
      .catch(error => console.log(error));
  }, 1000);
};

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


    useEffect(() => {
      const interval = setInterval(() => {

        getLocation();

     },5000);

      return () => clearInterval(interval)
   }, []);


  const pickDropAddress = async () => {
    try {
      let pick = await AsyncStorage.getItem('pickAddress');
      let drop = await AsyncStorage.getItem('dropAddress');

      setPickAddress(pick)
      setDropAddress(drop)

    } catch (error) {
      console.log(error);
    }
  };
  //pickDropAddress();


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

  rotationCar.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg']
  });

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



  return (
    <>
      <View
        style={{
          marginTop: 0,
          height: 500,
        }}>

        <MapView
          scrollEnabled={true}
          showsUserLocation={true}
          //showsTraffic={false}
          style={styles.map}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          initialRegion={location}
          coordinates={location}
        //loadingEnabled={true}
        //minZoomLevel={1}
        //maxZoomLevel={50}
        //zoomTapEnabled={true}
        //rotateEnabled={true}
        // onRegionChangeComplete={(location)=>{setLocation(location)}}
        // image={Images.MapCarSmall} add image to marker
        >
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
      </View>

      <PrimaryButton
        textColor={'white'}
        title={'Ride Start'}
        customStyles={styles.PrimaryButton}
        onPress={() => {
          riderStartedRide();
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
  // input: {
  //   // height: 50,
  //   // borderWidth: 1,
  //   borderBottomWidth: 0.2,
  //   height: 50,
  //   paddingHorizontal: 20,
  //   marginTop: 10,
  //   borderRadius: 10,
  //   width: '100%',
  //   height: 40,
  // },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    //opacity: 0.5,
  },
});