// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
//   Image,
//   FlatList,
//   Alert,
//   Button,
//   Platform,
//   Dimensions,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import {
//   AuthHeader,
//   AuthContainer,
//   PrimaryInput,
//   PrimaryButton,
//   Loading,
// } from '../../components';

// import React, {forwardRef} from 'react';
// import navigationService from '../../config/navigationService';
// import {Metrix, NavigationService, Images, Colors} from '../../config';
// // import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
// import SwipeButton from 'rn-swipe-button';
// import {Header, ListItem, Avatar} from 'react-native-elements';
// import {Center} from 'native-base';
// import {TextInput} from 'react-native-gesture-handler';
// import {showToast} from '../../config/utills';
// import {useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {duration} from 'moment';
// import Animated, {acc} from 'react-native-reanimated';
// import BottomSheet from 'reanimated-bottom-sheet';
// import {useEffect, useRef, useState} from 'react';
// import {Input} from 'react-native-elements';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import MapViewDirections from 'react-native-maps-directions';
// import MapView, {
//   PROVIDER_GOOGLE,
//   Marker,
//   Polyline,
//   animateToRegion,
//   AnimatedRegion,
// } from 'react-native-maps';
// import Geolocation, {watchPosition} from 'react-native-geolocation-service';

// function InputAutoComplete({label, placeholder, onPlaceSelected}) {
//   return (
//     <>
//       <Text>{label}</Text>
//       <GooglePlacesAutocomplete
//         value
//         placeholder={placeholder || ''}
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
//   );
// }

// export const Map = () => {
//   const [formattAddress, setformattAddress] = useState({});
//   const [pickup, setPickup] = useState(null);
//   const [dropoff, setDropoff] = useState(null);
//   const [resId, setResId] = useState('');
//   const [distance, setDistance] = useState(0);
//   const [timeDuration, setTimeDuration] = useState(0);
//   const [pick_up, setPick_up] = useState('');
//   const [drop_off, setDrop_off] = useState('');
//   const [luxuryFare, setLuxuryFare] = useState('');
//   const [standardFare, setstandardFare] = useState('');
//   const [basicFare, setBasicFare] = useState('');
//   const [location, setLocation] = useState(null);
//   const [active1, setActive1] = useState(false);
//   const [active2, setActive2] = useState(false);
//   const [active3, setActive3] = useState(false);
//   const Press1 = () => setActive1(!active1);
//   const Press2 = () => setActive2(!active2);
//   const Press3 = () => setActive3(!active3);
//   const [count, setCount] = useState(0);
//   const [latitude, setlatitude] = useState('');
//   const [longitude, setlongitude] = useState('');
//   const mapRef = useRef();
//   const markerRef = useRef();

//   // AsyncStorage.getItem('resId').then((res)=>{
//   //   setResId(res);
//   // });

//   // get location function
//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Geolocation Permission',
//           message: 'Can we access your location?',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       console.log('granted', granted);

//       if (granted === 'granted') {
//         console.log('You can use Geolocation');
//         Geolocation.getCurrentPosition(currentLatLng => {
//           console.log('currentLatLng', currentLatLng.coords);
//           setlatitude(currentLatLng.coords.latitude.toFixed(3));
//           setlongitude(currentLatLng.coords.longitude.toFixed(3));

//           const {width, height} = Dimensions.get('window');
//           const ASPECT_RATIO = width / height;
//           const LATITUDE_DELTA = 0.015;
//           const LONGITUTDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

//           const INITIAL_POSITION = {
//             latitude: currentLatLng.coords.latitude,
//             longitude: currentLatLng.coords.longitude,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUTDE_DELTA,
//           };
//           setLocation(INITIAL_POSITION);
//         });



//         return true;
//       } else {
//         console.log('You cannot use Geolocation');
//         return false;
//       }
//     } catch (err) {
//       return false;
//     }
//   };

//   // Geolocation.watchPosition(position => {
//   //   console.log('i am here start updating location');
//   //   setlatitude(position.coords.latitude.toFixed(3));
//   //   setlongitude(position.coords.longitude.toFixed(3));

//   //   const {width, height} = Dimensions.get('window');
//   //   const ASPECT_RATIO = width / height;
//   //   const LATITUDE_DELTA = 0.015;
//   //   const LONGITUTDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

