import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  SafeAreaView,
  Image,
  Animated,
  FlatList,
  useWindowDimensions,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';

import React, { useState, useEffect, useRef } from 'react';
import navigationService from '../../config/navigationService';
import { Metrix, NavigationService, Images, Colors } from '../../config';
import SwipeButton from 'rn-swipe-button';
import { PrimaryButton } from '../../components';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import call from 'react-native-phone-call';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/database';
import MenuDrawer from 'react-native-side-drawer';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';




const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const Drawer = props => {
  const layout = useWindowDimensions();
  const [driverName, setDriverName] = useState('');


  
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'UserMode'},
    {key: 'second', title: 'DriverMOde'},
  ]);

  const overlay = true;
  const position = 'left';

    //for set driver name on Solo ride screen
    const welcomeDriverName = async () => {
      try {
        let name = await AsyncStorage.getItem('driverName');
        setDriverName(name)
      } catch (error) {
        console.log(error);
      }
    };
    welcomeDriverName();
  //
  

  const drawerContent = () => {
    const edges =
      position == 'right'
        ? ['bottom', 'top', 'right']
        : ['bottom', 'top', 'left'];
    const baseStyle = {
      flex: 1,
      backgroundColor: 'white',
      borderStyle: 'solid',
      borderWidth: 0,
      borderColor: 'black',
    };
    const renderTabBar = props => {
      return (
        <TabBar
          {...props}
          renderLabel={({focused, route}) => {
            return (
              <TextView
                size={20}
                category="Medium"
                color={focused ? 'BLACK' : 'GRAY3'}>
                {route.title}
              </TextView>
            );
          }}
          indicatorStyle={styles.indicatorStyle}
          style={styles.tabBar}
        />
      );
    };

     //for set driver name on Home screen
     const welcomeDriverName = async () => {
      try {
        let name = await AsyncStorage.getItem('driverName');
        setDriverName(name)
      } catch (error) {
        console.log(error);
      }
    };
    welcomeDriverName();
  /////////

    const logoutHandler = async() => {

      await AsyncStorage.getItem('resId');
      await AsyncStorage.removeItem('resId');
      navigationService.navigate('RideScreen');
    
    };

    return (
      <View style={baseStyle}>
         <View
          style={{
            // borderWidth: 1,
            backgroundColor: '#C0FF00',
            height: 105,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Image
            source={Images.user}
            style={{height: 80, width: 80}}></Image>
          <Text>{driverName}</Text>
          <Image source={{}} style={{height: 80, width: 80}}></Image>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigationService.navigate('RideHistoryFromDriverSoloRidesScreen');//RideHistoryScreen
          }}>
         <View
            style={{
              // borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 50,
              margin: 14,
              width: '50%',
            }}>
            <Image
              source={Images.RideHistoryMenu}
              style={{height: 25, width: 25}}></Image>
            <Text>Rides History</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => {
            navigationService.navigate('FAQFromDriverSoloRidesScreen');//LogoutScreen
          }}>
          <View
            style={{
              // borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              margin: 10,
              width: '50%',
            }}>
            <Image
              source={Images.FaqSidemenu}
              style={{height: 25, width: 25}}></Image>
            <Text>FAQs</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigationService.navigate('RatingsReviewsFromDriverSoloRidesScreen');
          }}>
          <View
            style={{
              // borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              // margin: 10,
              margin: 14,
              marginBottom: 10,
              width: '50%',
            }}>
           <Image
              source={Images.FaqSidemenu}
              style={{height: 25, width: 25}}></Image>
            <Text>Ratings</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigationService.navigate('MyIncomeFromDriverSoloRidesScreen');
          }}>
          <View
            style={{
              // borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              margin: 20,
              marginVertical: 20,
              width: '50%',
            }}>
            <Image
              source={Images.walletSidemenu}
              style={{height: 25, width: 25, borderRadius: 5}}></Image>
            <Text>My Income</Text>
          </View>
        </TouchableOpacity>

        <PrimaryButton
          title={'Logout'}
          color={Colors.HeaderColour}
          customStyles={styles.PrimaryButtonLogout}
          onPress={() => {
            logoutHandler();
          }}
        />

        <TouchableOpacity onPress={props.toggleDrawer}>
          <View
            style={{
              // borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              margin: 10,
              marginVertical: 50,
              marginHorizontal: 50,
              width: '65%',
            }}>
            {/* <Text style={{fontWeight: 'bold'}}>Close</Text> */}
          </View>
        </TouchableOpacity>
        <View
          style={{
            // borderWidth: 1,
            height: 40,
            position: 'absolute',
            bottom: 30,
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
            style={{
              borderRadius: 10,
              backgroundColor: '#FFFFFF',
              elevation: 0,
            }}
            // renderTabBar={props2.renderTabBar}
          />
        </View>
      </View>
    );
  };

  return (
    <MenuDrawer
      open={props.open}
      drawerContent={drawerContent()}
      position={position}
      drawerPercentage={70}
      animationTime={800}
      overlay={overlay}
      opacity={5}>
      {props.children}
    </MenuDrawer>
  );
};


