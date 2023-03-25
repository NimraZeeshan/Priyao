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

import React, {useState, useEffect, useRef} from 'react';
import navigationService from '../../config/navigationService';
import {Metrix, NavigationService, Images, Colors} from '../../config';
// import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import SwipeButton from 'rn-swipe-button';
import {Header, ListItem, Avatar} from 'react-native-elements';
import {Center} from 'native-base';
import {TextInput} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



var screenWidth = Dimensions.get('window').width; //full screen width

export const RideProcessScreen = () => {

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


  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        // padding: 16,
        height: 450,
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
        <Text style={{fontSize: 20}}>Your ride is in process</Text>
      </View>
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
          source={Images.user}
          style={{
            //   borderColor: 'black',
            //   borderWidth: 1,
            height: 67.2,
            width: 67.2,
            marginLeft: 50,
            marginTop: 15
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
         <Text style={{alignSelf: 'center'}}>Toyota Corolla</Text>
         <Text style={{alignSelf: 'center', color: Colors.HeaderColour, fontSize: 20}}>
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
      </View>

      <PrimaryButton
        title={'Arrived'}
        color={Colors.HeaderColour}
        customStyles={styles.PrimaryButton}
        onPress={() => {
          navigationService.navigate('PaymentFeedbackScreen'); //toggleModal
        }}
      />
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <>
     
     <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 5 }}>
      <Text style={{ color: '#97ADB6', width: '33%', textAlign: 'left' }}>Time Taken</Text>
      <Text style={{ color: '#97ADB6', width: '33%', textAlign: 'center' }}>Total KM</Text>
      <Text style={{ color: '#97ADB6', width: '33%', textAlign: 'right' }}>Total Fare</Text>
    </View>

    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
      <Text style={{ color: '#707070', width: '33%', textAlign: 'left' }}>00:12</Text>
      <Text style={{ color: '#707070', width: '33%', textAlign: 'center' }}>0.3 Km</Text>
      <Text style={{ color: '#707070', width: '33%', textAlign: 'right' }}>PKR 250</Text>
    </View>

      
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
    marginVertical: hp('5%'),
    alignSelf: 'center',
    width: '60%',
  },
  PrimaryButton2: {
    marginTop: 30,
    width: '15%',
    left: 20,
  },
  PrimaryButton3: {
    width: '60%',
    marginLeft: 70,
  },
  footerStyle: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    height: 60,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    },
});