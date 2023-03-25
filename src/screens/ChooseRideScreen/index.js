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
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  AuthHeader,
  AuthContainer,
  PrimaryInput,
  PrimaryButton,
  Loading,

} from '../../components';

import React, { forwardRef } from 'react';
import navigationService from '../../config/navigationService';
import { Metrix, NavigationService, Images, Colors } from '../../config';
// import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import {Card} from 'react-native-shadow-cards';
//import { getDatabase, ref, set } from "firebase/database";
import SwipeButton from 'rn-swipe-button';
import { Header, ListItem, Avatar } from 'react-native-elements';
import { Button, Center } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import { showToast } from '../../config/utills';
import { useNavigation, useRoute } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { duration } from 'moment';
import Animated, { acc } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import { Input } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  animateToRegion,
  AnimatedRegion,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';






export const ChooseRideScreen = () => {

  const [formattAddress, setformattAddress] = useState({});
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [resId, setResId] = useState('');
  const [distance, setDistance] = useState(0);
  const [timeDuration, setTimeDuration] = useState(0);
  const [pick_up, setPick_up] = useState('');
  const [drop_off, setDrop_off] = useState('');
  const [luxuryFare, setLuxuryFare] = useState('');
  const [category_name, setCategory_Name] = useState('');
  const [basicFare, setBasicFare] = useState('');
  const [location, setLocation] = useState(null);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const Press1 = () => setActive1(!active1);
  const Press2 = () => setActive2(!active2);
  const Press3 = () => setActive3(!active3);
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [userDropoffAddress, setUserDropoffAddress] = useState("");
  const [pirayoCategory, setPirayoCategory] = useState([]);
  const mapRef = useRef();
  const markerRef = useRef();


  // get location function
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
            console.log('position', position);
            setlatitude(position.coords.latitude.toFixed(3));
            setlongitude(position.coords.longitude.toFixed(3));

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

         
        );
      }
    });

  };

  
useEffect(() => {
  //  const interval = setInterval(() => {
  getLocation();

  // },1000);
  //  return () => clearInterval(interval)
}, []);


const moveTo = async position => {
  mapRef.current.animateToRegion(position, 3 * 1000);
  setLocation(position);
};

const onPlaceSelected = (details, flag) => {
  const set = flag === 'pickup' ? setPickup : setDropoff;
  const position = {
    latitude: details?.geometry.location.lat || 0,
    longitude: details?.geometry.location.lng || 0,
  };
  set(position);
  moveTo(position);
};

const ready = res => {
  mapRef.current.fitToCoordinates(res.coordinates, {
    edgePadding: {
      right: 30,
      bottom: 300,
      left: 30,
      top: 100,
    },
    animated: true,
  });
  setDistance(res.distance); //res.distance
  setTimeDuration(res.duration);
};