export const SoloRidesScreensTwo = (props) => {

  console.log('data from notfication', props.route.params);

  const rideData =props.route.params.remoteData;
  console.log("SoloRidesScreensTwo", rideData.id);

  const [userName, setUserName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  const [pickAddress, setPickAddress] = useState(rideData.from_location);
  const [dropAddress, setDropAddress] = useState(rideData.to_location);
  const [distance, setDistance] = useState(0);
  const [timeDuration, setTimeDuration] = useState(0);
  const [location, setLocation] = useState(null);
  const [name, setName] = useState('');
  const [openDrawer, setDrawerOpen] = useState(false);
  const mapRef = useRef();
  const markerRef = useRef();

 
  const toggleDrawer = () => {
    setDrawerOpen(!openDrawer);
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

  };

  useEffect(() => {
    // const interval = setInterval(() => {
   getLocation();


  //  },3000);
    // return () => clearInterval(interval)

    setTimeout(() => {
      fetch(`http://asaanweb.com/pirayo/index.php/Pirayo_Controller/profile_user/${rideData.id}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(res => {
          console.log('User Details>>>>>>>>>>>>>>>> ', res);
        
  
        
          if(res.response.status==='true'){
        
            setUserName(res.response.data.fullname);
            setPhoneNum(res.response.data.contactnumber);
            setName(res.response.data.fullname);
          }
          
        })
        .catch(error => console.log(error));
    }, 1000);
 }, []);


          //for set pick drop location and name to driver
     const cardAddress = async () => {
      try {
        let pick = rideData.from_location;
        let drop = rideData.to_location;
        let name = await AsyncStorage.getItem('emailname');
         setPickAddress(pick)
         setDropAddress(drop)
         setName(name)
      } catch (error) {
        console.log(error);
      }
    };
    //cardAddress();
   //

//    const driverDATA = () => {
                
//     setInterval(async () => {
//       let id = await AsyncStorage.getItem('resId');
//       database().ref(`DriverLatLng&ID-${id}`).push({
//         latitude: location.latitude,
//         longitude: location.longitude
        
//       })
//       .then((data)=>{
//           //success callback
//           //console.log('data ' , data)
//       }).catch((error)=>{
//           //error callback
//           console.log('error ' , error)
//   });
//     }, 3000);
    
// };



  // onSlideRight = () => {
  //   //perform Action on slide success.
  // };
  //console.log(location.latitude);


  const ready = res => {
    mapRef.current.fitToCoordinates(res.coordinates, {
      // edgePadding: {
      //   right: 30,
      //   bottom: 300,
      //   left: 30,
      //   top: 100,
      // },
      // animated: true,
    });
    setDistance(res.distance); //res.distance
    setTimeDuration(res.duration);
  };


////for Phone Call
  let phoneCall = () => {

    const args = {
      number: `${phoneNum}`, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
      skipCanOpen: true // Skip the canOpenURL check
    }

    call(args)
   .catch(console.error);
  
  };
////



////for Whatsapp
  let messaging = () => {
    Linking.openURL(`whatsapp://send?text=Hello!&phone=${phoneNum}`);

  };
////


///Rider accepted the Request
const acceptRide = async () => {

  var riderId = await AsyncStorage.getItem('riderId');
  // const DriverId = AsyncStorage.getItem('resId').then(res => {
  // });

  const formData = new FormData();
  formData.append('driver_id', riderId);
  formData.append('car_id', 0);
  formData.append('ride_id', rideData.rideid);
  formData.append('userid', rideData.id);

  console.log('driver_id', riderId);
  console.log('car_id', 0);
  console.log('ride_id', rideData.rideid);
  console.log('userid', rideData.id);
  

  setTimeout(() => {
    fetch(`http://asaanweb.com/pirayo/index.php/Ride/acceptridebydriver`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(res => {
        console.log('Rider accepted the ride>>>>>>>>>>>>>>>> ', res);

        const ridesDbRef = firebase.app().database().ref(`/rides/${rideData.rideid}`);
        ridesDbRef.update({
          'isRiderAssigned': true,
          
        }).then(() => {
          console.log("Ride Status Updated");
          navigationService.navigate('WaytoPickupFromSoloRidesScreenTwo',{'remoteData':rideData});
        }).catch(e => console.log('error', e))


        
      })
      .catch(error => console.log(error));
  }, 1000);
};

  return (
    <>
     <View style={{flexDirection: 'row'}}>
      <View
        style={{
          width: wp('100%'),
          height: 80,
          backgroundColor: Colors.HeaderColour,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SwipeButton
          disabled={false}
          //disable the button by doing true (Optional)
          swipeSuccessThreshold={70}
          height={38}
          //height of the button (Optional)
          width={230}
          //width of the button (Optional)
          title="Online"
          titleColor="black"
          //Text inside the button (Optional)
          //thumbIconImageSource={thumbIcon}

          //You can also set your own icon (Optional)
          onSwipeSuccess={() => {
            alert('Online');
            // navigationService.navigate('');
          }}
          //After the completion of swipe (Optional)
          railFillBackgroundColor="#e688a1" //(Optional)
          railFillBorderColor="#e688ff" //(Optional)
          thumbIconBackgroundColor="#FF1717" //(Optional)
          // thumbIconBorderColor="#ed9aff" //(Optional)
          railBackgroundColor="#FFFFFF" //(Optional)
        // railBorderColor="#bbeaff" //(Optional)
        />
      </View>

      <View style={{position: 'absolute', right: 0, zIndex: 1}}>
    <TouchableOpacity onPress={toggleDrawer}>
      <Image
        source={Images.Menu}
        style={{
          height: 49,
          width: 49,
          marginLeft: 5,
          marginTop: 20,
          padding: 10,
        }}
      />
    </TouchableOpacity>
  </View>
  <Drawer open={openDrawer} toggleDrawer={toggleDrawer} style={{zIndex: 0}}>
    {/* Drawer content */}
  </Drawer>
    </View>

      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 10,
          }}>

          {/* <Image style={{
         width: 340,
         height: 480,
         //marginVertical: 0,
      }}
       source={Images.MArkerMap}
     /> */}

        <MapView
          scrollEnabled={true}
          showsUserLocation={true}
          showsTraffic={false}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={location}
          ref={mapRef}
          loadingEnabled={true}
      //  onRegionChangeComplete={(location)=>{setLocation(location)}}
      // image={Images.MapCarSmall} add image to marker
        >
           {location && (
            <Marker
              style={{
                paddingVertical: 1,
                paddingHorizontal: 1,
                borderRadius: 1,
                elevation: 1,
                width: 40,
                height: 40,
              }}
              ref={markerRef}
              coordinate={location}
              //pinColor={'green'}
            >
              <Animated.Image source={Images.ResizeCar} 
               style={{
                  width: 40,
                  height: 40,
                  //transform: [{rotate: rotationCar}],
              }}/>
            </Marker>
          )}
          {/* {dropAddress && <Marker coordinate={dropAddress} pinColor={'red'} />} */}

            <MapViewDirections
            // origin={pickup}
            origin={location}
            destination={dropAddress}
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
        </View>

        <View
          style={{
            flexDirection: 'row',
            //   borderColor: 'black',
            //   borderWidth: 1,
            height: 100,
            margin: 20,
            marginTop: 10,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              messaging();
              navigationService.navigate('MessageScreen');
            }}>
            <Image
              source={Images.Message}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 34,
                width: 34,
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

        <TouchableOpacity
        onPress={(()=>{
          phoneCall();
        })}>
          <Image
            source={Images.Call}
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 34,
              width: 34,
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
              fontSize: 25,
              marginTop: -30,
              color: '#707070',
            }}>
            {name}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              fontSize: 16,
              marginTop: -6,
              color: 'silver',
            }}>
            {phoneNum}
          </Text>
          <Text
            style={{
              alignSelf: 'flex-start',
              marginTop: 9,
              marginLeft: 10,
              color: 'silver',
            }}>
            Distance: {parseFloat(rideData.totalkm).toFixed(2)}Km
          </Text>
        </View>

        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            flexDirection: 'row',
          }}>
          <Image
            source={Images.StraightLocation}
            style={{ height: 84.91, width: 20, margin: 5, marginTop: 30, }}></Image>
          <View style={{ flexDirection: 'column', margin: 5 }}>
            <Text>Pick Up</Text>
            <TextInput selection={{start:0, end:0}}>{pickAddress}</TextInput>
            <Image source={Images.Line} style={{ width: 200, alignSelf: 'flex-start'}}></Image>
            <Text style={{marginTop: 10}}>Drop Off</Text>
            <TextInput selection={{start:0, end:0}}>{dropAddress}</TextInput>
          </View>
        </View>

        <View style={{
          alignItems: 'center',
          margin: 10,
        }}>
          <PrimaryButton
            width={200}
            textColor={"black"}
            title={'Accept PKR '+rideData.totalfare }
            color={Colors.HeaderColour}
            customStyles={styles.PrimaryButton}
            onPress={() => {
              //driverDATA();
              acceptRide();
              
            }} />

          <View style={{ margin: 10 }}></View>

          <PrimaryButton
            width={200}
            textColor={'white'}
            title={'close'}
            color={'#707070'}
            customStyles={styles.PrimaryButton}
            onPress={() => {
              navigationService.navigate('SoloRidesFromDriverRideTypeScreen');
            }}
          />
        </View>
      </ScrollView>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  PrimaryButtonLogout: {
    marginTop: 80,
    width: '85%',
    alignSelf: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textinfo: {
    margin: 10,
    textAlign: 'center',
    fontSize: 10,
  },
  map: {
    width: 352,
    height: 180,
    borderRadius: 10,
    //marginVertical: 100,
    //marginTop: -20,
    marginHorizontal: 1,
  },
});

