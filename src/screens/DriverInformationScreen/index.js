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
import BottomSheet from 'reanimated-bottom-sheet';
import {Card} from 'react-native-shadow-cards';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';
import {useState, useEffect, useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



export const DriverInformationScreen = () => {

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


  const renderContent = () => (
    <View
    style={{
      backgroundColor: 'white',
      // padding: 16,
      height: 440,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    }}>
      {/* <Text>Swipe down to close</Text> */}
      <View
        style={{
          // borderColor: 'black',
          // borderWidth: 1,
          height: 70,
          backgroundColor: '#707070',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 20, color: 'white'}}>Driver Information</Text>
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
            height: 87.2,
            width: 87.2,
            marginLeft: 50,
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
            fontSize: 20,
            color: '#97ADB6',
          }}>
          Asim Azhar
        </Text>
      </View>
      <Card
        style={{
          height: 60,
          alignSelf: 'center',
          marginTop: 10,
          borderRadius: 20,
          //   alignItems: 'center',
          //   justifyContent: 'space-between',
        }}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={Images.CarRide}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 33,
                width: 100,
                alignSelf: 'flex-start',
                margin: 5,
                alignSelf: 'center',
              }}></Image>
            <View style={{flexDirection: 'column', marginLeft: 30}}>
              <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                Suzuki Mehran
              </Text>
              <Text style={{fontSize: 13}}>xyz 1234</Text>
              <Text style={{fontSize: 13}}>4 min</Text>
            </View>
            <View
              style={{marginLeft: 10, flexDirection: 'column', marginLeft: 30}}>
              <Text style={{color: '#C0FF00'}}>PKR 350</Text>

              <View
                style={{
                  flexDirection: 'column',
                  //marginHorizontal: -11,
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
                      marginTop: 5,
                      marginHorizontal: -1.5,
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
                      marginHorizontal: 18,
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
                      marginTop: 2,
                      backgroundColor: '#00A8FF',
                      marginLeft: -1.5,
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
                      marginLeft: 18,
                    }}></View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Card>
      <Card
        style={{
          height: 50,
          alignSelf: 'center',
          marginTop: 10,
          borderRadius: 20,
          //   alignItems: 'center',
          //   justifyContent: 'space-between',
        }}>
        <View
          style={{
            //   borderColor: 'black',
            //   borderWidth: 1,
            height: 50,
            width: '80%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Image
            source={Images.metlocation}
            style={{width: 15, height: 20}}></Image>
          <View style={{flexDirection: 'column', width: '50%'}}>
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
            }}>
            <Image
              source={Images.DropOffLocation}
              style={{width: 15, height: 20}}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: '#97ADB6', fontSize: 10, marginLeft: 5}}>
                Drop Off
              </Text>
              <Text style={{marginLeft: 5, fontSize: 8}}>
                Chase Up Super Mart Karachi
              </Text>
            </View>
          </View>
        </View>
      </Card>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: hp('2%')
        }}>
      <TouchableOpacity onPress={() => {
          navigationService.navigate('ChooseRideScreen'); //toggleModal
        }}>
        <Image
          source={Images.ArrowBig}
          style={{
            height: 49,
            width: 49,
            alignSelf: 'flex-start',
            padding: 10,
            marginLeft: 20,
          }}/>
      </TouchableOpacity>
        <PrimaryButton
          textColor={'white'}
          title={'Request Ride'}
          color={'#707070'}
          customStyles={styles.PrimaryButton}
          onPress={() => {
            navigationService.navigate('FindingCaptainScreen'); //CurrentRideSeatScreen
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

      </View>

      {/* <PrimaryButton textColor={'white'} customStyles={{
           width: '50%',
           marginVertical: 10,
           backgroundColor: '#707070',
           marginHorizontal: 120,
          }}
            title="Open Bottom Sheet"
            width={'60%'}
            
            onPress={() => sheetRef.current.snapTo(1)}
          /> */}

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
    width: '60%',
    alignSelf: 'center',
    backgroundColor: '#707070',
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