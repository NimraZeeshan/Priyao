import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
    useWindowDimensions,
    FlatList,
  } from 'react-native';

  import {
    AuthHeader,
    AuthContainer,
    PrimaryInput,
    PrimaryButton,
    Loading,
  } from '../../components';
  
  import React, {useState} from 'react';
  import navigationService from '../../config/navigationService';
  import {Metrix, NavigationService, Images, Colors} from '../../config';
  // import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
  import SwipeButton from 'rn-swipe-button';
  import {Header, ListItem, Avatar} from 'react-native-elements';
  import {Center} from 'native-base';
  import MenuDrawer from 'react-native-side-drawer';
  import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
  import {TextInput} from 'react-native-gesture-handler';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';


  
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

  
  export const PAymentFromSoloDriverScreen = () => {
    const [openDrawer, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
      setDrawerOpen(!openDrawer);
    };

    return (
      <>
       <View style={{flexDirection: 'row'}}>
  <View
    style={{
      width: wp('100%'),
      height: 80,
      borderBottomLeftRadius: 35,
      borderBottomRightRadius: 35,
      backgroundColor: Colors.HeaderColour,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View
      style={{
        height: 45,
        width: 180,
        borderRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'center', // added to center vertically
      }}
    >
      <View
        style={{
          height: 35,
          width: 90,
          //marginTop: 5,
          marginHorizontal: 4,
          borderRadius: 50,
          backgroundColor: Colors.HeaderColour,
          alignSelf: 'flex-end',
        }}
      >
        <Text style={{alignSelf: 'center', marginVertical: 8, fontWeight: 'bold', letterSpacing: 1}}>Online</Text>
      </View>
    </View>
  </View>


      <View style={{position: 'absolute', right: 0, zIndex: 1}}>
    <TouchableOpacity onPress={toggleDrawer}>
      <Image
        source={Images.Menu}
        style={{
          height: 49,
          width: 49,
          marginTop: 20,
        }}
      />
    </TouchableOpacity>
      </View>

  <Drawer open={openDrawer} toggleDrawer={toggleDrawer} style={{zIndex: 0}}>
    {/* Drawer content */}
  </Drawer>
      </View>

        {/* <Image
            source={Images.Menu}
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 49,
              width: 49,
              marginRight: 20,
              marginTop: -65,
              alignSelf: 'flex-end',
            }}
          /> */}
        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            flexDirection: 'column',
            marginTop: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, marginTop: -25}}>Payment</Text>
          <Text style={{fontSize: 24, marginTop: 20}}>Total Fare</Text>
          <Text style={{fontSize: 50, fontWeight: 'bold', color: Colors.HeaderColour}}>
            PKR 600
          </Text>
        </View>
        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            height: 50,
            width: '95%',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Image
            source={Images.LineImage}
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 32,
              width: '95%',
            }}
          />
        </View>
        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            height: 20,
            // width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
            marginRight: 20,
          }}>
          <Text>Dolmin Mall</Text>
          <Text style={{marginHorizontal: 60}}>Chase Up</Text>
        </View>
        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            height: 20,
            // width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
            marginRight: 20,
          }}>
          <Text style={{color: '#97ADB6'}}>Dolmin Mall Road</Text>
          <Text style={{color: '#97ADB6'}}>Super Mart Karachi</Text>
        </View>
        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
  
            marginTop: 30,
            width: '95%',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text>Enter Collected Amount</Text>
          <TextInput
            style={{
              borderColor: 'black',
              borderWidth: 0.2,
              height: 50,
              marginTop: 10,
              paddingHorizontal: 120,
              fontSize: 20,
              borderRadius: 20,
            }}
            placeholder="PKR 1000"
          />
        </View>
        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            marginTop: 20,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
            marginRight: 10,
          }}>
          <Text style={{fontSize: 14}}>Return Balance</Text>
          <Text style={{color: Colors.HeaderColour, fontSize: 22, fontWeight: 'bold'}}>pkr 400</Text>
        </View>
        <TextInput
          style={{
            borderColor: 'black',
            borderWidth: 0.2,
            height: 50,
            marginTop: 10,
            paddingHorizontal: 110,
            fontSize: 20,
            width: '95%',
            alignSelf: 'center',
            borderRadius: 20,
          }}
          placeholder="Enter Amount"
        />
        {/* <View style={{marginTop: 15, alignItems: 'flex-end', marginRight: 20}}>
          <TouchableOpacity
            onPress={() => {
              navigationService.navigate('AddtowalletScreen'); //AddtowalletScreen
            }}>
            <Text style={{color: '#0887F0'}}>Add to Wallet</Text>
          </TouchableOpacity>
        </View> */}
        <PrimaryButton
          title={'Report'}
          color={'#FF0000'}
          textColor="white"
          customStyles={styles.PrimaryButton}
          onPress={() => {
            navigationService.navigate('ReportFromSoloDriverScreen'); //RideHistoryScreen
          }}
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
      marginTop: 15,
      width: '80%',
      alignSelf: 'center',
    },
    PrimaryButtonLogout: {
      marginTop: 80,
      width: '85%',
      alignSelf: 'center',
    },
  });
  