AsyncStorage.setItem('distanceKM', distance.toString());
AsyncStorage.setItem('timeDuration', timeDuration.toString());





  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        // padding: 16,
        height: 520,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
      {/* <Text>Swipe down to close</Text> */}
      <View
        style={{
          height: 70,
          backgroundColor: '#707070',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 20, color: 'red'}}>Choose Ride</Text>
      </View>
      {/* ///////////////////////////CARD1 */}
      <Card style={{height: 120, alignSelf: 'center', marginTop: 10}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={Images.user}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 30.59,
                width: 26.59,
                alignSelf: 'flex-start',
                margin: 5,
              }}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                Suzuki Mehran
              </Text>
              <Text style={{fontSize: 13, color: '#97ADB6'}}>Asim Azhar</Text>
              <Text style={{fontSize: 13, color: '#707070'}}>
                2 Seats Available
              </Text>
            </View>
            <View style={{marginLeft: 10, flexDirection: 'column'}}>
              <Text style={{color: Colors.HeaderColour}}>PKR 350</Text>

              <View
                style={{
                  flexDirection: 'column',
                  marginTop: 10,
                  marginHorizontal: 6,
                }}>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      color: 'black',
                      marginBottom: -20,
                      // borderColor: 'black',
                      // borderWidth: 1,
                      borderRadius: 10,
                      // marginTop: 40,
                      // marginRight: -30,
                      backgroundColor: '#707070',
                    }}></View>
                </TouchableOpacity>
                <View style={{}}></View>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      color: 'black',
                      marginLeft: 20,
                      // borderColor: 'black',
                      // borderWidth: 1,
                      borderRadius: 10,
                     // marginTop: 10,
                      backgroundColor: '#707070',
                     //
                    }}></View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      color: 'black',
                      marginLeft: 20,
                      
                      // borderColor: 'black',
                      // borderWidth: 1,
                      borderRadius: 10,
                       marginTop: 2,
                      // marginHorizontal: -20,
                      backgroundColor: 'red',
                      // marginLeft: 5,
                    }}></View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      color: 'black',
                      marginTop: -15,
                      // borderColor: 'black',
                      // borderWidth: 1,
                      borderRadius: 10,
                      // marginTop: 10,
                      // marginHorizontal: 10,
                      backgroundColor: '#707070',
                      //marginLeft: 5,
                    }}></View>
                </TouchableOpacity>
              </View>
            </View>
            <Image
              source={Images.CarRide}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 33,
                width: 95,
                alignSelf: 'center',
                marginLeft: 5,
              }}></Image>
          </View>
          <View
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 50,
              width: '80%',
              alignSelf: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <Image
              source={Images.metlocation}
              style={{width: 15, height: 20}}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: '#97ADB6', fontSize: 10, marginLeft: 5}}>
                Pick Up
              </Text>
              <Text style={{marginLeft: 5, fontSize: 12}}>Suzuki Mehran</Text>
              <Image
                source={Images.Line}
                style={{width: 200, height: 1, marginTop: 10}}></Image>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: -10,
              }}>
              <Image
                source={Images.DropOffLocation}
                style={{width: 15, height: 20}}></Image>
              <View style={{flexDirection: 'column', width: '50%'}}>
                <Text style={{color: '#97ADB6', fontSize: 10, marginLeft: 5}}>
                  Drop Off
                </Text>
                <Text style={{marginLeft: 5, fontSize: 8}}>
                  Chase Up Super Mart Karachi
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
      {/* ///////////////////////////CARD2 */}
      <Card style={{height: 120, alignSelf: 'center', marginTop: 10,}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={Images.user}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 30.59,
                width: 26.59,
                alignSelf: 'flex-start',
                margin: 5,
              }}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                Suzuki Mehran
              </Text>
              <Text style={{fontSize: 13, color: '#97ADB6'}}>Asim Azhar</Text>
              <Text style={{fontSize: 13, color: '#707070'}}>
                2 Seats Available
              </Text>
            </View>
            <View style={{marginLeft: 10, flexDirection: 'column'}}>
              <Text style={{color: Colors.HeaderColour}}>PKR 350</Text>

              <View
                style={{
                  flexDirection: 'column',
                  marginTop: 10,
                  marginHorizontal: 15,
                }}>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      color: 'black',
                      marginStart: -10,
                      // borderColor: 'black',
                      // borderWidth: 1,
                      borderRadius: 10,
                      marginBottom: -20,
                      backgroundColor: '#00A8FF',
                    }}></View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      color: 'black',
                      // borderColor: 'black',
                      // borderWidth: 1,
                      borderRadius: 10,
                      marginLeft: 10,
                      backgroundColor: '#707070',
                    }}></View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      color: 'black',
                      marginLeft: 20,
                      // borderColor: 'black',
                      // borderWidth: 1,
                      borderRadius: 10,
                      marginLeft: 10,
                      backgroundColor: '#707070',
                      marginTop: 2,
                    }}></View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      color: 'black',
                      // borderColor: 'black',
                      // borderWidth: 1,
                      borderRadius: 10,
                      marginTop: -15,
                      backgroundColor: '#707070',
                      marginLeft: -10,
                    }}></View>
                </TouchableOpacity>
              </View>
            </View>
            <Image
              source={Images.CarRide}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 33,
                width: 95,
                alignSelf: 'center',
                marginLeft: 5,
              }}></Image>
          </View>
          <View
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 50,
              width: '80%',
              alignSelf: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <Image
              source={Images.metlocation}
              style={{width: 15, height: 20}}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: '#97ADB6', fontSize: 10, marginLeft: 5}}>
                Pick Up
              </Text>
              <Text style={{marginLeft: 5, fontSize: 12}}>Suzuki Mehran</Text>
              <Image
                source={Images.Line}
                style={{width: 200, height: 1, marginTop: 10}}></Image>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: -10,
              }}>
              <Image
                source={Images.DropOffLocation}
                style={{width: 15, height: 20}}></Image>
              <View style={{flexDirection: 'column', width: '50%'}}>
                <Text style={{color: '#97ADB6', fontSize: 10, marginLeft: 5}}>
                  Drop Off
                </Text>
                <Text style={{marginLeft: 5, fontSize: 8}}>
                  Chase Up Super Mart Karachi
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
      {/* ///////////////////////////CARD3 */}
      <Card style={{height: 120, alignSelf: 'center', marginTop: 10}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={Images.user}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 30.59,
                width: 26.59,
                alignSelf: 'flex-start',
                margin: 5,
              }}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                Suzuki Mehran
              </Text>
              <Text style={{fontSize: 13, color: '#97ADB6'}}>Asim Azhar</Text>
              <Text style={{fontSize: 13, color: '#707070'}}>
                2 Seats Available
              </Text>
            </View>
            <View style={{marginLeft: 10, flexDirection: 'column'}}>
              <Text style={{color: Colors.HeaderColour}}>PKR 350</Text>

              <View
                style={{
                  flexDirection: 'column',
                  marginTop: 5,
                  marginHorizontal: 18,
                }}>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      color: 'black',
                      // borderColor: 'black',
                      // borderWidth: 1,
                      borderRadius: 10,
                      marginHorizontal: 5,
                      backgroundColor: '#00A8FF',
                    }}></View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      color: 'black',
                      // borderColor: 'black',
                      // borderWidth: 1,
                      borderRadius: 10,
                      marginTop: -15,
                      backgroundColor: '#FF4797',
                      marginLeft: -12,
                    }}></View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      color: 'black',
                      // borderColor: 'black',
                      // borderWidth: 1,
                      borderRadius: 10,
                      marginTop: 4,
                      backgroundColor: '#00A8FF',
                      marginLeft: 5,
                    }}></View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      color: 'black',
                      // borderColor: 'black',
                      // borderWidth: 1,
                      borderRadius: 10,
                      marginTop: -15,
                      backgroundColor: '#707070',
                      marginLeft: -12,
                    }}></View>
                </TouchableOpacity>
              </View>
            </View>
            <Image
              source={Images.CarRide}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 33,
                width: 95,
                alignSelf: 'center',
                marginLeft: 5,
              }}></Image>
          </View>
          <View
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 50,
              width: '80%',
              alignSelf: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <Image
              source={Images.metlocation}
              style={{width: 15, height: 20}}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: '#97ADB6', fontSize: 10, marginLeft: 5}}>
                Pick Up
              </Text>
              <Text style={{marginLeft: 5, fontSize: 12}}>Suzuki Mehran</Text>
              <Image
                source={Images.Line}
                style={{width: 200, height: 1, marginTop: 10}}></Image>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: -10,
              }}>
              <Image
                source={Images.DropOffLocation}
                style={{width: 15, height: 20}}></Image>
              <View style={{flexDirection: 'column', width: '50%'}}>
                <Text style={{color: '#97ADB6', fontSize: 10, marginLeft: 5}}>
                  Drop Off
                </Text>
                <Text style={{marginLeft: 5, fontSize: 8}}>
                  Chase Up Super Mart Karachi
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Card>

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: hp('1.7%')
        }}>
        <PrimaryButton
          title={'Continue'}
          color={'#707070'}
          textColor={"white"}
          customStyles={styles.PrimaryButton}
          onPress={() => {
            navigationService.navigate('DriverInformationScreen');
          }}
        />
      </View>
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <>

      <View
        style={{
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
          initialRegion={location}
          coordinates={location}
          loadingEnabled={true}
        // onRegionChangeComplete={(location)=>{setLocation(location)}}
        // image={Images.MapCarSmall} add image to marker
        >
          {pickup && (
            <Marker
              style={{
                paddingVertical: 1,
                paddingHorizontal: 1,
                borderRadius: 1,
                elevation: 1,
                transform: { rotate: `0deg` },
              }}
              ref={markerRef}
              coordinate={pickup}
              pinColor={'green'}
            //image={ Images.ResizeCar }
            />
          )}
          {dropoff && <Marker coordinate={dropoff} pinColor={'red'} />}

          <MapViewDirections
            origin={pickup}
            destination={dropoff}
            //coordinates={watch}
            strokeColor="hotpink"
            strokeWidth={4}
            mode="DRIVING"
            splitWaypoints={true}
            timePrecision="none"
            apikey="AIzaSyBa2ozEcLg_aU9nrsqxfz3_2dWc30s3cLo"
            optimizeWaypoints={true}
            onReady={ready}
          />
        </MapView>

        <View style={styles.searchContainer}>
          <Text>Pickup</Text>
          <GooglePlacesAutocomplete
          textInputProps={{
          defaultValue: pick_up,
          //value: pick_up,
          autoFocus: true,
          onChangeText: e => setPick_up(e)
          }}
          fetchDetails={true}
          onPress={(data, details = null) => {
          setformattAddress({
          ...formattAddress,
          pick_up: details.formatted_address,
          });
          onPlaceSelected(details, 'pickup');
          setPick_up(
          details.address_components[0].short_name +
          ' ' +
          details.address_components[1].short_name +
          ' ' +
          details.address_components[2].short_name,
          );
          }}
          query={{
          key: 'AIzaSyBa2ozEcLg_aU9nrsqxfz3_2dWc30s3cLo', //AIzaSyDl1o-AKSOZCAqeAY0NTnDNaYveMyXGNyw
          language: 'en',
          components: 'country:pk',
          }}

        />

      <Text>Dropoff</Text>
      <GooglePlacesAutocomplete
      textInputProps={{
      defaultValue: drop_off,
      value: drop_off,
      onChangeText: e => setDrop_off(e)
      }}
      fetchDetails={true}
      onPress={(data, details = null) => {
        setformattAddress({
          ...formattAddress,
          drop_off: details.formatted_address,
        });
        onPlaceSelected(details, 'dropoff');
        setDrop_off(
          details.address_components[0].short_name +
          ' ' +
          details.address_components[1].short_name +
          ' ' +
          details.address_components[2].short_name,
        );
      }}
      query={{
        key: 'AIzaSyBa2ozEcLg_aU9nrsqxfz3_2dWc30s3cLo',
        language: 'en',
        components: 'country:pk',
      }}
    />

  <View>
 </View>

      <TouchableOpacity
      style={styles.traceButton}
      onPress={() => {
      //confirmLocation();
      //KmAndDis();
      userNotificationToDriver();
      //fetchingDriver();
      //writeUserData();
      //animate();
      //driverLatLngToFireBase();
      }}>
      <Text style={styles.traceText}>Confirm Location</Text>
      </TouchableOpacity>
      </View>

 </View>


 <BottomSheet
 ref={sheetRef}
 snapPoints={[180, 450, 80]}
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
    width: '65%',
    alignSelf: 'flex-end'
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    },
    searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: 40,
    marginLeft: 15,
    },
    searchInput: {
    borderColor: 'grey',
    borderWidth: 1,
    },
    traceButton: {
    backgroundColor: '#bbb',
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
    },
    traceText: {
    textAlign: 'center',
    },
    searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: 40,
    marginLeft: 15,
    },
 
});