//   //   const INITIAL_POSITION = {
//   //     latitude: position.coords.latitude,
//   //     longitude: position.coords.longitude,
//   //     latitudeDelta: LATITUDE_DELTA,
//   //     longitudeDelta: LONGITUTDE_DELTA,
//   //   };
//   //   setLocation(INITIAL_POSITION);
//   // });

//   const getLocation = () => {
//     const result = requestLocationPermission();

//     result.then(res => {
//       console.log('res is:', res);

//       if (res) {
//         // Geolocation.watchPosition(
//         //   currentLatLng => {
//         //       console.log('currentLatLng', currentLatLng.coords)
//         //   }
//         // )
//         //   Geolocation.watchPosition(
//         //     position => {
//         //         console.log('-----------------------start---------------------------------------')
//         //       console.log(position);
//         //       console.log('----------------------end--------------------------------')
//         // setlatitude(position.coords.latitude.toFixed(3));
//         // setlongitude(position.coords.longitude.toFixed(3));
//         // const {width, height} = Dimensions.get('window');
//         // const ASPECT_RATIO = width / height;
//         // const LATITUDE_DELTA = 0.015;
//         // const LONGITUTDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
//         // const INITIAL_POSITION = {
//         //   latitude: position.coords.latitude,
//         //   longitude: position.coords.longitude,
//         //   latitudeDelta: LATITUDE_DELTA,
//         //   longitudeDelta: LONGITUTDE_DELTA,
//         // };
//         // setLocation(INITIAL_POSITION);
//         //     },
//         // //   Geolocation.watchPosition(
//         // //   position => {
//         // //       setWatch({
//         // //         latitude: position.coords.latitude,
//         // //         longitude: position.coords.longitude,
//         // //     });
//         // //     console.log('watch>>>>>>>>>>>>>>>>>>>>>>>>>>', watch);
//         // //   },
//         // //   error => {
//         // //     console.log(error);
//         // //   },
//         // //   {
//         // //   //   showLocationDialog: true,
//         // //   //   enableHighAccuracy: true,
//         // //   //   timeout: 2000,
//         // //   //   maximumAge: 0,
//         // //   //   distanceFilter: 0
//         // //   }
//         // // ),
//         //     error => {
//         //       // See error code charts below.
//         //       console.log('error Code: error Message>>>', error.code, error.message);
//         //       setLocation(false);
//         //     },
//         //     // { enableHighAccuracy: false, timeout: 1000, maximumAge: 1000 },
//         //   )
//       }
//     });
//     //     console.log("get live location after 1 second")
//     //     let i=count;
//     //     i=count+1;
//     //     setCount(i);
//     //      var locationArray=[
//     // {latitude: pickup,longitude:dropoff},

//     //      ];
//     //      setlocationCount(locationArray.length);
//     //       console.log('locationCount: ',locationCount +' - '+'count: ',count);
//     //         if(locationArray.length!==count){
//     //             if(locationFlag!==1){
//     //             const { latitude, longitude } =locationArray[i-1];
//     //             console.log('latitude  ', latitude   );
//     //             console.log('longitude  ', longitude   );
//     //            // (latitude, longitude);
//     //             setState({
//     //                 ...state,
//     //                 //curLoc: { latitude, longitude },
//     //                 coordinate: new AnimatedRegion({
//     //                    location: location
//     //                 })
//     //             })
//     //           }
//     //           else{
//     //             console.log('setlocationFlag  ', '1'  );
//     //           }
//     //      }
//     //       else{
//     //         setlocationFlag(1);
//     //       }
//   };

//   //  Geolocation.getCurrentPosition(
//   //         currentLatLng => {
//   //             console.log('currentLatLng', currentLatLng.coords)
//   //         }
//   //       )

//   useEffect(() => {
//    //
//       getLocation();
//     // }, 1000);
   

      
//   }, []);

//   //  const animate = () => {

//   //       if(markerRef.current&&mapRef.current){
//   //       markerRef.current.animateMarkerToCoordinate(dropoff, 15000);
//   //       mapRef.current.fitToSuppliedMarkers(pickup),{ edgePadding:
//   //         {
//   //           },

//   //       };
//   //       }
//   //     else {
//   //       pickup.timing(pickup).start();
//   //   }
//   //   }

//   //

