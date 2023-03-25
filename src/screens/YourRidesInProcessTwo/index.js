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
  } from 'react-native';
  import {
    AuthHeader,
    AuthContainer,
    PrimaryInput,
    PrimaryButton,
    Loading,
  } from '../../components';
  
  import React,{useEffect} from 'react';
  import navigationService from '../../config/navigationService';
  import {Metrix, NavigationService, Images, Colors} from '../../config';
  // import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
  import SwipeButton from 'rn-swipe-button';
  import {Header, ListItem, Avatar} from 'react-native-elements';
  import {Center} from 'native-base';
  import {TextInput} from 'react-native-gesture-handler';
  import {useState, useRef} from 'react';
  import {Card} from 'react-native-shadow-cards';
  import MenuDrawer from 'react-native-side-drawer';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
  import StarRating from 'react-native-star-rating-widget';
  import {widthPercentageToDP} from 'react-native-responsive-screen';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { color } from 'react-native-reanimated';


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
  const [UserName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'UserMode'},
    {key: 'second', title: 'DriverMOde'},
  ]);

  const overlay = true;
  const position = 'left';


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

      //for set driver name on Solo ride screen
      const welcomeUserName = async () => {
        try {
          let name = await AsyncStorage.getItem('UserName');
          setUserName(name)
        } catch (error) {
          console.log(error);
        }
      };
      welcomeUserName();
    //
  
    const logoutHandler = async() => {
      
      await AsyncStorage.getItem('UserId');
      await AsyncStorage.removeItem('UserId');
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
      <Text>{UserName}</Text>
      <Image source={{}} style={{height: 80, width: 80}}></Image>
    </View>
    <TouchableOpacity
      onPress={() => {
        navigationService.navigate('RideHistoryScreen'); //OnliineRideScreen
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
        <Text>Your Rides</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => {
        navigationService.navigate('LogoutScreen');
      }}>
      {/* <View
        style={{
          // borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: 10,
          width: '50%',
        }}>
        <Image
          source={Images.ProfileSidemenu}
          style={{height: 25, width: 25}}></Image>
        <Text>User Profile</Text>
      </View> */}
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        navigationService.navigate('AddtowalletScreen');
      }}>
      <View
        style={{
          // borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: 20,
          marginVertical: 40,
          width: '50%',
        }}>
        <Image
          source={Images.walletSidemenu}
          style={{height: 25, width: 25, borderRadius: 5}}></Image>
        <Text>My Wallet</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        navigationService.navigate('FAQScreen');
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
        <Text>FAQs</Text>
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

    {/* <TouchableOpacity
      onPress={() => {
        navigationService.navigate('RatingsAndReviewsScreen');
      }}>
      <View
        style={{
          // borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: 10,
          width: '65%',
        }}>
        <Image
          source={Images.walletSidemenu}
          style={{height: 25, width: 25, borderRadius: 5}}></Image>
        <Text>Ratings Reviews</Text>
      </View>
    </TouchableOpacity> */}
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
  
 export const YourRidesInProcessTwo = () => {
  const [openDrawer, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!openDrawer);
   };
  
    return (
      <>
        <View
          style={{
            height: 79,
  
            backgroundColor: Colors.HeaderColour,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold', letterSpacing: 2,}}>Your Rides</Text>
        </View>
      <TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text  style={{fontSize: 20, marginVertical: 10, fontWeight: 'bold',}}>
          In Process     |     History</Text>
        </View>
  
        <View style={{flexDirection: 'column'}}>
        <Text style={{alignSelf: 'flex-start',
                      fontWeight: 'bold',
                      marginHorizontal: 70,
                      marginVertical: -20,
                      color: Colors.HeaderColour,
                      }}>________________</Text>
        </View>
        </TouchableOpacity>

        <ScrollView>
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
      </ScrollView>

      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <View style={{
          //flex: 1,
          //flexDirection: 'row',
          //justifyContent: 'center',
          //alignItems: 'flex-start',
          
        }}>
       <TouchableOpacity onPress={toggleDrawer}>
        <Image
        source={Images.Menu}
          style={{
            height: 49,
            width: 49,
            marginLeft: 5,
            marginTop: -635,
            position: 'absolute',
            alignSelf: 'flex-start',
            padding: 10,
            marginLeft: 20,
      }}
    />
     <TouchableOpacity  onPress={() => {
        navigationService.navigate('RideHistoryScreen');
      }}>
     <Image
        source={Images.BackArrow}
          style={{
            height: 49,
            width: 49,
            marginLeft: 5,
            marginTop: -635,
            position: 'absolute',
            alignSelf: 'flex-end',
            padding: 10,
            marginLeft: 20,
      }}
    />
    </TouchableOpacity>
      </TouchableOpacity>
      </View>
      </Drawer>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 5,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
    },
    title: {
      fontSize: 14,
    },
    PrimaryButtonLogout: {
      marginTop: 80,
      width: '85%',
      alignSelf: 'center',
    },
  });
  