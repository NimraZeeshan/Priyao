import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  useWindowDimensions,
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
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import { useRoute } from '@react-navigation/native';
import {Header, ListItem, Avatar} from 'react-native-elements';
import {Center} from 'native-base';
import MenuDrawer from 'react-native-side-drawer';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Card} from 'react-native-shadow-cards';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextInput } from 'react-native-gesture-handler';



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
            source={Images.AsimSamall} 
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


export const SoloRidesScreens = () => {
  const [openDrawer, setDrawerOpen] = useState(false);
  const [pickAddress, setPickAddress] = useState('');
  const [dropAddress, setDropAddress] = useState('');
  const [location, setLocation] = useState(null);

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


  const toggleDrawer = () => {
    setDrawerOpen(!openDrawer);
  };

  const Data = {
    image: '',
  };


  const [phoneNumber, setphoneNumber] = useState('');
  const [gender, setGender] = useState('Unknown');
  const phoneInput = useRef(null);
  

  const buttonPress = () => {
    Alert.alert(phoneNumber);
  };

  const [photoone, setPhotoURIone] = useState(null);
  const [phototwo, setPhotoURItwo] = useState(null);
  const [signupData, setSignupData] = useState(Data);
  const DATA = [
    {
      id: 'comp1',
      description: 'This is component 1',
      image: require('../../assets/icons/SendBtn.png'),
    },
  ];

  const Comp1 = () => {

         //for set pick drop location name to driver
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

      <View>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Card
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 205,
              // width: '95%',
              alignSelf: 'center',
              // marginLeft: 10,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'column', width: 60}}>
                <Image
                  source={Images.AsimSamall}
                  style={{
                    height: 50.59,
                    width: 50.59,
                    marginLeft: 10,
                    marginTop: 5,
                  }}></Image>
                <View
                  style={{
                    // borderColor: 'black',
                    // borderWidth: 1,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={Images.StraightLocation}
                    style={{height: 44.91, width: 12, margin: 5}}></Image>
                  <View style={{flexDirection: 'column', margin: 5}}>
                    <Text>Pick Up</Text>
                    <TextInput>{pickAddress}</TextInput>
                    <Image source={Images.Line} style={{width: 200}}></Image>
                    <Text>Drop Off</Text>
                    <TextInput>{dropAddress}</TextInput>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'column', width: 180}}>
                <Text style={{marginLeft: 5, marginTop: 5}}>Asim Azhar</Text>
                <Text style={{marginLeft: 5}}>+92 300 0000000</Text>
                <Text
                  style={{
                    marginLeft: 5,
                    color: '#0887F0',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Ride Share
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: 8,
                  // width: wp(20),
                  // borderColor: 'black',
                  // borderWidth: 1,
                  // width: '35%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: Colors.HeaderColour,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  PKR 350
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 10, paddingRight: 2}}>Distance</Text>
                  <Text style={{fontSize: 10}}>300m</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Seats</Text>
                  <Text>1</Text>
                </View>
                <View
                  style={{
                    width: wp(20),
                    height: 33.94,
                    backgroundColor: Colors.HeaderColour,
                    borderRadius: 5,
                    marginVertical: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                <TouchableOpacity
                  onPress={() => {
                  navigationService.navigate('OnliineSoloRide');}}>
                  <Text style={{color: 'white'}}>Accepted</Text>
                </TouchableOpacity>
                </View>
              </View>
            </View>
          </Card>
        </View>
      </View>
    );
  };
  const mapOfComponents = {
    comp1: <Comp1 />,
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
           title="Offline"
          titleColor="black"
          //Text inside the button (Optional)
          //thumbIconImageSource={thumbIcon}

          //You can also set your own icon (Optional)
          onSwipeSuccess={() => {
            alert('Online');
            // navigationService.navigate('OnliineSoloRide');
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

      <View
        style={{
          // borderColor: 'black',
          // borderWidth: 1,
          width: 291,
          height: 52,
          alignSelf: 'center',
          marginTop: 10,
          backgroundColor: '#707070',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigationService.navigate('SoloRidesFromDriverRideTypeScreen');
          }}>
          <Text style={{color: 'white', fontSize: 24}}>
            Switch to Solo Ride
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            width: 128,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 50,
            marginTop: 10,
            backgroundColor: Colors.HeaderColour,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Text style={{color: '#707070', fontSize: 16}}>Left booked</Text>
        </View>
        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            width: 128,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 30,
            marginTop: 10,
            backgroundColor: '#707070',
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Image
            source={Images.Staring}
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 32,
              width: 33,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            width: 128,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 50,
            marginTop: 10,
            backgroundColor: Colors.HeaderColour,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Text style={{color: '#707070', fontSize: 16}}>Left booked</Text>
        </View>
        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            width: 128,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 30,
            marginTop: 10,
            backgroundColor: '#707070',
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Text style={{color: 'white', fontSize: 16}}>Avalible</Text>
        </View>
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
            loadingEnabled={true}
        //  onRegionChangeComplete={(location)=>{setLocation(location)}}
        // image={Images.MapCarSmall} add image to marker
        ></MapView>

 <View style={{justifyContent: 'flex-end'}}></View>
 <Text style={{fontSize: 23, paddingHorizontal: 10}}>Offers</Text>
 <Text style={{paddingHorizontal: 10}}>Select and offer to continue</Text>
      </View>
      {/* <View style={styles.container}>
          <FlatList
            data={[
              {key: 'Devin'},
              {key: 'Dan'},
              {key: 'Dominic'},
              {key: 'Jackson'},
              {key: 'James'},
              {key: 'Joel'},
              {key: 'John'},
              {key: 'Jillian'},
              {key: 'Jimmy'},
              {key: 'Julie'},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          />
        </View>
         */}
      {/* <ScrollView>
          <View style={styles.container}>
            <View style={styles.mainbox}>
              {list.map((l, i) => (
                <ListItem key={i} bottomDivider>
                  <Avatar source={{uri: l.avatar_url}} />
                  <ListItem.Content>
                    <ListItem.Title>{l.name}</ListItem.Title>
                    <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
          </View>
        </ScrollView> */}
      
        <View>
          <FlatList
            data={DATA}
            renderItem={({item}) => {
              return mapOfComponents[item.id];
            }}
            keyExtractor={item => item.id}
          />
        </View>
        <View>
          <FlatList
            data={DATA}
            renderItem={({item}) => {
              return mapOfComponents[item.id];
            }}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>

      {/* <RNSlidingButton
            style={{
              width: 240,
            }}
            height={35}
            onSlidingSuccess={this.onSlideRight}
            slideDirection={SlideDirection.RIGHT}>
            <View style={{}}>
              <Text numberOfLines={1} style={styles.titleText}>
                SLIDE RIGHT TO ACCEPT >
              </Text>
            </View>
          </RNSlidingButton> */}
          
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
  container2: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textinfo: {
    margin: 10,
    textAlign: 'center',
    fontSize: 10,
  },
  //////////////
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
  PrimaryButton: {
    marginBottom: 10,
  },
  PrimaryButton2: {
    marginBottom: 10,
  },
  PrimaryButtonLogout: {
    marginTop: 80,
    width: '85%',
    alignSelf: 'center',
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
    width: 352,
    height: 250,
    borderRadius: 10,
    //marginVertical: 100,
   //marginTop: -20,
    marginHorizontal: 1,
  },
});
