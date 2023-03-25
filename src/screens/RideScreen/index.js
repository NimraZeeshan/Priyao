import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';

import {
  MainContainer,
  AuthHeader,
  AuthContainer,
  PrimaryInput,
  PrimaryButton,
  BackHeader,
  Loading,
} from '../../components';
 
import React from 'react';
import {Metrix, NavigationService, Images, Colors} from '../../config';
import navigationService from '../../config/navigationService';
import {useState, useRef, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';


export const RideScreen = () => {
  const [userLocation, setUserLocation] = useState('');
  const [userLatitude, setUserLatitude] = useState('');
  const [userLongitude, setUserLongitude] = useState('');
  const [UserId, setUserId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [driverLocation, setDriverLocation] = useState('');
  const [driverLatitude, setDriverLatitude] = useState('');
  const [driverLongitude, setDriverLongitude] = useState('');


  const userLatLng = () => {

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

  const result = requestLocationPermission();
  result.then(res => {
    console.log('res is:', res);
    if (res) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);

          const INITIAL_POSITION = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(INITIAL_POSITION);
          setUserLatitude(INITIAL_POSITION.latitude);
          setUserLongitude(INITIAL_POSITION.longitude);
        },
        error => {
          console.log(error.code, error.message);
          setUserLocation(false);
        },
        // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  });

};


  let user = async () => {

    try {
  
     await  AsyncStorage.setItem('userLocation', JSON.stringify(userLocation));
  
     await AsyncStorage.setItem('latitude', JSON.stringify(userLatitude));
     
     await AsyncStorage.setItem('longitude', JSON.stringify(userLongitude));
  
    } catch (error) {
      console.log('user error>>>>>>>>>', error);
    }
    //  AsyncStorage.getItem('latitude').then((res)=>{console.log("User latitude>>> ", res)})
    //  AsyncStorage.getItem('longitude').then((res)=>{console.log("User longitude>>> ", res)})

  };

  useEffect(()=>{
    user();
  });
 

//   let userKeepLogged = async () => {
//     await AsyncStorage.getItem('UserId', (err, value) => {
//       if (err) {
//           console.log(err)
//       } else {
//           setUserId(value)
//       if (UserId) {
//         navigationService.navigate('HomeScreen')  // MessageFromSoloScree, LoginScreen
//         console.log('User ID<<<><<<>>><<<<<>>>', value)
//       }
//     }
//   });

// };

// userKeepLogged();



const driverLatLng = () => {
   
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

  const result = requestLocationPermission();
  result.then(res => {
    console.log('res is:', res);
    if (res) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);

          const INITIAL_POSITION = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setDriverLocation(INITIAL_POSITION);
          setDriverLatitude(INITIAL_POSITION.latitude);
          setDriverLongitude(INITIAL_POSITION.longitude);
        },
        error => {
          console.log(error.code, error.message);
          setDriverLocation(false);
        },
        // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  });

};

const driver = async() => {

  try {

   await AsyncStorage.setItem('driverLocation', JSON.stringify(driverLocation));

   await AsyncStorage.setItem('driverLatitude', JSON.stringify(driverLatitude));
    
   await AsyncStorage.setItem('driverLongitude', JSON.stringify(driverLongitude));
    
  } catch (error) {
    console.log('driver error>>>>>', error);
  }
  // AsyncStorage.getItem('driverLatitude').then((res)=>{console.log("Driver latitude>>> ", res)})
  // AsyncStorage.getItem('driverLongitude').then((res)=>{console.log("Driver longitude>>> ", res)})
};

useEffect(()=>{
  driver();
});




// let driverKeepLogged = async () => {
//   await AsyncStorage.getItem('resId', (err, value) => {
//       if (err) {
//           console.log(err)
//       } else {
//           setDriverId(value)
//       if (driverId) {
//         navigationService.navigate('DriverRideTypeScreen') //DriverRideTypeScreen
//         console.log('User ID<<<><<<>>><<<<<>>>', value)
//       }
      
//     }
//   });
// };

// driverKeepLogged();


useEffect(() => {
  userLatLng();
  driverLatLng();
}, []);


  const userTopic = () => {
    messaging() 
    .subscribeToTopic('userTopic')
    .then(() => console.log('Subscribed to userTopic!'));
  }

  const driverTopic = () => {
    messaging()
    .subscribeToTopic('driverTopic')
    .then(() => console.log('Subscribed to driverTopic!'));
  }
 
  return (
    <>
      <View style={{flex: 1}}>
        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            width: 112.67,
            height: 173.96,
            marginTop: 50,
            paddingHorizontal: 20,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={Images.PriyaoLogo}
            style={{
              width: 112.67,
              height: 173.96,
            }}
            name="your-icon"
            size={20}
          />
        </View>

        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            height: 93.25,
            marginTop: 110,
            width: '80%',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigationService.navigate('SelectLogin');
              userTopic();
              //userLatLng();
              //userKeepLogged();
            }}>
            <Image
              source={Images.NeedRide}
              style={{
                width: 272,
                height: 93.25,
              }}
              name="your-icon"
              size={20}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            height: 93.25,
            marginTop: 10,
            width: '80%',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              driverTopic();
              //driverLatLng();
              //driverKeepLogged();
              navigationService.navigate('SelectLoginScreenFromHaveRide');
            }}>
            <Image
              source={Images.HaveRide}
              style={{
                width: 272,
                height: 93.25,
                marginTop: 30,
              }}
              name="your-icon"
              size={20}
            />
          </TouchableOpacity>
        </View>

      </View>
    </>
  );
};
