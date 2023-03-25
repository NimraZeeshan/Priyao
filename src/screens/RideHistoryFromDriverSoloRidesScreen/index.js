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
import MenuDrawer from 'react-native-side-drawer';
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

 

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const renderScenes = SceneMap({
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


export const RideHistoryFromDriverSoloRidesScreen = () => {

  const [openDrawer, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!openDrawer);
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Solo Ride' },
    { key: 'second', title: 'Ride Sharing' },
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
        <View style={{position: 'absolute', right: 0, zIndex: 1}}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Image
              source={Images.Menu}
              style={{
                height: 49,
                width: 49,
                marginTop: 12,
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
