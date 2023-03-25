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
import SwipeButton from 'rn-swipe-button';
import {Header, ListItem, Avatar} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';
import {useState, useEffect, useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';



export const FindingCaptainScreenFromFixedRoutes = () => {

  const [location, setLocation] = useState(null);
  const [pickAddress, setPickAddress] = useState('');
  const [dropAddress, setDropAddress] = useState('');
  const mapRef = useRef();

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

  //const route = useRoute();

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
    cardAddress();
   //

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
          initialRegion={location}>
          {/* <Marker style={{ paddingVertical: 1, paddingHorizontal: 1, borderRadius: 1, elevation: 1 }} coordinate={{latitude: 24.8825, longitude: 67.0694}} pinColor={'red'} /> */}
        </MapView>

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
          }}>
          <Image
            source={Images.lineDropLocation}
            style={{marginLeft: 10}}></Image>
          <View style={{width: '85%', flexDirection: 'column'}}>
            <Text>Pick Up</Text>
            <TextInput style={styles.input} placeholder="Dolmin Mall Clifton">
              {pickAddress}
            </TextInput>
            <Text style={{marginTop: 10}}>Drop Off</Text>
            <TextInput
              style={styles.input}
              placeholder="Chase Up Super Mart Karachi">
              {dropAddress}
            </TextInput>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Image
            source={Images.Dot}
            style={{
              width: 300,
              height: 300,
              marginVertical: -10,
            }}></Image>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: '#97ADB6',
              marginVertical: -90,
            }}>
            Finding Captain
          </Text>
        </View>

        <PrimaryButton
          textColor={'white'}
          title={'Go Ahead'}
          customStyles={styles.PrimaryButton}
          onPress={() => {
            navigationService.navigate('DriverOnWayFromFixedScreen');
          }}
        />
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