//   //
//   // const renderContent = () => (
//   //   <View
//   //     style={{
//   //       backgroundColor: 'white',
//   //       // padding: 16,
//   //       height: 400,
//   //       borderTopLeftRadius: 50,
//   //       borderTopRightRadius: 50,
//   //     }}>
//   //     {/* <Text>Swipe down to close</Text> */}
//   //     <View
//   //       style={{
//   //         // borderColor: 'black',
//   //         // borderWidth: 1,
//   //         height: 70,
//   //         backgroundColor: '#707070',
//   //         borderTopLeftRadius: 20,
//   //         borderTopRightRadius: 20,
//   //         alignItems: 'center',
//   //         justifyContent: 'center',
//   //       }}>
//   //       <Text style={{fontSize: 20, color: 'white'}}>Select A Ride</Text>
//   //     </View>
//   //     <View
//   //       style={{
//   //         flexDirection: 'row',
//   //         //   borderColor: 'black',
//   //         //   borderWidth: 1,
//   //         height: 80,
//   //         margin: 20,
//   //         justifyContent: 'center',
//   //         alignSelf: 'center',
//   //       }}>
//   //       <TouchableOpacity
//   //         onPress={() => {
//   //           Press1;
//   //           createTripLuxury();
//   //         }}>
//   //         <Image
//   //           source={Images.PriayoStandardremovebg}
//   //           style={{
//   //             //   borderColor: 'black',
//   //             //   borderWidth: 1,
//   //             height: 64,
//   //             width: 104,
//   //             marginTop: 30,
//   //             backgroundColor: active1 ? '#707070' : '#F4F4F4',
//   //             borderRadius: 10,
//   //           }}
//   //         />
//   //       </TouchableOpacity>
//   //       <TouchableOpacity
//   //         onPress={() => {
//   //           Press2;
//   //           createTripStandard();
//   //         }}>
//   //         <Image
//   //           source={Images.PriayoStandardremovebg}
//   //           style={{
//   //             //   borderColor: 'black',
//   //             //   borderWidth: 1,
//   //             height: 64,
//   //             width: 104,
//   //             marginTop: 30,
//   //             backgroundColor: active2 ? '#707070' : '#F4F4F4',
//   //             borderRadius: 10,
//   //             marginLeft: 20,
//   //           }}
//   //         />
//   //       </TouchableOpacity>
//   //       <TouchableOpacity
//   //         onPress={() => {
//   //           Press3;
//   //           createTripBasic();
//   //         }}>
//   //         <Image
//   //           source={Images.PriayoStandardremovebg}
//   //           style={{
//   //             //   borderColor: 'black',
//   //             //   borderWidth: 1,
//   //             height: 64,
//   //             width: 104,
//   //             marginTop: 30,
//   //             backgroundColor: active3 ? '#707070' : '#F4F4F4',
//   //             borderRadius: 10,
//   //             marginLeft: 20,
//   //           }}
//   //         />
//   //       </TouchableOpacity>
//   //     </View>
//   //     <View
//   //       style={{
//   //         flexDirection: 'row',
//   //         // borderColor: 'black',
//   //         // borderWidth: 1,
//   //         justifyContent: 'space-between',
//   //         marginRight: 20,
//   //         marginLeft: 20,
//   //       }}>
//   //       <Text>Pirayo Luxuary</Text>
//   //       <Text>Pirayo Standard</Text>
//   //       <Text>Pirayo Basic</Text>
//   //     </View>
//   //     <View>
//   //       <Text
//   //         style={{
//   //           justifyContent: 'center',
//   //           alignSelf: 'center',
//   //           fontSize: 34,
//   //           color: '#707070',
//   //         }}>
//   //         Estimated Fare
//   //       </Text>
//   //       <TextInput
//   //         defaultValue={`${luxuryFare} ${standardFare} ${basicFare}`}
//   //         style={{
//   //           justifyContent: 'center',
//   //           alignSelf: 'center',
//   //           fontSize: 34,
//   //           color: Colors.HeaderColour,
//   //         }}></TextInput>
//   //     </View>
//   //     <PrimaryButton
//   //       textColor={'white'}
//   //       title={'Create Trip'}
//   //       color={'#707070'}
//   //       customStyles={styles.PrimaryButton}
//   //       onPress={() => {
//   //        requestToastFromUser();
//   //        //navigationService.navigate('FindingCaptainScreenFromSolo');
//   //       }}
//   //     />
//   //   </View>
//   // );
//   const sheetRef = React.useRef(null);

