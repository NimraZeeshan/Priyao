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

  import { PickupDropoffCard } from '../PickupDropoffCard';
  import React from 'react';
  import {useEffect, useRef, useState} from 'react';
  import navigationService from '../../config/navigationService';
  import {Metrix, NavigationService, Images, Colors} from '../../config';
  // import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
  import SwipeButton from 'rn-swipe-button';
  import {Header, ListItem, Avatar} from 'react-native-elements';
  import {Center} from 'native-base';
  import {TextInput} from 'react-native-gesture-handler';
  import call from 'react-native-phone-call';
  import database, { firebase, } from '@react-native-firebase/database';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Animated from 'react-native-reanimated';
  import BottomSheet from 'reanimated-bottom-sheet';
  // import {useState, useRef} from 'react';
  import Modal from 'react-native-modal';
  import {Card} from 'react-native-shadow-cards';
  import Geolocation from 'react-native-geolocation-service';
  import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
  import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
  import { CancelUserScreen } from '../CancelUserScreen';
  

  export const DriverOnWayFromSoloScreen = (props) => {

    console.log('DriverOnWayFromSoloScreen', props.route.params);
  const rideData = props.route.params.rideData;
  const rideId =rideData.rideid;

    const [isModalVisible, setModalVisible] = useState(false);
    const [location, setLocation] = useState(null);
    const [pickAddress, setPickAddress] = useState(rideData.from_location);
    const [watch, setWatch] = useState(null);
    const [dropAddress, setDropAddress] = useState(rideData.to_location);

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
  
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    const [fullname, setFullName] = useState('');
    const [vehicle_name, setvehicle_Name] = useState('');
    const [vehicle_number, setVehicle_Number] = useState('');
    const [Amount, setAmount] = useState('');
    const [profileimage, setProfileImage] = useState('');
    const Press1 = () => setActive1(!active1);
    const Press2 = () => setActive2(!active2);
    const Press3 = () => setActive3(!active3);

    fetch('http://asaanweb.com/pirayo/index.php/Vehicle_Controller/select_ride_driver/2/2', {
    
      method: 'GET',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      },
      })
      .then((response) => response.json())
      .then((res) => {if (res) {
        setFullName(res.data[0].fullname)
        setvehicle_Name(res.data[0].vehicle_name)
        setVehicle_Number(res.data[0].vehicle_number)
        setAmount(res.data[0].Amount)
        // console.log(res.data[0].profileimage)
      }
      })
      .catch(error => console.log(error));


      useEffect(() => {
        const onValueChange =firebase.app().database()
          .ref(`/rides/${rideId}/isRiderArrived`)
          .on('value', snapshot => {
            
            if(snapshot.val()){
  
              console.log('Rider Accepted your request')
            
              navigationService.navigate('RideProcessScreenFromSolo',{rideData}); 
              
            }
          });
    
        // Stop listening for updates when no longer required
        return () =>firebase.app().database().ref(`/rides/${rideId}/isRiderArrived`).off('value', onValueChange);
      }, [rideId]);

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
              navigationService.navigate('MessageFromSoloScreen');
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
            }}
          />
         <TouchableOpacity
          onPress={(()=>{
           phoneCall();
        })}>
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
        </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              fontSize: 34,
              color: '#707070',
            }}>
            {fullname}
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
            <Text>{vehicle_name}</Text>
            <Text style={{color: Colors.HeaderColour, fontSize: 20}}>
              PKR {Amount}
            </Text>
          </View>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 25,
              color: '#707070',
              marginTop: 50,
              marginRight: -18
            }}>
            {vehicle_number}
          </Text>
        </View>

        <PrimaryButton
          title={'Proceed'}
          color={'#FF0000'}
          customStyles={styles.PrimaryButton}
          onPress={() => {
            navigationService.navigate('RideProcessScreenFromSolo',{rideData}); //toggleModal
          }}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',marginTop: -25}}>
        <PrimaryButton textColor={'white'} title="Cancel" color={'red'} width={'50%'} alignItems={'center'}
            onPress={() => {
            navigationService.navigate('CancelUserScreen'); //toggleModal
          }}
        />
          {/* <PrimaryButton title="Show modal" onPress={toggleModal} /> */}
          <Modal isVisible={isModalVisible}>
            <View style={{backgroundColor: 'white', borderRadius: 10}}>
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

       ////  
  let fetchingDriver = async () => {

    var id = await AsyncStorage.getItem('resId');
       console.log('Driver ID>>>>>>>>>', id);

      if (id != '') {
      //const reference = database().ref(`/userLatLong&ID-${userid}`);
      await firebase.database().ref(`DriverLatLng&ID-${id}`).once(`value`, function (snapshot) {
             let arr = snapshot.val();
             let arr2 = Object.values(arr);
             arr2.forEach(element => {
              setWatch(element)
             // console.log('>>>>>>>>>>>>>>>>>SSss', a);
             });
      })
        // .then(snapshot => {
        //   var arr = snapshot.val();
        //   var arr2 = Object.values(arr);
        //   console.log(...arr2) 
        // });
    } else {
      Alert.alert(`failed to fetch DATA> ${id}`);
      console.log(`failed to fetch DATA>><<><><><>< ${id}`);

    };

};

useEffect(()=>{
  // fetchingDriver();
},[]);
//

////for Phone Call
let phoneCall = () => {

  const args = {
    number: `${9093900003}`, // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
    skipCanOpen: true // Skip the canOpenURL check
  }

  call(args)
 .catch(console.error);

};
////

  
  const sheetRef = React.useRef(null);


    return (
      <>
        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            //   flex: 1,
            marginTop: 0,
            height: '200%',
          }}>
          {/* <Image
            source={Images.MapBig}
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 500,
              width: 500,
              alignSelf: 'flex-start',
              position: 'absolute',
            }}></Image> */}
          <MapView
              scrollEnabled={true}
              showsUserLocation={true}
              showsTraffic={false}
              style={styles.map}
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              initialRegion={location}>
             {/* {watch &&<Marker coordinate={watch} 
               image={ Images.ResizeCar }
             />} */}
           </MapView>

          <View
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 170,
              width: '90%',
              alignSelf: 'center',
              marginTop: 40,
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
              <Text style={styles.input}>
              {pickAddress}
            </Text>
            <Text style={{marginTop: 10}}>Drop Off</Text>
            <Text
              style={styles.input}>
              
              {dropAddress}
            </Text>
            </View>
            </View>
        </View>
        {/* <PrimaryButton
            title="Open Bottom Sheet"
            onPress={() => sheetRef.current.snapTo(1)}
          /> */}
         <View
          style={{
            flex: 1,
            // backgroundColor: 'papayawhip',
            alignItems: 'center',
            justifyContent: 'center',
          }}></View>
        <BottomSheet
          ref={sheetRef}
          snapPoints={[180, 450, 200]}
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
      marginTop: 20,
      width: '95%',
      alignSelf: 'center',
      backgroundColor: Colors.HeaderColour,
      marginBottom: 25,
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
  