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
  import {Metrix, NavigationService, Images} from '../../config';
  // import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
  import SwipeButton from 'rn-swipe-button';
  import {Header, ListItem, Avatar} from 'react-native-elements';
  import {Center} from 'native-base';
  import {TextInput} from 'react-native-gesture-handler';
  import Animated from 'react-native-reanimated';
  import BottomSheet from 'reanimated-bottom-sheet';
  // import {useState, useRef} from 'react';
  import {useEffect, useRef, useState} from 'react';
  import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
  import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
  import Geolocation from 'react-native-geolocation-service';
  import {Card} from 'react-native-shadow-cards';
  import { Colors } from 'react-native/Libraries/NewAppScreen';
  


  
  export const DriverRideStart = () => {
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
          <View
            style={{
              // borderColor: 'black',
              // borderWidth: 1,
              //   flex: 1,
              marginTop: 0,
              height: 500,
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

          <PrimaryButton
          textColor={'white'}
          title={'Ride Start'}
          customStyles={styles.PrimaryButton}
          onPress={() => {
            navigationService.navigate('YouAreOnWayFromDriverScreen');
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
      opacity: 0.5,
    },
  });