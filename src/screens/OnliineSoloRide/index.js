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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


import React, { useState, useEffect } from 'react';
import navigationService from '../../config/navigationService';
import {Metrix, NavigationService, Images, Colors} from '../../config';
// import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import SwipeButton from 'rn-swipe-button';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {Header, ListItem, Avatar} from 'react-native-elements';
import {Center} from 'native-base';
import {Card} from 'react-native-shadow-cards';




export const OnliineSoloRide = () => {
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


  const DATA = [
    {
      id: 'comp1',
      description: 'This is component 1',
      image: require('../../assets/icons/SendBtn.png'),
    },
  ];
  // onSlideRight = () => {
  //   //perform Action on slide success.
  // };

  const list = [
    {
      name: 'Dharmik Tank',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: 'Laravel Devloper',
    },
    {
      name: 'Mehul Bagada',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: 'React Native Devloper',
    },
    {
      name: 'Bhavesh Sonagra',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: 'Designer',
    },
    ,
    {
      name: 'keval kashiyani',
      avatar_url: 'https://www.mywebtuts.com/user-defualt-images.jpg',
      subtitle: 'PHP Devloper',
    },
  ];

  const Comp1 = () => {
    return (
      <View>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Card
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              width: '100%',
              height: 150,
              // width: '95%',
              alignSelf: 'center',
              // marginLeft: 10,
              marginTop: 5,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'column', width: 60}}>
{/* 
              <Text style={{
                alignSelf: 'flex-end',
                marginHorizontal: 25,
                fontSize: 15,
                color: Colors.HeaderColour
                }}>1</Text> */}


               {/* <Text style={{
                alignSelf: 'center',
               // marginHorizontal: 25,
                fontSize: 15,
                color: Colors.HeaderColour
                }}></Text> */}
               <TouchableOpacity
                onPress={() => {
                navigationService.navigate('RideRequestTwo');
              }}>
                <Image
                  source={Images.AsimSamall}
                  style={{
                    height: 50.59,
                    width: 50.59,
                    marginLeft: 10,
                    marginTop: 5,
                  }}></Image>
                </TouchableOpacity>
                
                <View
                  style={{
                    // borderColor: 'black',
                    // borderWidth: 1,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={Images.StraightLocation}
                    style={{height: 54.91, width: 12, margin: 5, marginTop: 20}}></Image>
                  <View style={{flexDirection: 'column', margin: 5}}>
                    <Text>Pick Up</Text>
                    <Text>Dolmin Mall Clifton</Text>
                    <Image source={Images.Line} style={{width: 200}}></Image>
                    <Text>Drop Off</Text>
                    <Text>Chase Up Super Mart Karachi</Text>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'column', width: 180}}>
               
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
                    marginVertical: 60,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  PKR 350
                </Text>
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
      <SafeAreaView style={styles.container}>
      <SwipeButton
            disabled={false}
            //disable the button by doing true (Optional)
            swipeSuccessThreshold={70}
            height={48}
            //height of the button (Optional)
            width={330}
            //width of the button (Optional)
             title="Online"
            titleColor="black"
            //Text inside the button (Optional)
            //thumbIconImageSource={thumbIcon}

            //You can also set your own icon (Optional)
            onSwipeSuccess={() => {
              alert('Online');
            }}
            //After the completion of swipe (Optional)
            railFillBackgroundColor="#e688a1" //(Optional)
            railFillBorderColor="#e688ff" //(Optional)
            thumbIconBackgroundColor="#C0FF00" //(Optional)
            // thumbIconBorderColor="#ed9aff" //(Optional)
            railBackgroundColor="#FFFFFF" //(Optional)
            // railBorderColor="#bbeaff" //(Optional)
          />
       
        <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 10,
        }}>
          <MapView
            scrollEnabled={true}
            showsUserLocation={true}
            showsTraffic={false}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={location}
        //  onRegionChangeComplete={(location)=>{setLocation(location)}}
        // image={Images.MapCarSmall} add image to marker
        ></MapView>
        </View>

 <ScrollView>
 <View style={{
          width: '100%',
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: Colors.HeaderColour,
          alignItems: 'center',
          justifyContent: 'center',
        }}>  
         
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold'
        }}>Current Rides</Text>
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
          {/* <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            
            <Image
              source={Images.Map}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 274,
                width: 354,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 100,
              margin: 10,
              justifyContent: 'center',
              alignSelf: 'center',
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
            <Image
              source={Images.UserPic}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 97.2,
                width: 97.2,
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
              }}>
              Asim Azhar
            </Text>
            <Text
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 20,
              }}>
              +92 300 0000000
            </Text>
          </View>

          <PrimaryButton
            title={'Accept PKR 350'}
            color={Colors.HeaderColour}
            customStyles={styles.PrimaryButton2}
            textColor={'#707070'}
            onPress={() => {
              navigationService.navigate('OnthewayScreen');
            }}
          />
          <PrimaryButton
            title={'Close'}
            color={'#707070'}
            customStyles={styles.PrimaryButton}

            // onPress={() => {
            //   navigationService.navigate('SignupScreen');
            // }}
          /> */}
        
      </SafeAreaView>
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
  PrimaryButton: {
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
  },
  PrimaryButton2: {
    marginTop: 30,
    width: '50%',
    alignSelf: 'center',
  },
  map: {
    width: 360,
    height: 350,
    borderRadius: 10,
    //marginVertical: 100,
    //marginTop: -20,
    marginHorizontal: 1,
  },
});