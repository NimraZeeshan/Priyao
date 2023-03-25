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
  Platform,
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
import Animated, { acc } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import { Input } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, animateToRegion, AnimatedRegion } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

// type InputAutoCompleteProps = {
//   label: string;
//   placeholder?: string;
//   value: string;
//   onPlaceSelected: (details: GooglePlaceDetail | null) => void;
// };

// function InputAutoComplete({
//   label,
//   placeholder,
//   onPlaceSelected,
// }: InputAutoCompleteProps) {

//   return (
//     <>
//       <Text>{label}</Text>
//       <GooglePlacesAutocomplete
//         value
//         placeholder={placeholder || ""}
//         fetchDetails={true}
//         onPress={(data, details = null) => {
//           onPlaceSelected(details);
//         }}
//         query={{
//           key: 'AIzaSyBa2ozEcLg_aU9nrsqxfz3_2dWc30s3cLo', //AIzaSyDl1o-AKSOZCAqeAY0NTnDNaYveMyXGNyw
//           language: 'en',
//           components: 'country:pk',
//         }}
//       />
//     </>
//   )
// };


export const PickupDropoffCard = () => {

  // const [pickup, setPickup] = useState(null);
  // const [dropoff, setDropoff] = useState(null);
  // const [pick_up, setPick_up] = useState('');
  // const [drop_off, setDrop_off] = useState('');
  // const [distance, setDistance] = useState(0);
  // const [timeDuration, setTimeDuration] = useState(0);
  // const [location, setLocation] = useState(null);
  // const mapRef = useRef();
  // const pickupRef = useRef();
  // const dropoffRef = useRef();
  // const markerRef = useRef();

  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Geolocation Permission',
  //         message: 'Can we access your location?',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     console.log('granted', granted);
  //     if (granted === 'granted') {
  //       console.log('You can use Geolocation');
  //       return true;
  //     } else {
  //       console.log('You cannot use Geolocation');
  //       return false;
  //     }
  //   } catch (err) {
  //     return false;
  //   }
  // };

  // const getLocation = () => {
  //   const result = requestLocationPermission();
  //   result.then(res => {
  //     console.log('res is:', res);
  //     if (res) {
  //       Geolocation.getCurrentPosition(
  //         position => {
  //           console.log(position);
  //           const { width, height } = Dimensions.get("window");
  //           const ASPECT_RATIO = width / height;
  //           const LATITUDE_DELTA = 0.015;
  //           const LONGITUTDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  //           const INITIAL_POSITION = {
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //             latitudeDelta: LATITUDE_DELTA,
  //             longitudeDelta: LONGITUTDE_DELTA,
  //           }
  //           setLocation(INITIAL_POSITION);
  //         },
  //         error => {
  //           // See error code charts below.
  //           console.log(error.code, error.message);
  //           setLocation(false);
  //         },
  //         // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
  //       );
  //     }
  //   })
  //   console.log(location)
  // };
  // useEffect(() => {
  //   getLocation();
  // }, [])

  // const moveTo = async (position) => {
  //   console.log(position);
  //   // mapRef.current.animateToRegion(position, 3 * 1000);
  //   setLocation(position);
  // };

  // const onPlaceSelected = (details: GooglePlaceDetail | null, flag: "pickup" | "dropoff") => {
  //   const set = flag === "pickup" ? setPickup : setDropoff
  //   const position = {
  //     latitude: details?.geometry.location.lat || 0,
  //     longitude: details?.geometry.location.lng || 0,
  //   }
  //   set(position);
  //   moveTo(position);

  // };

  // const ready = (res) => {
  //   mapRef.current.fitToCoordinates(res.coordinates, {
  //     // edgePadding: {
  //     //   right: 30,
  //     //   bottom: 300,
  //     //   left: 30,
  //     //   top: 100,
  //     // },
  //     animated: true,
  //   });
  //   setDistance(res.distance)
  //   setTimeDuration(res.duration)
  // };

  // const confirmLocation = () => {
  //   // console.log(pick_up)
  //   // console.log(drop_off)
  //   const formData = new FormData();
  //   formData.append('pick_up', pick_up);
  //   formData.append('drop_off', drop_off);

  //   console.log(formData)

  //   fetch('http://asaanweb.com/pirayo/index.php/Vehicle_Controller/insert_location', {
      
  //     method: 'POST',
  //     body: formData
  //   })
  //     .then((response) => response.json())
  //     .then(res => { console.log(res) })
  //     .catch(error => console.log(error));
  // }

  // return (
  //   <>
  //     <View
  //       style={{
  //         // borderColor: 'black',
  //         // borderWidth: 1,
  //         //   flex: 1,
  //         marginTop: 0,
  //         height: '200%',
  //       }}>
  //       {/* <Image
  //           source={Images.MapBig}
  //           style={{
  //             //   borderColor: 'black',
  //             //   borderWidth: 1,
  //             height: 500,
  //             width: 500,
  //             alignSelf: 'flex-start',
  //             position: 'absolute',
  //           }}></Image> */}

  //       <MapView scrollEnabled={true} showsUserLocation={true} showsTraffic={false}
  //         style={styles.map} ref={mapRef} provider={PROVIDER_GOOGLE} initialRegion={location}
  //       //  onRegionChangeComplete={(location)=>{setLocation(location)}}
  //       // image={Images.MapCarSmall} add image to marker
  //       >
  //         {pickup && <Marker style={{ paddingVertical: 1, paddingHorizontal: 1, borderRadius: 1, elevation: 1 }} ref={markerRef} coordinate={pickup} pinColor={'red'} />}
  //         {dropoff && <Marker coordinate={dropoff} pinColor={'green'} />}
  //         {/* {pickup && <Polyline coordinates={[location, pickup]}
  //            // geodesic = {true}
  //           // strokeColor={'black'}
  //           // strokeWidth={5}
  //           //lineDashPattern={[5]}
  //         />} */}
  //         {/* {dropoff && <Polyline coordinates={[pickup, dropoff]}
  //           geodesic={true}
  //           strokeColor={'hotpink'}
  //           strokeWidth={5}
  //           //lineDashPattern={[3]}
  //         />} */}
  //         <MapViewDirections
  //           origin={pickup}
  //           destination={dropoff}                   
  //           strokeColor="hotpink"
  //           strokeWidth={4}
  //           mode='DRIVING'
  //           splitWaypoints={true}
  //           timePrecision='now'
  //           apikey="AIzaSyBa2ozEcLg_aU9nrsqxfz3_2dWc30s3cLo"
  //           optimizeWaypoints={true}
  //           onReady={ready}
  //         />

  //         {/* <GooglePlacesAutocomplete
  //             placeholder="Search"
  //             styles={{
  //               textInput: {
  //                 marginTop: 50,
  //                 marginRight: 10,
  //                 marginLeft: 10,
  //               },
  //             }}
  //             onPress={(data, details = null) => {
  //               // 'details' is provided when fetchDetails = true
  //               console.log(data, details);
  //             }}
  //             query={{
  //               key: 'AIzaSyDl1o-AKSOZCAqeAY0NTnDNaYveMyXGNyw', //AIzaSyBa2ozEcLg_aU9nrsqxfz3_2dWc30s3cLo
  //               language: 'en',
  //             }}
  //           /> */}
  //       </MapView>

  //       <View style={styles.searchContainer}>

  //         <InputAutoComplete
  //           label="pickup"
  //           onPlaceSelected={(pick_up) => {
  //             //animate()
  //             onPlaceSelected(pick_up, "pickup");
  //             setPick_up(pick_up.address_components[1].long_name + " " + pick_up.address_components[2].short_name + " " + pick_up.address_components[3].short_name)
  //             //console.log("detalis pickup >>>>> ",pickup)
  //           }}
  //           value={pick_up}
  //           onChangeText={e => {
  //             setPick_up(e)
  //           }}
  //         />

  //         <InputAutoComplete
  //           label="dropoff"
  //           onPlaceSelected={(drop_off) => {
  //             onPlaceSelected(drop_off, "drop_off");
  //             setDrop_off(drop_off.address_components[0].short_name + " " + drop_off.address_components[1].short_name + " " + drop_off.address_components[2].short_name)
  //             //animate()
  //           }}
  //           value={drop_off}
  //           onChangeText={e => {
  //             setDrop_off(e)
  //           }}
  //         />

  //         <View>
  //           <Text>Distance: {distance.toFixed(2)} km</Text>
  //           <Text>Duration:  {Math.ceil(timeDuration)} min</Text>
  //           {/* <Text>Lat: {location.latitude}</Text>
  //         <Text>Long: {location.longitude}</Text> */}
  //         </View>

  //         <TouchableOpacity style={styles.traceButton} onPress={() => {
  //           confirmLocation()
  //         }}>
  //           <Text style={styles.traceText}>Confirm Location</Text>
  //         </TouchableOpacity>
  //       </View>

  //       {/* <View
  //           style={{
  //             //   borderColor: 'black',
  //             //   borderWidth: 1,
  //             height: 150,
  //             width: '90%',
  //             alignSelf: 'center',
  //             marginTop: 50,
  //             backgroundColor: 'white',
  //             borderRadius: 10,
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //           }}>
  //           <Image
  //             source={Images.lineDropLocation}
  //             style={{marginLeft: 10}}></Image>
  //           <View style={{width: '85%', flexDirection: 'column'}}>
  //             <Text>Pick Up</Text>
  //             <TextInput style={styles.input} placeholder="Dolmin Mall Clifton" />
  //             <Text style={{marginTop: 10}}>Drop Off</Text>
  //             <TextInput
  //               style={styles.input}
  //               placeholder="Chase Up Super Mart Karachi"
  //             />
  //           </View>
  //         </View> */}
  //     </View>

  //   </>
  // )
};

const styles = StyleSheet.create({
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
  map: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  traceButton: {
    backgroundColor: '#bbb',
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4
  },
  traceText: {
    textAlign: 'center',
  },
})

