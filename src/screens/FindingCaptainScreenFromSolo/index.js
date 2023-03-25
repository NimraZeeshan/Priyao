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
  Alert,
  Animated,
  Easing
} from 'react-native';
import {
  AuthHeader,
  AuthContainer,
  PrimaryInput,
  PrimaryButton,
  Loading,
} from '../../components';

import React from 'react';
import { firebase } from '@react-native-firebase/database';
import navigationService from '../../config/navigationService';
import {Metrix, NavigationService, Images, Colors} from '../../config';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect, useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



export const FindingCaptainScreenFromSolo = (props) => {

  console.log('FindingCaptainScreenFromSolo', props.route.params);
  const rideData = props.route.params.resData;
  const rideId =rideData.rideid;
  // console.log("FindingCaptainScreenFromSolo", rideId);

  const [location, setLocation] = useState(null);

  const [isRiderFound, setIsRiderFound] = useState(false);
  const [pickAddress, setPickAddress] = useState(rideData.from_location);
  const [dropAddress, setDropAddress] = useState(rideData.to_location);
  const [scale] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(1));
  const rotation = useRef(new Animated.Value(0)).current;
  const mapRef = useRef();


  const animateCircles = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 2,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
    Animated.timing(rotation, {
      toValue: 1,
      duration: 3000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      rotation.setValue(0);
      animateCircles();
    });
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


   //for set pick drop location name on card
   const cardAddress = async () => {
    try {
      let pick = await AsyncStorage.getItem('pickAddress');
      let drop = await AsyncStorage.getItem('dropAddress');
       setPickAddress(pick)
       setDropAddress(drop)
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getLocation();
    animateCircles();
    //cardAddress();


    //Firebase Monitor Ride Request

    
    
    // const ridesDbRef = firebase.app().database().ref(`/rides/${rideId}/isRiderAssigned`);
    // ridesDbRef
    // .on('value', snapshot => {
    //   console.log('data: ', snapshot.val());
    // });

  
  
  }, []);

  //const route = useRoute();


  
    useEffect(() => {
      const onValueChange =firebase.app().database()
        .ref(`/rides/${rideId}/isRiderAssigned`)
        .on('value', snapshot => {
          
          if(snapshot.val()){

            console.log('Rider Accepted your request')
            navigationService.navigate('DriverOnWayFromSoloScreen',{rideData});
            
          }
        });
  
      // Stop listening for updates when no longer required
      return () =>firebase.app().database().ref(`/rides/${rideId}/isRiderAssigned`).off('value', onValueChange);
    }, [rideId]);
  


  return (
    <>
  <View style={{ flex: 1 }}>
  <MapView
    scrollEnabled={true}
    showsUserLocation={true}
    showsTraffic={false}
    style={{ flex: 1 }}
    ref={mapRef}
    provider={PROVIDER_GOOGLE}
    initialRegion={location}
  >
    {/* <Marker style={{ paddingVertical: 1, paddingHorizontal: 1, borderRadius: 1, elevation: 1 }} coordinate={{latitude: 24.8825, longitude: 67.0694}} pinColor={'red'} /> */}
  </MapView>

  <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
    {/* Card */}
    <View
      style={{
        height: 170,
        width: '90%',
        alignSelf: 'center',
        marginTop: 60,
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Image source={Images.lineDropLocation} style={{ marginLeft: 10 }} />
      <View style={{ width: '85%', flexDirection: 'column' }}>
        <Text>Pick Up</Text>
        <TextInput style={styles.input} selection={{start:0, end:0}} >
          {pickAddress} 
          
        </TextInput>
        <Text style={{ marginTop: 10 }}>Drop Off</Text>
        <TextInput style={styles.input} selection={{start:0, end:0}}>
          {dropAddress} 
        </TextInput>
      </View>
    </View>

    {/* Circle */}
    <View style={{ alignItems: 'center'}}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [
              {
                scale: scale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
            opacity: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [
              {
                scale: scale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              },
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
            opacity: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      />
    </View>
  </View>

  {/* Button */}
  <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}>
    <PrimaryButton
    disabled={true}
      textColor={'white'}
      title={'Finding Rider, Please Wait..'}
      customStyles={styles.PrimaryButton}
      onPress={() => {
        
      }}
    />
 
</View>
</View>
      
    </>
  );
};

const styles = StyleSheet.create({
  PrimaryButton: {
    width: '50%',
    alignSelf: 'center',
    backgroundColor: 'red',
    marginVertical: 70,
  },
  input: {
    // height: 50,
    // borderWidth: 1,
    borderBottomWidth: 0.2,
    height: 50,
    paddingHorizontal: 10,
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

  circle: {
    width: 100,
    height: 100,
    borderRadius: 200,
    borderWidth: 0.5,
    marginVertical: hp('10%'),
    borderColor: 'red',
    backgroundColor: Colors.HeaderColour,
  },
});