import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  FlatList,
  Button,
  Alert,
  TouchableOpacity,
  useWindowDimensions,
  PermissionsAndroid,
  Dimensions,
  BackHandler,
  Animated,
  Easing
} from 'react-native';
import {PrimaryButton} from '../../components';
import {Card} from 'react-native-shadow-cards';
import {useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Images, Colors} from '../../config';
import navigationService from '../../config/navigationService';
import {useState, useRef, useCallback} from 'react';
import { Drawer } from '../../components/Drawer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';





export const HomeScreen = props => {

  const [name, setName] = useState('');
  const [openDrawer, setDrawerOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [userData, setUserData] = useState([]);
  const [rideProcess, setRideProcess] = useState(null);
  const [scale] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(1));
  const rotation = useRef(new Animated.Value(0)).current;

  const mapRef = useRef();
  const navigation = useNavigation();
  const route = useRoute();


////////For User Prevent to Back
  const handleBackPress = () => {
    alert('Please logout to Move Back');
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        backHandler.remove();
      };
    }, [])
  );
/////////
 


//////For Open Drawer
  const toggleDrawer = () => {
    setDrawerOpen(!openDrawer);
  };
/////
 

  //for set user name on Home screen
  const welcomeUserName = async () => {
    try {
      let name = await AsyncStorage.getItem('UserName');
      setName(name)
    } catch (error) {
      console.log(error);
    }
  };
///////////


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


 
////////RecentRides API
    const recentRides = async () => {

    var userid = await AsyncStorage.getItem('UserId');
    console.log('where to UserID >>>>>>>>>', userid);

    const userFormData = new FormData();
    userFormData.append('user_id', userid);
  
  
    await fetch(`http://asaanweb.com/pirayo/index.php/Ride/RecentRides`, {
        method: 'POST',
        body: userFormData,
      })
        .then(response => response.json())
        .then(res => {
        setUserData(res.data)
          console.log(' >>>>>>>>>>>>>> res ', res);
        })
  
        .catch(error => console.log(error));

  };
////////


////////RideInProcess API

const getRideinProcess = async () => {

  var userid =await AsyncStorage.getItem('UserId');
  console.log('where to UserID >>>>>>>>>', userid);

  const rideProcessData = new FormData();
  rideProcessData.append('user_id', userid);


  await fetch(`http://asaanweb.com/pirayo/index.php/Ride/getRideinProcess`, {
      method: 'POST',
      body: rideProcessData,
    })
      .then(response => response.json())
      .then(res => {
        setRideProcess(res);
        //console.log(' >>>>>>>>>>>>>> ride process ', rideProcess);
      })

      .catch(error => console.log(error));

    };
/////////


    let userWhereLocation = async () => {

      try {
    
       await AsyncStorage.setItem('userDropoffAddress', userData?.[0]?.shortname);
    
      } catch (error) {
        console.log('user error>>>>>>>>>', error);
      }
        AsyncStorage.getItem('userDropoffAddress').then((res)=>{console.log("userDropoffAddress >>> ", res)})
    
    };

  useEffect(()=>{
    getLocation();
    welcomeUserName();
    recentRides();
    getRideinProcess();
    userWhereLocation();
  },[])