//   // const moveTo = async position => {
//   //   console.log(position);
//   //   mapRef.current.animateToRegion(position, 3 * 1000);
//   //   setLocation(position);
//   // };

//   // const onPlaceSelected = (details, flag) => {
//   //   const set = flag === 'pickup' ? setPickup : setDropoff;
//   //   const position = {
//   //     latitude: details?.geometry.location.lat || 0,
//   //     longitude: details?.geometry.location.lng || 0,
//   //   };
//   //   set(position);
//   //   moveTo(position);
//   // };

//   const ready = res => {
//     mapRef.current.fitToCoordinates(res.coordinates, {
//       edgePadding: {
//         right: 30,
//         bottom: 300,
//         left: 30,
//         top: 100,
//       },
//       animated: true,
//     });
//     setDistance(res.distance); //res.distance
//     setTimeDuration(res.duration);
//   };

//   // AsyncStorage.setItem('distanceKM', distance.toString());
//   // AsyncStorage.setItem('timeDuration', timeDuration.toString());

//   //fetch Km & Distance from google
//   // let KmAndDis = () => {

//   //   AsyncStorage.getItem('distanceKM').then((dis)=>{
//   //     console.log('distance>>>>>>>>>>>>>>>>> ',dis)});
//   //   AsyncStorage.getItem('timeDuration').then((dura)=>{
//   //     console.log('duration>>>>>>>>>>>>>>>>> ',dura)});

//   // };
//   //

//   //for insert location on database
//   const confirmLocation = () => {
//     const formData = new FormData();
//     formData.append('pick_up', formattAddress.pick_up);
//     formData.append('drop_off', formattAddress.drop_off);

//     // console.log(formData);

//     fetch(
//       'http://asaanweb.com/pirayo/index.php/Vehicle_Controller/insert_location/5',
//       {
//         method: 'POST',
//         body: formData,
//       },
//     )
//       .then(response => response.json())
//       .then(res => {
//         console.log(res);
//       })
//       .catch(error => console.log(error));
//   };
//   //

//   //for insert location on firebase real time database
//   // const driverLatLngToFireBase = () => {

//   //   const formData = new FormData();
//   //   formData.append('pick_upLat', pickup.latitude);
//   //   formData.append('pick_upLong', pickup.longitude);
//   //   formData.append('drop_offLat', dropoff.latitude);
//   //   formData.append('pick_upLong', dropoff.longitude);

//   //   // console.log('pick_upLat', pickup.latitude)
//   //   // console.log('pick_upLong', pickup.longitude)
//   //   // console.log('drop_offLat', dropoff.latitude)
//   //   // console.log('pick_upLong', dropoff.longitude)

//   //   fetch (
//   //   'https://otp-testin-default-rtdb.firebaseio.com/userPick&DropLatLong.json',
//   //   {
//   //     method: 'POST',
//   //     body: JSON.stringify({formData})
//   //   },
//   // )
//   //   .then(response => response.json())
//   //   .then(res => {
//   //     console.log(res);
//   //   })
//   //   .catch(error => console.log(error));
//   // };
//   //

//   //for insert location on local database
//   // const userLatLongToDataBase = () => {

//   //   const formData = new FormData();
//   //   formData.append('from_location', formattAddress.pick_up);
//   //   formData.append('to_location', formattAddress.drop_off);
//   //   formData.append('id', userId);
//   //   formData.append('from_lat', pickup.latitude);
//   //   formData.append('from_long', pickup.longitude);
//   //   formData.append('to_lat', dropoff.latitude);
//   //   formData.append('to_long', dropoff.longitude);

//   //   console.log('from_location>>>>>>>>>', formattAddress.pick_up)
//   //   console.log('to_location>>>>>>>>', formattAddress.drop_off)
//   //   console.log('id>>>>>>>', resId)
//   //   console.log('from_lat>>>>>>>>>>', pickup.latitude)
//   //   console.log('from_long>>>>>>>>', pickup.longitude)
//   //   console.log('to_lat>>>>>>>', dropoff.latitude);
//   //   console.log('to_long>>>>>>>>>>', dropoff.longitude);

