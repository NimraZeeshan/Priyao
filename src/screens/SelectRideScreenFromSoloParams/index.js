import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
    FlatList,
    Alert,
    Dimensions,
    PermissionsAndroid,
    Modal,
    Platform,
  } from 'react-native';
  import {
    AuthHeader,
    AuthContainer,
    PrimaryInput,
    PrimaryButton,
    Loading,
  } from '../../components';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import React, { forwardRef } from 'react';
  import navigationService from '../../config/navigationService';
  import { Metrix, NavigationService, Images, Colors } from '../../config';
  // import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
  //import { getDatabase, ref, set } from "firebase/database";
  import SwipeButton from 'rn-swipe-button';
  import { Header, ListItem, Avatar } from 'react-native-elements';
  import { Button, Center } from 'native-base';
  import { TextInput } from 'react-native-gesture-handler';
  import { showToast } from '../../config/utills';
  import { useNavigation, useRoute } from '@react-navigation/native';
  import { firebase } from '@react-native-firebase/database';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { duration } from 'moment';
  import Animated, { acc } from 'react-native-reanimated';
  import BottomSheet from 'reanimated-bottom-sheet';
  import { useEffect, useRef, useState } from 'react';
  import { Input } from 'react-native-elements';
  import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
  import MapViewDirections from 'react-native-maps-directions';
  import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    Polyline,
    animateToRegion,
    AnimatedRegion,
  } from 'react-native-maps';
  import Geolocation from 'react-native-geolocation-service';
  import { compareSpecificity } from 'native-base/lib/typescript/hooks/useThemeProps/propsFlattener';
  
  
  
  
  
  export const SelectRideScreenFromSoloParams = () => {

    const [formattAddress, setformattAddress] = useState({});
    const [pickup, setPickup] = useState(null);
    const [dropoff, setDropoff] = useState(null);
    const [displayAddress, setDisplayAddress] = useState(null);
    const [resId, setResId] = useState('');
    const [distance, setDistance] = useState(0);
    const [timeDuration, setTimeDuration] = useState(0);
    const [pick_up, setPick_up] = useState('');
    const [drop_off, setDrop_off] = useState('');
    const [luxuryFare, setLuxuryFare] = useState('');
    const [category_name, setCategory_Name] = useState('');
    const [basicFare, setBasicFare] = useState('');
    const [location, setLocation] = useState(null);
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    const Press1 = () => setActive1(!active1);
    const Press2 = () => setActive2(!active2);
    const Press3 = () => setActive3(!active3);
    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');
    const [userDropoffAddress, setUserDropoffAddress] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [pirayoCategory, setPirayoCategory] = useState([]);
    const mapRef = useRef();
    const markerRef = useRef();
  
  

  // get location function
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
          async position => {
            console.log('position', position);
            // setlatitude(position.coords.latitude.toFixed(3));
            // setlongitude(position.coords.longitude.toFixed(3));
  
            const { width, height } = Dimensions.get('window');
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
            reverseGeocode(position.coords.latitude, position.coords.longitude)
          },
        );
      }
    });
  };

  
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const res = await Geocoder.geocodePosition({
        lat: latitude,
        lng: longitude
      });
      const address = res[0].formattedAddress;
      setDisplayAddress(address);
      console.log('display_address >>>>>>>>', address);

    } catch (error) {
      console.warn('error in reverseGeoCode >>>>>', error);
    }
  };
  

  useEffect(() => {
    //  const interval = setInterval(() => {
    getLocation();
    reverseGeocode();
    // },1000);
    //  return () => clearInterval(interval)
  }, []);
  
    //  const animate = () => {
  
    //       if(markerRef.current&&mapRef.current){
    //       markerRef.current.animateMarkerToCoordinate(dropoff, 15000);
    //       mapRef.current.fitToSuppliedMarkers(pickup),{ edgePadding:
    //         {
    //           },
  
    //       };
    //       }
    //     else {
    //       pickup.timing(pickup).start();
    //   }
    //   }
  
    //const navigation = useNavigation();


    
    const route = useRoute();
    const userData = route.params.userData;

  
    //API,s for fare
    const createTripLuxury = (id) => {
      fetch(
        `http://asaanweb.com/pirayo/index.php/Vehicle_Controller/ride_select/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'text/html; charset=UTF-8',
          },
        },
      )
        .then(response => response.json())
        .then(res => {
          setLuxuryFare(res.data?.[0]?.Amount)
          // ||
          // setstandardFare((res.data.Amount = '')) ||
          // setBasicFare((res.data.Amount = ''));
        })
        .catch(error => console.log(error));
    };
  

    ///////fatch category API
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('http://asaanweb.com/pirayo/index.php/Vehicle_Controller/fetch_all_category');
        const jsons = await response.json();
        setPirayoCategory(jsons.data);
        //console.log('fetch_all_category?????//////<<<<<<<<<>>>>>>>>>> ', pirayoCategory))
      }
      fetchData();
    }, []);
  
    //////

  
    const moveTo = async position => {
      mapRef.current.animateToRegion(position, 3 * 1000);
      setLocation(position);
    };
  
    const onPlaceSelected = (details, flag) => {
      const set = flag === 'pickup' ? setPickup : setDropoff;
      const position = {
        latitude: details?.geometry.location.lat || 0,
        longitude: details?.geometry.location.lng || 0,
      };
      set(position);
      moveTo(position);
    };
  
    const ready = res => {
      mapRef.current.fitToCoordinates(res.coordinates, {
        edgePadding: {
          right: 30,
          bottom: 300,
          left: 30,
          top: 100,
        },
        animated: true,
      });
      setDistance(res.distance); //res.distance
      setTimeDuration(res.duration);
    };
  
    AsyncStorage.setItem('distanceKM', distance.toString());
    AsyncStorage.setItem('timeDuration', timeDuration.toString());
  
    //fetch Km & Distance from google
    let KmAndDis = () => {
      AsyncStorage.getItem('distanceKM').then(dis => {
      });
      AsyncStorage.getItem('timeDuration').then(dura => {
      });
    };
    //
  
  
    //for insert location on database
    const confirmLocation = () => {
      const formData = new FormData();
      formData.append('pick_up', formattAddress.pick_up);
      formData.append('drop_off', formattAddress.drop_off);
      //console.log('drop_off>>>>>confirm', formattAddress.pick_up);
  
      fetch(
        'http://asaanweb.com/pirayo/index.php/Vehicle_Controller/insert_location/5',
        {
          method: 'POST',
          body: formData,
        },
      )
        .then(response => response.json())
        .then(res => {
          console.log('confirm location response ', res);
        })
        .catch(error => console.log(error));
    };
    //
  
    //for insert location on firebase real time database
    const driverLatLngToFireBase = () => {
      const formData = new FormData();
      formData.append('pick_upLat', pickup.latitude);
      formData.append('pick_upLong', pickup.longitude);
      formData.append('drop_offLat', dropoff.latitude);
      formData.append('pick_upLong', dropoff.longitude);
  
      fetch(
        'https://otp-testin-default-rtdb.firebaseio.com/userPick&DropLatLong.json',
        {
          method: 'POST',
          body: JSON.stringify({ formData }),
        },
      )
        .then(response => response.json())
        .then(res => {
          console.log(res);
        })
        .catch(error => console.log(error));
    };
////////


const userDropoffAddressHandler = async () => {

    setDrop_off( userData.shortname );
  }
  useEffect(() => {
    userDropoffAddressHandler();
  }, []);


  
    //for driver notification
    const userNotificationToDriver = async () => {
  
      var userid = await AsyncStorage.getItem('UserId');
      const DriverId = AsyncStorage.getItem('resId').then(res => {
      });
  
      const formData = new FormData();
      formData.append('from_location', formattAddress.pick_up);
      formData.append('to_location', formattAddress.drop_off);
      formData.append('user_id', userid);
      formData.append('from_lat', pickup.latitude);
      formData.append('from_long', pickup.longitude);
      formData.append('to_lat', dropoff.latitude);
      formData.append('to_long', dropoff.longitude);
      formData.append('shortname', drop_off);
      formData.append('ridetype', "solo ride");
      formData.append('car_category', category_name);
      formData.append('totalfare', `${luxuryFare}`);
      formData.append('totalkm', timeDuration);
  
      console.log('from_location ', formattAddress.pick_up);
      console.log('to_location ', formattAddress.drop_off);
      console.log('user_id ', userid);
      console.log('from_lat ', pickup.latitude);
      console.log('from_long ', pickup.longitude);
      console.log('to_lat ', dropoff.latitude);
      console.log('to_long ', dropoff.longitude);
      console.log('shortname ', drop_off);
      console.log('ridetype ', "solo ride");
      console.log('car_category ', category_name);
      console.log('totalfare ', `${luxuryFare}`);
      console.log('totalkm ', timeDuration);
  
  
      setTimeout(() => {
        fetch(`http://asaanweb.com/pirayo/index.php/Ride/add_ride`, {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then(res => {console.log('add_ride>>>>>>>>>>>>>>>> ', res)
          })
          .catch(error => console.log(error));
      }, 1000);
    };
