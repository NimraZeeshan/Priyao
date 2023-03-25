import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';

 import navigationService from '../../config/navigationService';
 //import Geolocation from '@react-native-community/geolocation';
 import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
 import {Images, Colors} from '../../config';
 import { PrimaryButton } from '../../components';


  export const SetYourLocation = () => {
   // const [
   //    currentLongitude,
   //    setCurrentLongitude
   //  ] = useState('...');
   //  const [
   //    currentLatitude,
   //    setCurrentLatitude
   //  ] = useState('...');
   //  const [
   //    locationStatus,
   //    setLocationStatus
   //  ] = useState('');
   
   //  useEffect(() => {
   //    const requestLocationPermission = async () => {
   //      if (Platform.OS === 'ios') {
   //        getOneTimeLocation();
   //        subscribeLocationLocation();
   //      } else {
   //        try {
   //          const granted = await PermissionsAndroid.request(
   //            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
   //            {
   //              title: 'Location Access Required',
   //              message: 'This App needs to Access your location',
   //            },
   //          );
   //          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
   //            //To Check, If Permission is granted
   //            getOneTimeLocation();
   //            subscribeLocationLocation();
   //          } else {
   //            setLocationStatus('Permission Denied');
   //          }
   //        } catch (err) {
   //          console.warn(err);
   //        }
   //      }
   //    };
   //    requestLocationPermission();
   //    return () => {
   //      Geolocation.clearWatch(watchID);
   //    };
   //  }, []);
   
   //  const getOneTimeLocation = () => {
   //    setLocationStatus('Getting Location ...');
   //    Geolocation.getCurrentPosition(
   //      //Will give you the current location
   //      (position) => {
   //        setLocationStatus('You are Here');
   
   //        //getting the Longitude from the location json
   //        const currentLongitude = 
   //          JSON.stringify(position.coords.longitude);
   
   //        //getting the Latitude from the location json
   //        const currentLatitude = 
   //          JSON.stringify(position.coords.latitude);
   
   //        //Setting Longitude state
   //        setCurrentLongitude(currentLongitude);
          
   //        //Setting Longitude state
   //        setCurrentLatitude(currentLatitude);
   //      },
   //      (error) => {
   //        setLocationStatus(error.message);
   //      },
   //      {
   //        enableHighAccuracy: false,
   //        timeout: 30000,
   //        maximumAge: 1000
   //      },
   //    );
   //  };
   
   //  const subscribeLocationLocation = () => {
   //    watchID = Geolocation.watchPosition(
   //      (position) => {
   //        //Will give you the location on location change
          
   //        setLocationStatus('You are Here');
   //        console.log(position);
   
   //        //getting the Longitude from the location json        
   //        const currentLongitude =
   //          JSON.stringify(position.coords.longitude);
   
   //        //getting the Latitude from the location json
   //        const currentLatitude = 
   //          JSON.stringify(position.coords.latitude);
   
   //        //Setting Longitude state
   //        setCurrentLongitude(currentLongitude);
   
   //        //Setting Latitude state
   //        setCurrentLatitude(currentLatitude);
   //      },
   //      (error) => {
   //        setLocationStatus(error.message);
   //      },
   //      {
   //        enableHighAccuracy: false,
   //        maximumAge: 1000
   //      },
   //    );
   //  };

            return (
               <>
               <Image style={{
                  width: 340,
                  height: 480,
                  //marginVertical: 0,
               }}
                source={Images.MArkerMap}
              />

              <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 15,
                  marginHorizontal: 105,
               }}>Set your location
              </Text>

              <Text style={{
                  fontSize: 15,
                  lineHeight: 25,
                  marginVertical: 0,
                  paddingHorizontal: 90,
               }}>Enable location sharing so {'\n'}   that your driver can see {'\n'}             where you are
              </Text>
                  
              <TouchableOpacity style={{ marginTop: 21,  }} onPress={() => { navigationService.navigate('HomeScreen')}}>
                 <Text style={{color:  Colors.HeaderColour,
                   marginHorizontal: 135,
                   fontSize: 20,
                   fontWeight: 'bold'
                }}>
                Go Ahead</Text>
              </TouchableOpacity>

            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{
                  width: 352,
                  height: 483,
                  //marginVertical: 100,
                  marginVertical: -640,
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
                description={'description'}
               // image={Images.Map}

                image={Images.MArkerMap}
              />
            </MapView>


               </>
            )
  }