//   //   fetch (
//   //   'http://asaanweb.com/pirayo/index.php/Ride/driver_notifiction',
//   //   {
//   //     method: 'POST',
//   //     body: JSON.stringify({formData})
//   //   },
//   // )
//   //   .then(response => response.json())
//   //   .then(res => {
//   //     console.log('res>>>>>>>>>>>>>>', res);
//   //   })
//   //   .catch(error => console.log(error));
//   // };
//   //

//   //set location address in async storage
//   // const pickDrop = async () => {
//   //   AsyncStorage.setItem('pickAddress', formattAddress.pick_up);
//   //   AsyncStorage.setItem('dropAddress', formattAddress.drop_off);
//   //   try {
//   //     let setPick = await AsyncStorage.getItem('pickAddress');
//   //     let setDrop = await AsyncStorage.getItem('dropAddress');
//   //     // console.log(setPick);
//   //     // console.log(setDrop);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };
//   // pickDrop();
//   //

//   return (
//     <>
//       <View
//         style={{
//           // borderColor: 'black',
//           // borderWidth: 1,
//           //   flex: 1,
//           marginTop: 0,
//           height: '200%',
//         }}>
//         {/* <Image
//               source={Images.MapBig}
//               style={{
//                 //   borderColor: 'black',
//                 //   borderWidth: 1,
//                 height: 500,
//                 width: 500,
//                 alignSelf: 'flex-start',
//                 position: 'absolute',
//               }}></Image> */}

//         <MapView
//           scrollEnabled={true}
//           showsUserLocation={true}
//           showsTraffic={false}
//           style={styles.map}
//           ref={mapRef}
//           provider={PROVIDER_GOOGLE}
//           initialRegion={location}
//           onMapLoaded={() => {
//             console.log('>>>>>>>>>>>>>>>>>>>>>loaded');
//           }}
//           // onRegionChangeComplete={(location)=>{setLocation(location)}}
//           // image={Images.MapCarSmall} add image to marker
//         >
//           {pickup && (
//             <Marker
//               style={{
//                 paddingVertical: 1,
//                 paddingHorizontal: 1,
//                 borderRadius: 1,
//                 elevation: 1,
//                 transform: {rotate: `0deg`},
//               }}
//               ref={markerRef}
//               coordinate={pickup}
//               pinColor={'green'}
//               // image={ Images.ResizeCar }
//             />
//           )}
//           {dropoff && <Marker coordinate={dropoff} pinColor={'red'} />}
//           {/* {pickup && <Polyline coordinates={[location, pickup]}
//                // geodesic = {true}
//               // strokeColor={'black'}
//               // strokeWidth={5}
//               //lineDashPattern={[5]}
//             />} */}
//           {/* {dropoff && <Polyline coordinates={[pickup, dropoff]}
//               geodesic={true}
//               strokeColor={'hotpink'}
//               strokeWidth={5}
//               //lineDashPattern={[3]}
//             />} */}
//           <MapViewDirections
//             // origin={pickup}
//             origin={pickup}
//             destination={dropoff}
//             // coordinates={watch}
//             strokeColor="hotpink"
//             strokeWidth={4}
//             mode="DRIVING"
//             splitWaypoints={true}
//             timePrecision="none"
//             apikey="AIzaSyBa2ozEcLg_aU9nrsqxfz3_2dWc30s3cLo"
//             optimizeWaypoints={true}
//             onReady={ready}
//           />
//         </MapView>

//         {/* <View style={styles.searchContainer}> */}
//         {/* <InputAutoComplete
//               label="pickup"
//               onPlaceSelected={pick_up => {
//                 //animate()
//                 setformattAddress({...formattAddress,pick_up: pick_up.formatted_address})
//                 onPlaceSelected(pick_up, 'pickup');
//                 setPick_up(
//                   pick_up.address_components[1].long_name +
//                     ' ' +
//                     pick_up.address_components[2].short_name +
//                     ' ' +
//                     pick_up.address_components[3].short_name,
//                 );
//                 //console.log("detalis pickup >>>>> ",pickup)
//               }}
//               value={pick_up}
//               onChangeText={e => {
//                 setPick_up(e);
//               }}
//             /> */}

//         {/* <InputAutoComplete
//               label="dropoff"
//               onPlaceSelected={drop_off => {
//                 setformattAddress({...formattAddress,drop_off: drop_off.formatted_address})
//                 onPlaceSelected(drop_off, 'drop_off');
//                 setDrop_off(
//                   drop_off.address_components[0].short_name +
//                     ' ' +
//                     drop_off.address_components[1].short_name +
//                     ' ' +
//                     drop_off.address_components[2].short_name,
//                 );
//               }}
//               value={drop_off}
//               onChangeText={e => {
//                 setDrop_off(e);
//               }}
//             /> */}