///////
  
    //set location address in async storage
    const pickDrop = async () => {
  
      try {
  
        await AsyncStorage.setItem('pickAddress', formattAddress.pick_up);
        await AsyncStorage.setItem('dropAddress', formattAddress.drop_off);
        let setPick = await AsyncStorage.getItem('pickAddress');
        let setDrop = await AsyncStorage.getItem('dropAddress');
        // console.log(setPick);
        // console.log(setDrop);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(()=>{
      pickDrop();
    },[])
    
   
  
  
    //  let fetchingDriver = async () => {
  
    //     var driverID = await AsyncStorage.getItem('resId');
    //        console.log('Driver ID>>>>>>>>>', driverID);
  
    //       if (driverID != '') {
    //       //const reference = database().ref(`/userLatLong&ID-${userid}`);
    //        firebase.database().ref(`DriverLatLng&ID-${driverID}`).once(`value`, function (snapshot) {
    //              let arr = snapshot.val();
    //              let arr2 = Object.values(arr);
    //              arr2.forEach(element => {
    //              // console.log(element);
    //               setWatch(element);
    //              });
  
    //       })
    //         // .then(snapshot => {
    //         //   var arr = snapshot.val();
    //         //   var arr2 = Object.values(arr);
    //         //   console.log(...arr2)
    //         // });
    //     } else {
    //       Alert.alert(`failed to fetch DATA> ${driverID}`);
    //       console.log(`failed to fetch DATA>><<><><><>< ${driverID}`);
    //     };
  
    // };
    // fetchingDriver();
  
  
  
  
    return (
      <>
      
      <Modal
        animationType="slide"
        animationD
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View
            style={{
            }}>
          
          <View
          style={{
            backgroundColor: 'white',
            height: hp('55%'),
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}>

          <View
            style={{
              height: hp('10%'),
              backgroundColor: '#707070',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 20, color: 'white' }}>Select A Ride</Text>
          </View>

        <FlatList
          data={pirayoCategory}
          keyExtractor={(item) => item.id?.toString()}
          horizontal={true}
          renderItem={({ item }) => {

          return (
            <View
              key={item.id}
            >
              <TouchableOpacity
                onPress={() => {
                  Press1;
                  createTripLuxury(item.category_id);
                  setCategory_Name(item?.category_name);
                }}>
                {item.icon && (
                  <Image
                    source={{ uri: item.icon }}
                    style={{
                      //   borderColor: 'black',
                      //   borderWidth: 1,
                      height: 64,
                      width: 104,
                      marginTop: 30,
                      backgroundColor: active1 ? '#707070' : '#F4F4F4',
                      borderRadius: 10,
                    }}
                  />
                )}
              </TouchableOpacity>
              <Text>{item?.category_name}</Text>
            </View>
          )
        }}
      />

      <View>
        <Text
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            fontSize: 34,
            color: '#707070',
          }}>
          Estimated Fare
        </Text>
        <TextInput
          value={luxuryFare ?? 0}
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            fontSize: 34,
            color: Colors.HeaderColour,
          }}>
        
        </TextInput>
      </View>

      <PrimaryButton
        textColor={'white'}
        title={'Create Trip'}
        color={'#707070'}
        customStyles={styles.PrimaryButton}
        onPress={() => {
          setModalVisible(false);
          userNotificationToDriver();
          confirmLocation();
          //KmAndDis();
          //fetchingDriver();
          //writeUserData();
          //animate();
          //driverLatLngToFireBase();
          navigationService.navigate('FindingCaptainScreenFromSolo');
        }}
      />
      </View>
     </View>
    </View>
   </Modal>

        <View>
          <MapView
            scrollEnabled={true}
            showsUserLocation={true}
            showsTraffic={false}
            style={styles.map}
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            initialRegion={location}
            coordinates={location}
            loadingEnabled={true}
          // onRegionChangeComplete={(location)=>{setLocation(location)}}
          // image={Images.MapCarSmall} add image to marker
          >
            {pickup && (
              <Marker
                style={{
                  paddingVertical: 1,
                  paddingHorizontal: 1,
                  borderRadius: 1,
                  elevation: 1,
                  transform: { rotate: `0deg` },
                }}
                ref={markerRef}
                coordinate={pickup}
                pinColor={'green'}
              //image={ Images.ResizeCar }
              />
            )}
            {dropoff && <Marker coordinate={dropoff} pinColor={'red'} />}
  
            <MapViewDirections
              origin={pickup}
              destination={userData.shortname} //dropoff
              //coordinates={watch}
              strokeColor="hotpink"
              strokeWidth={4}
              mode="DRIVING"
              splitWaypoints={true}
              timePrecision="none"
              apikey="AIzaSyBa2ozEcLg_aU9nrsqxfz3_2dWc30s3cLo"
              optimizeWaypoints={true}
              onReady={ready}
            />
          </MapView>
  
          <View style={styles.searchContainer}>
            <Text>Pickup</Text>
            <GooglePlacesAutocomplete
            textInputProps={{
              autoFocus: true,
              value: displayAddress,
              defaultValue: pick_up,
                onChangeText: setDisplayAddress
              }}
            fetchDetails={true}
            onPress={(data, details = null) => {
            // onPlaceSelected(details);
            setformattAddress({
            ...formattAddress,
            pick_up: details.formatted_address,
            });
            onPlaceSelected(details, 'pickup');
            setPick_up(
            details.address_components[0].short_name +
            ' ' +
            details.address_components[1].short_name +
            ' ' +
            details.address_components[2].short_name,
            );
            }}
            query={{
            key: 'AIzaSyBa2ozEcLg_aU9nrsqxfz3_2dWc30s3cLo', //AIzaSyDl1o-AKSOZCAqeAY0NTnDNaYveMyXGNyw
            language: 'en',
            components: 'country:pk',
            }} />
  
          <Text>Dropoff</Text>
          <GooglePlacesAutocomplete
          textInputProps={{
          defaultValue: userData.shortname,
          value: drop_off,
          autoFocus: true,
          onChangeText: e => setDrop_off(e)
        }}
        fetchDetails={true}
        onPress={(data, details = null) => {
          setformattAddress({
            ...formattAddress,
            drop_off: details.formatted_address,
          });
          onPlaceSelected(details, 'dropoff');
          setDrop_off(
            details.address_components[0].short_name +
            ' ' +
            details.address_components[1].short_name +
            ' ' +
            details.address_components[2].short_name,
          );
        }}
        query={{
          key: 'AIzaSyBa2ozEcLg_aU9nrsqxfz3_2dWc30s3cLo',
          language: 'en',
          components: 'country:pk',
        }} />

      <View>
      </View>
  
      <PrimaryButton
       textColor={'white'}
       title={'Choose Ride'}
       color={'#707070'}
       customStyles={styles.PrimaryButton}
       onPress={() => {
        setModalVisible(true);
      }}
      disabled={pick_up === '' || drop_off === ''}
      />
      
      <View>
     </View>
    </View>
   </View>

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
   marginTop: 30,
   width: '95%',
   alignSelf: 'center',
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
   map: {
   ...StyleSheet.absoluteFillObject,
   width: Dimensions.get('window').width,
   height: Dimensions.get('window').height,
   },
   searchContainer: {
   position: 'absolute',
   width: '90%',
   backgroundColor: 'white',
   shadowColor: 'black',
   shadowOffset: { width: 2, height: 2 },
   shadowOpacity: 0.5,
   shadowRadius: 4,
   elevation: 4,
   padding: 8,
   borderRadius: 8,
   top: 40,
   marginLeft: 15,
   },
   searchInput: {
   borderColor: 'grey',
   borderWidth: 1,
   },
   traceButton: {
   backgroundColor: '#bbb',
   paddingVertical: 12,
   marginTop: 16,
   borderRadius: 4,
   },
   traceText: {
   textAlign: 'center',
   },
   searchContainer: {
   position: 'absolute',
   width: '90%',
   backgroundColor: 'white',
   shadowColor: 'black',
   shadowOffset: { width: 2, height: 2 },
   shadowOpacity: 0.5,
   shadowRadius: 4,
   elevation: 4,
   padding: 8,
   borderRadius: 8,
   top: 40,
   marginLeft: 15,
   },
  });