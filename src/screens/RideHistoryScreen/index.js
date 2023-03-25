import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
  Image,
  FlatList,
  Modal,
} from 'react-native';

import {
  AuthHeader,
  AuthContainer,
  PrimaryInput,
  PrimaryButton,
  Loading,
} from '../../components';

import {Card} from 'react-native-shadow-cards';
import { Drawer } from '../../components/Drawer';
import React, {useEffect} from 'react';
import navigationService from '../../config/navigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Images, Colors} from '../../config';
import {useState, useRef, useCallback} from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';




const FirstTab = () => {

  const [rideProcess, setRideProcess] = useState(null);
  
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
        //console.log('Rides processed: ', res);
        if (Array.isArray(res)) {
          setRideProcess(res);
        } else {
          setRideProcess([res]);
        }
      })
      .catch(error => console.log(error));
    };
  
    useEffect(() => { 
      getRideinProcess();
    }, []);
    
    
    useEffect(() => {
      if (rideProcess) {
        rideProcess.map((ride, index) => {
          //console.log(`Ride Process >>>>>>>>> ${ride.message}:`);
        });
      } else {
        console.log('ride Process is null or undefined');
      }
    }, [rideProcess]);
    ////////
  /////////
  
    return (
      <>
  
  <View style={{ flex: 1, height: '100%', justifyContent: 'center' }}>
            <FlatList
              data={rideProcess}
              keyExtractor={(item) => item.id?.toString()}
              renderItem={({item}) => {
  
            return (
                
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{width: '96%', height: hp('30%'), alignSelf: 'center', marginTop: hp('2%'), flex: 1}}> 
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp('90%'),
          }}>
          <View style={{flexDirection: 'column', marginLeft: 10}}>
            <Text style={{}}>{'28/07/2022'}</Text>
            <Text style={{}}>{'+92 300 0000000'}</Text>
          </View>
          <View style={{flexDirection: 'column', marginRight: 10}}>
            <Text style={{alignSelf: 'flex-end'}}>{'PKR 350'}</Text>
            <Text style={{alignSelf: 'flex-end'}}>{'Paid Cash'}</Text>
  
            {/* <StarRating
              rating={rating}
              onChange={setRating}
              style={{alignSelf: 'center'}}
            /> */}
          </View>
        </View>
  
        <Image
          source={Images.Map}
          style={{
            //   borderColor: 'black',
            //   borderWidth: 1,
            height: 160,
            width: wp('96%'),
            marginTop: 5,
            borderRadius: 20,
          }}
        />
      </Card>
    </View>
          
              )
              
              }}
              
            />
            </View>
       
   </>
    )
  };
  
  const SecondTab = () => {
  
    const [ridesCompleted, setRidesCompleted] = useState(null);
  
    ////////RideInProcess API
    const getRidesCompleted = async () => {
      const userId = await AsyncStorage.getItem('UserId');
      console.log('User ID: ', userId);
    
      const rideCompletedData = new FormData();
      rideCompletedData.append('user_id', userId);
    
      await fetch(`http://asaanweb.com/pirayo/index.php/Ride/getRidesCompleted`, {
        method: 'POST',
        body: rideCompletedData,
      })
      .then(response => response.json())
      .then(res => {
        //console.log('Rides completed: ', res);
        if (Array.isArray(res)) {
          setRidesCompleted(res);
        } else {
          setRidesCompleted([res]);
        }
      })
      .catch(error => console.log(error));
    };
  
  
  useEffect(() => { 
    getRidesCompleted();
  }, []);
  
  
  useEffect(() => {
    if (ridesCompleted) {
      ridesCompleted.map((ride, index) => {
        console.log(`Ride >>>>>>>>> ${ride}:`);
      });
    } else {
      console.log('ridesCompleted is null or undefined');
    }
  }, [ridesCompleted]);
  /////////
  
  
  
  
  return (
    <>
    <View style={{ flex: 1, height: '100%', justifyContent: 'center', }}>
          <FlatList
            data={ridesCompleted}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={({item}) => {
  
          return (
              
         <View>
          <Card style={{width: '96%', height: 140, alignSelf: 'center', marginTop: hp('2%'), flex: 1}}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={Images.AsimSamall}
                style={{
                  // borderColor: 'black',
                  // borderWidth: 1,
                  height: 50.59,
                  width: 50.59,
                  alignSelf: 'flex-start',
                  margin: 5,
                }}></Image>
              <View style={{flexDirection: 'column'}}>
                {/* <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                  Suzuki Mehran
                </Text> */}
                <Text style={{fontSize: 13, color: '#97ADB6'}}>Asim Azhar</Text>
                <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                  +9234005678934
                </Text>
                <Text style={{fontSize: 16, color: 'blue'}}>
                  Solo Ride
                </Text>
              </View>
              <View style={{marginLeft: 60, flexDirection: 'column',}}>
                <Text style={{color: Colors.HeaderColour, fontSize: 25, fontWeight: 'bold'}}>PKR 150</Text>
                <Text style={{fontSize: 12,}}>Distance       100m</Text>
                </View>
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
                <Text style={{marginLeft: 5, fontSize: 12}}>Dolmin Mall Clifton</Text>
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
                  <Text style={{marginLeft: 5, fontSize: 8}}>
                    Chase Up Super Mart Karachi
                  </Text>
                </View>
              </View>
            </View>
          </Card>
  
          <Card style={{width: '96%', height: 140, alignSelf: 'center', marginTop: 10}}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={Images.AsimSamall}
                style={{
                  //   borderColor: 'black',
                  //   borderWidth: 1,
                  height: 50.59,
                  width: 50.59,
                  alignSelf: 'flex-start',
                  margin: 5,
                }}></Image>
              <View style={{flexDirection: 'column'}}>
                {/* <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                  Suzuki Mehran
                </Text> */}
                <Text style={{fontSize: 13, color: '#97ADB6'}}>Asim Azhar</Text>
                <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                  +9234005678934
                </Text>
                <Text style={{fontSize: 16, color: 'blue'}}>
                  Solo Ride
                </Text>
              </View>
              <View style={{marginLeft: 60, flexDirection: 'column',}}>
                <Text style={{color: Colors.HeaderColour, fontSize: 25, fontWeight: 'bold'}}>PKR 150</Text>
                <Text style={{fontSize: 12,}}>Distance       100m</Text>
                </View>
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
                <Text style={{marginLeft: 5, fontSize: 12}}>Dolmin Mall Clifton</Text>
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
                  <Text style={{marginLeft: 5, fontSize: 8}}>
                    Chase Up Super Mart Karachi
                  </Text>
                </View>
              </View>
            </View>
          </Card>
  
          <Card style={{width: '96%', height: 140, alignSelf: 'center', marginTop: 10}}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={Images.AsimSamall}
                style={{
                  //   borderColor: 'black',
                  //   borderWidth: 1,
                  height: 50.59,
                  width: 50.59,
                  alignSelf: 'flex-start',
                  margin: 5,
                }}></Image>
              <View style={{flexDirection: 'column'}}>
                {/* <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                  Suzuki Mehran
                </Text> */}
                <Text style={{fontSize: 13, color: '#97ADB6'}}>Asim Azhar</Text>
                <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                  +9234005678934
                </Text>
                <Text style={{fontSize: 16, color: 'blue'}}>
                  Solo Ride
                </Text>
              </View>
              <View style={{marginLeft: 60, flexDirection: 'column',}}>
                <Text style={{color: Colors.HeaderColour, fontSize: 25, fontWeight: 'bold'}}>PKR 150</Text>
                <Text style={{fontSize: 12,}}>Distance       100m</Text>
                </View>
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
                <Text style={{marginLeft: 5, fontSize: 12}}>Dolmin Mall Clifton</Text>
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
                  <Text style={{marginLeft: 5, fontSize: 8}}>
                    Chase Up Super Mart Karachi
                  </Text>
                </View>
              </View>
            </View>
          </Card>
  
          <Card style={{width: '96%', height: 140, alignSelf: 'center', marginTop: 10}}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={Images.AsimSamall}
                style={{
                  //   borderColor: 'black',
                  //   borderWidth: 1,
                  height: 50.59,
                  width: 50.59,
                  alignSelf: 'flex-start',
                  margin: 5,
                }}></Image>
              <View style={{flexDirection: 'column'}}>
                {/* <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                  Suzuki Mehran
                </Text> */}
                <Text style={{fontSize: 13, color: '#97ADB6'}}>Asim Azhar</Text>
                <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                  +9234005678934
                </Text>
                <Text style={{fontSize: 16, color: 'blue'}}>
                  Solo Ride
                </Text>
              </View>
              <View style={{marginLeft: 60, flexDirection: 'column',}}>
                <Text style={{color: Colors.HeaderColour, fontSize: 25, fontWeight: 'bold'}}>PKR 150</Text>
                <Text style={{fontSize: 12,}}>Distance       100m</Text>
                </View>
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
                <Text style={{marginLeft: 5, fontSize: 12}}>Dolmin Mall Clifton</Text>
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
                  <Text style={{marginLeft: 5, fontSize: 8}}>
                    Chase Up Super Mart Karachi
                  </Text>
                </View>
              </View>
            </View>
          </Card>
          <Card style={{width: '96%', height: 140, alignSelf: 'center', marginTop: 10}}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={Images.AsimSamall}
                style={{
                  //   borderColor: 'black',
                  //   borderWidth: 1,
                  height: 50.59,
                  width: 50.59,
                  alignSelf: 'flex-start',
                  margin: 5,
                }}></Image>
              <View style={{flexDirection: 'column'}}>
                {/* <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                  Suzuki Mehran
                </Text> */}
                <Text style={{fontSize: 13, color: '#97ADB6'}}>Asim Azhar</Text>
                <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                  +9234005678934
                </Text>
                <Text style={{fontSize: 16, color: 'blue'}}>
                  Solo Ride
                </Text>
              </View>
              <View style={{marginLeft: 60, flexDirection: 'column',}}>
                <Text style={{color: Colors.HeaderColour, fontSize: 25, fontWeight: 'bold'}}>PKR 150</Text>
                <Text style={{fontSize: 12,}}>Distance       100m</Text>
                </View>
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
                <Text style={{marginLeft: 5, fontSize: 12}}>Dolmin Mall Clifton</Text>
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
                  <Text style={{marginLeft: 5, fontSize: 8}}>
                    Chase Up Super Mart Karachi
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        </View>
        )}}
            
      />
      </View>
   </>
    )
  };

const renderScene = SceneMap({
  first: FirstTab,
  second: SecondTab,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabbar}
    labelStyle={styles.label}
  />
);

 

export const RideHistoryScreen = () => {

  const [openDrawer, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!openDrawer);
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'In Process' },
    { key: 'second', title: 'History' },
  ]);

  const handleIndexChange = index => setIndex(index);
  const { width } = useWindowDimensions();
  return (
    <>

<View style={{flex: 1}}>
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            width: width,
            height: 70,
            backgroundColor: Colors.HeaderColour,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 29, fontWeight: 'bold', letterSpacing: 2}}>
            Your Rides
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

      <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      renderTabBar={renderTabBar}
    />
    </View>

    </>
  );
};

const styles = StyleSheet.create({
  PrimaryButtonLogout: {
    marginTop: 80,
    width: '85%',
    alignSelf: 'center',
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  tabbar: {
    backgroundColor: 'white',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  indicator: {
    backgroundColor: Colors.HeaderColour,
    height: 3,
  },
});