//         {/* <View> */}
//         {/* {/* <Text>Distance: {distance.toFixed(2)} km</Text>
//               <Text>Duration: {Math.ceil(timeDuration)} min</Text> */}
//         {/* <Text>Lat: {location.latitude}</Text> */}
//         {/* <Text>Lat: {latitude} </Text> */}
//         {/* <Text>Long: {longitude} </Text> */}
//         {/* </View> */}

//         {/* <TouchableOpacity
//               style={styles.traceButton}
//               onPress={() => {
//                 confirmLocation();
//                 KmAndDis();
//                 userLatLongToDataBase();
//                 //animate();
//                 //driverLatLngToFireBase();
//               }}>
//               <Text style={styles.traceText}>Confirm Location</Text>
//             </TouchableOpacity> */}
//         {/* </View>
//          */}
//         {/* <View
//               style={{
//                 //   borderColor: 'black',
//                 //   borderWidth: 1,
//                 height: 150,
//                 width: '90%',
//                 alignSelf: 'center',
//                 marginTop: 50,
//                 backgroundColor: 'white',
//                 borderRadius: 10,
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}>
//               <Image
//                 source={Images.lineDropLocation}
//                 style={{marginLeft: 10}}></Image>
//               <View style={{width: '85%', flexDirection: 'column'}}>
//                 <Text>Pick Up</Text>
//                 <TextInput style={styles.input} placeholder="Dolmin Mall Clifton" />
//                 <Text style={{marginTop: 10}}>Drop Off</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Chase Up Super Mart Karachi"
//                 />
//               </View>
//             </View> */}
//       </View>

//       {/* <View
//           style={{
//             flex: 1,
//             // backgroundColor: 'papayawhip',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}></View>
//         <BottomSheet
//           ref={sheetRef}
//           snapPoints={[180, 450, 80]}
//           borderRadius={10}
//           renderContent={renderContent}
//         /> */}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     padding: 16,
//     // paddingTop: 100,
//   },
//   listItem: {
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: '#333',
//     padding: 25,
//   },
//   PrimaryButton: {
//     marginTop: 30,
//     width: '95%',
//     alignSelf: 'center',
//   },

//   input: {
//     // height: 50,
//     // borderWidth: 1,
//     borderBottomWidth: 0.2,
//     height: 50,
//     paddingHorizontal: 20,
//     marginTop: 10,
//     borderRadius: 10,
//     width: '100%',
//     height: 40,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
//   searchContainer: {
//     position: 'absolute',
//     width: '90%',
//     backgroundColor: 'white',
//     shadowColor: 'black',
//     shadowOffset: {width: 2, height: 2},
//     shadowOpacity: 0.5,
//     shadowRadius: 4,
//     elevation: 4,
//     padding: 8,
//     borderRadius: 8,
//     top: 40,
//     marginLeft: 15,
//   },
//   searchInput: {
//     borderColor: 'grey',
//     borderWidth: 1,
//   },
//   traceButton: {
//     backgroundColor: '#bbb',
//     paddingVertical: 12,
//     marginTop: 16,
//     borderRadius: 4,
//   },
//   traceText: {
//     textAlign: 'center',
//   },
//   searchContainer: {
//     position: 'absolute',
//     width: '90%',
//     backgroundColor: 'white',
//     shadowColor: 'black',
//     shadowOffset: {width: 2, height: 2},
//     shadowOpacity: 0.5,
//     shadowRadius: 4,
//     elevation: 4,
//     padding: 8,
//     borderRadius: 8,
//     top: 40,
//     marginLeft: 15,
//   },
// });



import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';

//import all the components we are going to use.
import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';


const MapComponent = () => {
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        
        setLocationStatus('You are Here');
        console.log(position);

        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
            }}
            style={{width: 100, height: 100}}
          />
          <Text style={styles.boldText}>
            {locationStatus}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Latitude: {currentLatitude}
          </Text>
          <View style={{marginTop: 20}}>
            <Button
              title="Button"
              onPress={getOneTimeLocation}
            />
          </View>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          React Native Geolocation
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
  },
});

export default MapComponent;