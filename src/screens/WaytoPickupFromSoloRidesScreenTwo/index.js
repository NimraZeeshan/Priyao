import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Animated,
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

import React, { useState, useEffect, useRef } from 'react';
import navigationService from '../../config/navigationService';
import { Metrix, NavigationService, Images, Colors } from '../../config';
import { firebase } from '@react-native-firebase/database';
// import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import SwipeButton from 'rn-swipe-button';
import { Header, ListItem, Avatar } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

import { Center, Spinner } from 'native-base';
import { Card } from 'react-native-shadow-cards';
import { TextInput } from 'react-native-gesture-handler';
import { Easing } from 'react-native-reanimated';



export const WaytoPickupFromSoloRidesScreenTwo = (props) => {

  console.log('data from notfication', props.route.params);

  const rideData =props.route.params.remoteData;
  console.log("WaytoPickupFromSoloRidesScreenTwo", rideData.id);

  const [pickAddress, setPickAddress] = useState(rideData.from_location);
  const [dropAddress, setDropAddress] = useState(rideData.to_location);
  const [location, setLocation] = useState(null);
  // const [heading, setHeading] = useState(null);
  const [distance, setDistance] = useState(0);
  const [timeDuration, setTimeDuration] = useState(0);
  const [name, setName] = useState('');
  const mapRef = useRef();
  const markerRef = useRef();

  const [userName, setUserName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');


  ////Rider Arrived
   
const riderArrived = async () => {

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
    fetch(`http://asaanweb.com/pirayo/index.php/Ride/RiderArrived`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(res => {
        console.log('Rider Arrived>>>>>>>>>>>>>>>> ', res);

        
        const ridesDbRef = firebase.app().database().ref(`/rides/${rideData.rideid}`);
        ridesDbRef.update({
          'isRiderArrived': true,
          
        }).then(() => {
          console.log("Rider arrived Status Updated");
          navigationService.navigate('YourRideStartFromSoloDriverScreen',{'remoteData':rideData});
        }).catch(e => console.log('error', e))
        
        
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
    const ridesDbRef = firebase.app().database().ref(`/rides/${rideData.rideid}`);
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      console.log("help1");
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log("help");
            console.log(position);
            const { width, height } = Dimensions.get('window');
            const ASPECT_RATIO = width / height;
            const LATITUDE_DELTA = 0.015;
            const LONGITUTDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

            const INITIAL_POSITION = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              heading: position.coords.heading,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUTDE_DELTA,
            };
            setLocation(INITIAL_POSITION);
            //setHeading(INITIAL_POSITION.heading);

            
        ridesDbRef.update({
          'rider_lat': position.coords.latitude,
          'rider_long': position.coords.longitude,
          
        }).then(() => {
          console.log("Rider Location Updated");
          
        }).catch(e => console.log('error', e))
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


    useEffect(() => {
      const interval = setInterval(() => {
       getLocation();

     },5000);
     
      return () => clearInterval(interval)


   }, []);
useEffect(() => {
  setTimeout(() => {
    fetch(`http://asaanweb.com/pirayo/index.php/Pirayo_Controller/profile_user/${rideData.id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(res => {
        console.log('User Details>>>>>>>>>>>>>>>> ', res);
      

      
        if(res.response.status==='true'){
      
          setUserName(res.response.data.fullname);
          setPhoneNum(res.response.data.contactnumber);
          
        }
        
      })
      .catch(error => console.log(error));
  }, 1000);

      
   }, []);

  //for set pick drop location and name to driver
  const cardAddress = async () => {
    try {
      let pick = await AsyncStorage.getItem('pickAddress');
      let drop = await AsyncStorage.getItem('dropAddress');
      let name = await AsyncStorage.getItem('emailname');
      setPickAddress(pick)
      setDropAddress(drop)
      setName(name)
    } catch (error) {
      console.log(error);
    }
  };
  //cardAddress();
  //

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
    setDistance(res.distance);
    setTimeDuration(res.duration);
  };


  const animating = () => {

    if (markerRef.current && mapRef.current) {
      markerRef.current.animateMarkerToCoordinate(location, 1000);
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

  //////////


  return (
    <>

      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 0,
        }}>

        {/* <Image style={{
         width: 340,
         height: 480,
         //marginVertical: 0,
      }}
       source={Images.MArkerMap}
     /> */}

        <MapView
        
          scrollEnabled={true}
          showsUserLocation={true}
          showsTraffic={false}
          style={styles.map}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          initialRegion={location}
          coordinates={location}
          loadingEnabled={true}
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

      <View
        style={{
          height: 45,
          width: 200,
          marginTop: -650,
          borderRadius: 50,
          borderColor: Colors.HeaderColour,
          backgroundColor: 'white',
          alignSelf: 'center',
          alignItems: 'center'
        }}>
        <View style={{
          height: 35,
          width: 90,
          marginTop: 5,
          marginHorizontal: 4,
          borderRadius: 50,
          backgroundColor: Colors.HeaderColour,
          alignSelf: 'flex-end',
        }}>
          <Text style={{ alignSelf: 'center', marginVertical: 8, fontWeight: 'bold', letterSpacing: 1, }}>Online</Text>
        </View>
      </View>

      <View style={{
        height: 60,
        width: 350,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginHorizontal: 4,
        marginTop: 275,
        backgroundColor: Colors.HeaderColour,
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold'
        }}>You are on the way to pick up</Text>
      </View>

      <View>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Card
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 270,
              width: '100%',
              // width: '95%',
              alignSelf: 'center',
              // marginLeft: 10,
              marginTop: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', width: 60 }}>

                <TouchableOpacity
                  onPress={() => {
                    navigationService.navigate('RideRequestTwo');
                  }}>
                    
                  <Image
                    source={Images.user}
                    style={{
                      height: 50.59,
                      width: 50.59,
                      marginLeft: 10,
                      marginTop: 5,
                      marginBottom:4,

                    }}></Image>
                </TouchableOpacity>

                <View
                  style={{
                    // borderColor: 'black',
                    // borderWidth: 1,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={Images.StraightLocation}
                    style={{ height: 54.91, width: 12, margin: 5, marginTop: 10 }}></Image>
                  <View style={{ flexDirection: 'column', margin: 5 }}>
                    <Text>Pick Up</Text>
                    <Text numberOfLines={2}>{pickAddress}</Text>
                    <Image source={Images.Line} style={{ width: 200 }}></Image>
                    <Text>Drop Off</Text>
                    <Text numberOfLines={2}> {dropAddress}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'column', width: 180 }}>

              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: 8,
                  // width: wp(20),
                  // borderColor: 'black',
                  // borderWidth: 1,
                  // width: '35%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    marginVertical: 55,
                    marginHorizontal: -16,
                    fontSize: 20,
                    color: 'silver',
                    fontWeight: 'bold',
                  }}>
                  {parseFloat(rideData.totalkm).toFixed(2)}Km Away
                </Text>
              </View>
            </View>

            <Image source={Images.Line} style={{ width: '100%' }}></Image>
            <View style={{
              margin: 10,
            }}>

              <PrimaryButton
                width={130}
                textColor={"white"}
                title={'Cancel'}
                color={Colors.HeaderColour}
                customStyles={styles.PrimaryButtonOne}
                onPress={() => {
                  navigationService.navigate('SoloRidesFromDriverRideTypeScreen');
                }} />

              <PrimaryButton
                width={130}
                textColor={'white'}
                title={'Arrive'}
                color={'#707070'}
                customStyles={styles.PrimaryButtonTwo}
                onPress={() => {
                  riderArrived();
                }}
              />

            </View>
          </Card>
        </View>

        <Text style={{ marginTop: -260, alignSelf: 'flex-start', marginHorizontal: 70 }}>{userName}</Text>
        <Text style={{ marginTop: -1, alignSelf: 'flex-start', marginHorizontal: 65, color: 'silver' }}>{phoneNum}</Text>

      </View>

    </>
  )
};

const styles = StyleSheet.create({
  PrimaryButtonOne: {
    marginHorizontal: 10,
    alignSelf: 'flex-start',
    backgroundColor: 'red',
  },
  PrimaryButtonTwo: {
    marginHorizontal: 10,
    marginTop: -40,
    alignSelf: 'flex-end',
  },
  map: {
    width: 352,
    height: '100%',
    borderRadius: 20,
    //marginVertical: 100,
    //marginTop: -20,
    marginHorizontal: 1,
  },

});