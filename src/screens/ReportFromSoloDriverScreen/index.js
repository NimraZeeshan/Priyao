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

  export const ReportFromSoloDriverScreen = () => {
    const [openDrawer, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
      setDrawerOpen(!openDrawer);
    };
    // onSlideRight = () => {
    //   //perform Action on slide success.
    // };
  
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
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold', letterSpacing: 1}}>Report</Text>
          {/* <Image
            source={Images.Menu}
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 49,
              width: 49,
              marginLeft: 5,
              marginTop: 5,
              position: 'absolute',
              alignSelf: 'flex-start',
              padding: 10,
              marginLeft: 20,
            }}
          /> */}
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
            borderColor: 'black',
            borderWidth: 0.2,
            height: 52,
            width: '80%',
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: 50,
            alignItems: 'center',
            borderRadius: 5,
            //backgroundColor: 'silver'
          }}>
          <Text>Didn't paid the amount</Text>
        </View>
        <View
          style={{
            borderColor: 'black',
            borderWidth: 0.2,
            height: 52,
            width: '80%',
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: 30,
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Text>User lost an item</Text>
        </View>
        <View
          style={{
            borderColor: 'black',
            borderWidth: 0.2,
            height: 52,
            width: '80%',
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: 30,
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Text>Was disturbing me during ride </Text>
        </View>
        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            height: 150,
            flexDirection: 'column',
            marginTop: 20,
            // width: '100%',
            margin: 20,
          }}>
          <Text style={{fontWeight: 'bold'}}>Other</Text>
          <TextInput
            style={{
              height: 111.75,
              borderColor: 'black',
              borderWidth: 0.2,
              marginTop: 10,
              paddingBottom: 70,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}
            placeholder="Please Describe "
          />
        </View>
        <PrimaryButton
          textColor={"white"}
          title={'Submit'}
          color={'#707070'}
          customStyles={styles.PrimaryButton}
          onPress={() => {
            navigationService.navigate('SoloRidesFromDriverRideTypeScreen');
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
      marginTop: 30,
      width: '80%',
      alignSelf: 'center',
    },
    PrimaryButtonLogout: {
      marginTop: 80,
      width: '85%',
      alignSelf: 'center',
    },
  });
  