////////



  return (
    <>

      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>

        <ScrollView>
          <View
            style={{
              height: 280,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: Colors.HeaderColour,
              marginTop: 0,
              //   alignItems: 'center',
              //   justifyContent: 'center',
            }}>
            <View>
              <TouchableOpacity onPress={toggleDrawer}>
                <Image
                  source={Images.Menu}
                  style={{
                    height: 49,
                    width: 49,
                    position: 'relative',
                    alignSelf: 'flex-end',
                    marginVertical: 20,
                    marginRight: 15,
                  }}
                />
              </TouchableOpacity>

              <View style={styles.container}>
            </View>
            </View>

            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 40,
                marginTop: -40,
                letterSpacing: 1,
                paddingHorizontal: 20,
              }}>
              Welcome
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 30,
                letterSpacing: 1,
                paddingHorizontal: 20,
              }}>
                 {name}
            </Text>

            <Text
              style={{
                marginTop: -20,
                textAlign: 'center',
                textAlignVertical: 'center',
                letterSpacing: 1,
                marginTop: 5,
                paddingLeft: 20,
                paddingRight: 20,
                //marginBottom: 10,
                fontSize: 17,
              }}
              numberOfLines={8}>
              meet new people along the route and save up to 20% off with a ride
              sharing
            </Text>

            <View
              style={{
                height: 115,
                marginTop: 20,
                flexDirection: 'row',
                width: wp('95%'),
                justifyContent: 'space-between',
                alignSelf: 'center',
              }}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigationService.navigate('ChooseRideScreen'); //DropofflocationScreen
                  }}>
                  <Image
                    source={Images.RideSharing}
                    style={{
                      //   borderColor: 'black',
                      //   borderWidth: 1,
                      height: 111,
                      width: 111,
                      // marginLeft: 15,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigationService.navigate('SelectRideScreenFromSolo') //DropOffLocationFromSoloScreen
                  }}>
                  <Image
                    source={Images.SoloRides}
                    style={{
                      //   borderColor: 'black',
                      //   borderWidth: 1,
                      height: 111,
                      width: 111,
                      // marginLeft: 15,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigationService.navigate('FixedRouteScreen');
                  }}>
                  <Image
                    source={Images.FixedRide}
                    style={{
                      height: 111,
                      width: 111,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text
            style={{
              marginTop: 50,
              marginLeft: 15,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Where to?
          </Text>

          
          {/* {
          userData.lenght?  <FlatList
          data={userData}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({item}) => {

          return (
            <TouchableOpacity
             onPress={() => {
             navigation.navigate('SelectRideScreenFromSoloParams', { userData: item });
           }}>
            <View
            style={{
              height: 40,
              flexDirection: 'row',
              marginTop: 5,
            }}>
              <Image
                source={Images.Start}
                style={{
                  height: 40,
                  width: 40,
                  marginLeft: 5,
                  marginTop: 5,
                }}
              />
            <View
              style={{
                flexDirection: 'column',
                marginTop: 5,
                marginTop: 10,
              }}>
          
              <Text style={{color: '#97ADB6'}}>{item?.shortname}</Text>
             
            </View>
          </View>
          </TouchableOpacity>
          )
          }}
        />:null

          } */}

          <View
            style={{
              height: 250,
              width: '95%',
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 20,
            }}>
             
          <MapView
              scrollEnabled={true}
              showsUserLocation={true}
              showsTraffic={false}
              style={styles.map} 
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              initialRegion={location}
          //  onRegionChangeComplete={(location)=>{setLocation(location)}}
          // image={Images.MapCarSmall} add image to marker
        ></MapView>
          </View>

          {/* //TODO FlatList */}
          
        </ScrollView>
      </Drawer>
    </>
  );
};




const styles = StyleSheet.create({
  PrimaryButton: {
    marginBottom: 10,
  },
  PrimaryButton2: {
    marginBottom: 10,
  },
  // /////////////////// Country Picker Style

  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 10,
  },
  PrimaryButtonCountinue: {
    marginTop: 30,
  },
  phoneContainer: {
    height: 50,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 30,
    width: '75%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  textInput: {
    paddingVertical: 0,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  bottomView: {},

  ///////////////////////////////////MENU///////////
  safeArea: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 30,
  },
  text: {
    paddingTop: 20,
  },
  textLink: {
    paddingTop: 20,
    color: 'blue',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  ////////////////////////////////Tabbar//////////////////////
  container: {width: '100%', height: '100%', backgroundColor: 'white'},
  tabBar: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  indicatorStyle: {
    backgroundColor: 'white',
    padding: 1.5,
    marginBottom: -2,
  },
  divider: {
    zIndex: 100,
    position: 'absolute',
    width: 1,
    height: 48,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
  ////////////////////////////////MAP//////////////////////////
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 200,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'red',
  },
});




