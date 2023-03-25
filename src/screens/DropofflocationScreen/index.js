// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
//   Image,
//   FlatList,
//   spinnerVisibility,
// } from 'react-native';
// import {
//   AuthHeader,
//   AuthContainer,
//   PrimaryInput,
//   PrimaryButton,
//   Loading,
// } from '../../components';

// import React from 'react';
// import navigationService from '../../config/navigationService';
// import {Metrix, NavigationService, Images} from '../../config';
// // import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
// import SwipeButton from 'rn-swipe-button';
// import {Header, ListItem, Avatar} from 'react-native-elements';
// import {Center} from 'native-base';
// import {TextInput} from 'react-native-gesture-handler';
// import PhoneInput from 'react-native-phone-number-input';

// import {Searchbar} from 'react-native-paper';
// import SearchBar from 'react-native-dynamic-search-bar';
// import {useRef, useCallback} from 'react';
// import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

// export const DropofflocationScreen = () => {
//   const [searchQuery, setSearchQuery] = React.useState('');

//   const onChangeSearch = query => setSearchQuery(query);

//   handleOnChangeText = text => {
//     // ? Visible the spinner
//     this.setState({
//       searchText: text,
//       spinnerVisibility: true,
//     });

//     // ? After you've done to implement your use-case
//     // ? Do not forget to set false to spinner's visibility
//     this.setState({
//       spinnerVisibility: false,
//     });
//   };
//   return (
//     <>
//       <View style={{flex: 1, borderWidth: 1}}>
//         <MapView
//           provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//           style={styles.map}
//           region={{
//             latitude: 24.8825,
//             longitude: 67.0694,
//             latitudeDelta: 0.015,
//             longitudeDelta: 0.0121,
//           }}>
//           <Marker
//             coordinate={{latitude: 24.8825, longitude: 67.0694}}
//             pinColor={'purple'} // any color
//             title={'HEllo'}
//             description={'description'}
//             image={Images.MArkerMap}

//             // image={Images.MArkerMap}
//           />
//           <GooglePlacesAutocomplete
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
//               key: 'AIzaSyBa2ozEcLg_aU9nrsqxfz3_2dWc30s3cLo',
//               language: 'en',
//             }}
//           />
//         </MapView>

//         <TouchableOpacity
//           onPress={() => {
//             navigationService.goBack();
//           }}>
//           <Image style={styles.close} source={Images.CrossBtn} size={13} />
//         </TouchableOpacity>
//         <Searchbar
//             style={styles.SeacrhBAr}
//             placeholder="Search"
//             onChangeText={onChangeSearch}
//             value={searchQuery}
//           />
          
//         <View>
//             <SearchBar
//               style={styles.SeacrhBAr}
//               //   height={50}
//               //   fontSize={24}
//               //   fontColor="#fdfdfd"
//               iconColor="#fdfdfd"
//               //   shadowColor="#282828"
//               cancelIconColor="#fdfdfd"
//               backgroundColor="white"
//               spinnerVisibility={spinnerVisibility}
//               //   placeholder="Search any cosmetics ..."
//               //   fontFamily="BurbankBigCondensed-Black"
//               //   shadowStyle={styles.searchBarShadowStyle}
//               onChangeText={this.handleOnChangeText}
//             />
//           </View>
//       </View>
//       {/* <View style={styles.container}>
//           <Image
//             resizeMode="cover"
//             style={styles.cover}
//             source={Images.MapBig}
//           />
//           <Image style={styles.close} source={Images.CrossBtn} size={25} />
//         </View> */}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     margin: 5,
//     width: 160,
//     height: 200,
//   },
//   cover: {
//     flex: 1,
//     borderRadius: 5,
//   },
//   close: {
//     // margin:,
//     position: 'absolute',
//     top: 35,
//     left: 20,
//     width: 13,
//     height: 13,
//     color: 'tomato',
//   },
//   SeacrhBAr: {
//     // margin: 50,
//     marginTop: 50,
//     width: '200%',
//     marginLeft: 230,
//     height: 50,
//   },

//   ////////////////////////////////MAP//////////////////////////
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: 400,
//     width: 400,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//     borderRadius: 30,
//   },
// });
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';

 import navigationService from '../../config/navigationService';
 //import Geolocation from '@react-native-community/geolocation';
 import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
 import {Images, Colors} from '../../config';
 import { PrimaryButton } from '../../components';

 export const DropofflocationScreen = () => {
  return (
    <>
    <Image style={{
       width: 340,
       height: 480,
       //marginVertical: 0,
    }}
     source={Images.MArkerMap}
   />
   <TouchableOpacity style={{ marginTop: 21,  }} onPress={() => { navigationService.navigate('HomeScreen')}}>
   </TouchableOpacity>
 <MapView
   provider={PROVIDER_GOOGLE} // remove if not using Google Maps
 style={{
       width: 352,
       height: 650,
       //marginVertical: 100,
       marginVertical: -500,
       marginHorizontal: 1,
 }}
   region={{
     latitude: 24.8825,
     longitude: 67.0694,
     latitudeDelta: 0.015,
     longitudeDelta: 0.0121,
   }}>
   <Marker
     coordinate={{latitude: 24.8825, longitude: 67.0694}}
     pinColor={'red'} // any color
     title={'Hello'}
     description={'getting you soon'}
    // image={Images.Map}

     image={Images.MArkerMap}
   />
 </MapView>
          <TextInput
            placeholder="Enter drop off location"
            placeholderTextColor='black'
            style={{
              borderWidth: 1,
              height: 50,
              paddingHorizontal: 20,
              marginHorizontal: 20,
              marginTop: -100,
              borderRadius: 10,
              borderColor: 'silver',
              width: '90%',
            }}></TextInput>
          <TouchableOpacity onPress={() => {
              navigationService.navigate('RideShareScreen');
            }}>
             <Image style={{
              position: 'absolute',
              right: 30,
              backgroundColor: 'white',
              borderRadius: 2,
              height: 21,
              width: 21,
              top: -35,
             }}
                source={Images.magnifying}
                //style={styles.icon}
                name="your-icon"
                size={10}
              />
            </TouchableOpacity>

    </>
 )
 }