import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
  Dimensions,
  PermissionsAndroid,
  Image,
  FlatList,
  props,
} from 'react-native';
import {
  AuthHeader,
  AuthContainer,
  PrimaryInput,
  PrimaryButton,
  Loading,
} from '../../components';

import React, {useEffect, useRef, useState} from 'react';
import navigationService from '../../config/navigationService';
import {Metrix, NavigationService, Images, Colors} from '../../config';
import {Header, ListItem, Avatar} from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { Drawer } from '../../components/Drawer';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';




const DATA = [
  {
    id: 'comp1',
    description: 'This is component 1',
    image: require('../../assets/icons/SendBtn.png'),
  },
  //   {
  //     id: 'comp1',
  //     description: 'This is component 1',
  //     image: require('../../assets/icons/SendBtn.png'),
  //   },

  //   {
  //     id: 'comp2',
  //     description: 'This is component 2',
  //   },
];

const Comp1 = () => {


  return (
    <View style={{marginTop: 20}}>
      <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => {
          navigationService.navigate('FindingCaptainScreenFromFixedRoutes');
        }}>
        <Image
          source={Images.user}
          style={{
            height: 50.59,
            width: 50.59,
            marginLeft: 2,
            marginTop: 5,
          }}></Image>
      </TouchableOpacity>
        <View
          style={{
            //   borderColor: 'black',
            //   borderWidth: 1,
            width: 130,
            flexDirection: 'column',
          }}>
          <Text style={{marginTop: 5, marginLeft: 5}}>Suzuki Mehran</Text>
          <Text style={{marginTop: 5, marginLeft: 5, color: '#97ADB6'}}>
            Asim Azhar
          </Text>
          <Text style={{marginTop: 5, marginLeft: 5}}>2 Seats Booked</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            //   borderColor: 'black',
            //   borderWidth: 1,
            width: 95,
          }}>
          <Text style={{color: '#97ADB6'}}>Weekly Paid</Text>
          <Text style={{color: Colors.HeaderColour}}>PKR 350</Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            //   borderColor: 'black',
            //   borderWidth: 1,
            width: 110,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: -65,
            marginTop: 30
          }}>
          <Image
            source={Images.CarSmall}
            style={{width: 110, height: 33.68}}
          />
        </View>
      </View>

      <View
        style={{
          //   borderColor: 'black',
          //   borderWidth: 1,
          height: 50,
          width: '80%',
          alignSelf: 'center',
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <Image
          source={Images.metlocation}
          style={{width: 15, height: 20}}></Image>
        <View style={{flexDirection: 'column'}}>
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
          <View style={{flexDirection: 'column', width: '50%'}}>
            <Text style={{color: '#97ADB6', fontSize: 10, marginLeft: 5}}>
              Drop Off
            </Text>
            <Text style={{marginLeft: 5, fontSize: 10}}>
              Chase Up Super Mart Karachi
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          //   borderColor: 'black',
          //   borderWidth: 1,
          width: '80%',
          height: 36,
          marginLeft: 30,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image source={Images.Oval} style={{width: 20, height: 60}}></Image>
        <View style={{flexDirection: 'column', width: '50%'}}>
          <Text style={{color: '#707070', fontSize: 14, marginLeft: 5}}>
            Days Booked
          </Text>
          <Text style={{marginLeft: 5, fontSize: 10, color: '#97ADB6'}}>
            Days booked for
          </Text>
        </View>
      </View>
      <View
        style={{
          //   borderColor: 'Black',
          //   borderWidth: 1,
          height: 50,
          width: '95%',
          alignSelf: 'center',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity>
          <Image source={Images.Mon} style={{width: 40, height: 40}}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Images.Tues} style={{width: 40, height: 40}}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Images.Wed} style={{width: 40, height: 40}}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Images.Thus} style={{width: 40, height: 40}}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Images.Fri} style={{width: 40, height: 40}}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Images.Sat} style={{width: 40, height: 40}}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Images.Sun} style={{width: 40, height: 40}}></Image>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const mapOfComponents = {
  comp1: <Comp1 />,
};




export const RideHistoryScreenTwo = () => {

  const [openDrawer, setDrawerOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const mapRef = useRef();

  const toggleDrawer = () => {
    setDrawerOpen(!openDrawer);
   };


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
          position => {
            console.log('position', position);

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
          },

         
        );
      }
    });

  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      
  <View style={{flexDirection: 'row'}}>
    <View
      style={{
        width: wp('100%'),
        height: 80,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: Colors.HeaderColour,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{fontSize: 25, fontWeight: 'bold', letterSpacing: 2}}>
        Your Routes
      </Text>
    </View>

    <View style={{position: 'absolute', left: 0, zIndex: 1}}>
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

        <View>
          <FlatList
            data={DATA}
            renderItem={({item}) => {
              return mapOfComponents[item.id];
            }}
            keyExtractor={item => item.id}
          />
        </View>

        <View
        style={{
          marginTop: 10,
          // height: hp('50%'),
        }}>
  
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
        >
        </MapView>
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
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
  PrimaryButtonLogout: {
    marginTop: 80,
    width: '85%',
    alignSelf: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: hp('50%'),
    },
});
