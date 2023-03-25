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

import React from 'react';
import navigationService from '../../config/navigationService';
import { Metrix, NavigationService, Images, Colors } from '../../config';
// import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import SwipeButton from 'rn-swipe-button';
import { Header, ListItem, Avatar } from 'react-native-elements';
import { Center } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
// import {useState, useRef} from 'react';
import Modal from 'react-native-modal';
import { Card } from 'react-native-shadow-cards';
import { useEffect, useRef, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapViewDirections from 'react-native-maps-directions';
import { Easing } from 'react-native-reanimated';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { CancelUserScreen } from '../CancelUserScreen';


export const YouAreOnWayFromSoloDriverScreen = (props) => {

  console.log('data from notfication', props.route.params);

  const rideData = props.route.params.remoteData;
  console.log("YouAreOnWayFromSoloDriverScreen", rideData.id);
  // const [isModalVisible, setModalVisible] = useState(false);

  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };
  const [location, setLocation] = useState(null);
  const [pickAddress, setPickAddress] = useState(rideData.from_location);
  const [dropAddress, setDropAddress] = useState(rideData.to_location);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const Press1 = () => setActive1(!active1);
  const Press2 = () => setActive2(!active2);
  const Press3 = () => setActive3(!active3);
  const mapRef = useRef();
  const markerRef = useRef();

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

    }, 5000);

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



  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        // padding: 16,
        height: 250,
        marginVertical: 260,
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
        <TouchableOpacity
          onPress={() => {
            navigationService.navigate('YouAreOnDestinationFromDriverScreen', { 'remoteData': rideData });

          }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1 }}>You are on the way to Drop Off k</Text>
        </TouchableOpacity>
      </View>
      {/* 
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
            source={Images.UserPic}
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 97.2,
              width: 97.2,
              marginLeft: 50,
            }}
          />
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
            <Text>Toyota Corolla</Text>
            <Text style={{color: Colors.HeaderColour, fontSize: 20}}>
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
        </View> */}
      {/* <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            width: 352,
            height: 70,
            backgroundColor: 'silver',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            marginHorizontal: 3,
            alignItems: 'center',
            justifyContent: 'center',
          }}>

        <PrimaryButton
          textColor={"white"}
          title={'End Ride'}
          customStyles={styles.PrimaryButton}
          onPress={() => {
            navigationService.navigate('PAymentScreen'); //toggleModal
          }}
        />
        </View> */}

      {/* <View style={{flex: 1}}>
          <PrimaryButton title="Show modal" onPress={toggleModal} />
  
          <Modal isVisible={isModalVisible}>
            <View style={{backgroundColor: 'white', borderRadius: 10}}>
              <View
                style={{
                  // borderColor: 'black',
                  // borderWidth: 1,
                  height: 50,
                  backgroundColor: Colors.HeaderColour,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 20}}>Select a reason</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigationService.navigate('PaymentFeedbackScreen');
                }}>
                <Card
                  style={{
                    margin: 10,
                    height: 50,
                    alignSelf: 'center',
                    width: '95%',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={Images.Ellipse}
                    style={{
                      width: 16,
                      height: 16,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginLeft: 5,
                    }}></Image>
                  <Text style={{alignSelf: 'center', marginLeft: 5}}>
                    I don't need the ride anymore
                  </Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity>
                <Card
                  style={{
                    margin: 10,
                    height: 50,
                    alignSelf: 'center',
                    width: '95%',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={Images.Ellipse}
                    style={{
                      width: 16,
                      height: 16,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginLeft: 5,
                    }}></Image>
                  <Text style={{alignSelf: 'center', marginLeft: 5}}>
                    I changed my mind
                  </Text>
                </Card>
              </TouchableOpacity>
  
              <TouchableOpacity>
                <Card
                  style={{
                    margin: 10,
                    height: 50,
                    alignSelf: 'center',
                    width: '95%',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={Images.Ellipse}
                    style={{
                      width: 16,
                      height: 16,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginLeft: 5,
                    }}></Image>
                  <Text style={{alignSelf: 'center', marginLeft: 5}}>
                    Captain isn't replying
                  </Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity>
                <Card
                  style={{
                    margin: 10,
                    height: 50,
                    alignSelf: 'center',
                    width: '95%',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={Images.Ellipse}
                    style={{
                      width: 16,
                      height: 16,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginLeft: 5,
                    }}></Image>
                  <Text style={{alignSelf: 'center', marginLeft: 5}}>
                    Car or captain details didn't match
                  </Text>
                </Card>
              </TouchableOpacity>
  
              <PrimaryButton
                textColor={'white'}
                title="Proceed"
                onPress={() => {
                  navigationService.navigate('CancelUserScreen');
                }} //toggleModal
                customStyles={styles.PrimaryButton}
                />
            </View>
          </Modal>
        </View> */}
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
          height: '100%',
        }}>

        <MapView
          scrollEnabled={true}
          showsUserLocation={false}
          //showsTraffic={false}
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


        <View
          style={{
            height: 45,
            width: 200,
            marginTop: 20,
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

        <View
          style={{
            //   borderColor: 'black',
            //   borderWidth: 1,
            height: 170,
            width: '95%',
            alignSelf: 'center',
            marginTop: 10,
            backgroundColor: 'white',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={Images.lineDropLocation}
            style={{ marginLeft: 10 }}></Image>
          <View style={{ width: '85%', flexDirection: 'column' }}>
            <Text>Pick Up</Text>
            <TextInput>{pickAddress}</TextInput>
            <Text style={{ marginTop: 10 }}>Drop Off</Text>
            <TextInput>{dropAddress}</TextInput>
          </View>
        </View>
      </View>

      <View style={{
        height: 60,
        width: 350,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginHorizontal: 4,
        marginTop: -60,
        backgroundColor: Colors.HeaderColour,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <TouchableOpacity onPress={() => {
          //navigationService.navigate('YouAreOnDestinationFromSoloDriverScreen');
          navigationService.navigate('YouAreOnDestinationFromDriverScreen', { 'remoteData': rideData });
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold'
          }}>You are on the way to drop off</Text>
        </TouchableOpacity>
      </View>
      {/* <PrimaryButton
            title="Open Bottom Sheet"
            onPress={() => sheetRef.current.snapTo(1)}
          /> */}
      {/* <View
          style={{
            flex: 1,
            // backgroundColor: 'papayawhip',
            alignItems: 'center',
            justifyContent: 'center',
          }}></View>
        <BottomSheet
          ref={sheetRef}
          snapPoints={[350, 400, 400]}
          borderRadius={10}
          renderContent={renderContent}
        /> */}
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
    width: '75%',
    alignSelf: 'center',
    backgroundColor: '#707070',
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
