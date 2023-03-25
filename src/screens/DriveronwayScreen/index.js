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
import {Metrix, NavigationService, Images, Colors} from '../../config';
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
import { Modal } from 'react-native-paper';





export const DriveronwayScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
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


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const Press1 = () => setActive1(!active1);
  const Press2 = () => setActive2(!active2);
  const Press3 = () => setActive3(!active3);



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
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', letterSpacing: 1}}>Driver Is On Your Way</Text>
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
          <Text>Toyota Corolla</Text>
          <Text style={{color: Colors.HeaderColour, fontSize: 20}}>
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

      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: hp('2%')
        }}>
      <PrimaryButton
        // textColor={"black"}
        title={'Proceed'}
        color={'#FF0000'}
        customStyles={styles.PrimaryButton}
        onPress={() => {
          navigationService.navigate('RideProcessScreen'); //toggleModal
        }}
      />
   
      <PrimaryButton customStyles={{marginTop: hp('2%')}} textColor={'white'} title="Cancel" color={'red'} width={'50%'}
          onPress={() => {
          navigationService.navigate('CancelUserScreen'); //toggleModal
        }}
      />

        <Modal isVisible={isModalVisible}>
          <View style={{backgroundColor: 'red', borderRadius: 10}}>
            <View
              style={{
                // borderColor: 'black',
                // borderWidth: 1,
                height: 50,
                backgroundColor: Colors.HeaderColour,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 20}}>Select a reason</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                // navigationService.navigate('PaymentFeedbackScreen');
              }}>
              <Card
                style={{
                  margin: 10,
                  height: 50,
                  alignSelf: 'center',
                  width: '95%',
                  flexDirection: 'row',
                }}>
                <Image
                  source={Images.Ellipse}
                  style={{
                    width: 16,
                    height: 16,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginLeft: 5,
                  }}></Image>
                <Text style={{alignSelf: 'center', marginLeft: 5}}>
                  I don't need the ride anymore
                </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity>
              <Card
                style={{
                  margin: 10,
                  height: 50,
                  alignSelf: 'center',
                  width: '95%',
                  flexDirection: 'row',
                }}>
                <Image
                  source={Images.Ellipse}
                  style={{
                    width: 16,
                    height: 16,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginLeft: 5,
                  }}></Image>
                <Text style={{alignSelf: 'center', marginLeft: 5}}>
                  I changed my mind
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity>
              <Card
                style={{
                  margin: 10,
                  height: 50,
                  alignSelf: 'center',
                  width: '95%',
                  flexDirection: 'row',
                }}>
                <Image
                  source={Images.Ellipse}
                  style={{
                    width: 16,
                    height: 16,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginLeft: 5,
                  }}></Image>
                <Text style={{alignSelf: 'center', marginLeft: 5}}>
                  Captain isn't replying
                </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity>
              <Card
                style={{
                  margin: 10,
                  height: 50,
                  alignSelf: 'center',
                  width: '95%',
                  flexDirection: 'row',
                }}>
                <Image
                  source={Images.Ellipse}
                  style={{
                    width: 16,
                    height: 16,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginLeft: 5,
                  }}></Image>
                <Text style={{alignSelf: 'center', marginLeft: 5}}>
                  Car or captain details didn't match
                </Text>
              </Card>
            </TouchableOpacity>

            <PrimaryButton
              // textColor={'white'}
              title="Proceed"
              onPress={() => {
                // navigationService.navigate('CancelUserScreen');
              }} //toggleModal
              customStyles={styles.PrimaryButton}
              />
          </View>
        </Modal>
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
    //marginTop: 15,
    width: '85%',
    //alignSelf: 'center',
    backgroundColor: Colors.HeaderColour,
    //marginBottom: 10,
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
