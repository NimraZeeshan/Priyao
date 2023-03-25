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
  
  import React, {useState} from 'react';
  import navigationService from '../../config/navigationService';
  import {Metrix, NavigationService, Images, Colors} from '../../config';
  import MenuDrawer from 'react-native-side-drawer';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
  // import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
  import SwipeButton from 'rn-swipe-button';
  import {Header, ListItem, Avatar} from 'react-native-elements';
  // import {Card, Center} from 'native-base';
  import {Card} from 'react-native-shadow-cards';
  import {TextInput} from 'react-native-gesture-handler';
  import metrix from '../../config/metrix';
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
  

  export const FAQFromDriverSoloRidesScreen = () => {

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
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      backgroundColor: Colors.HeaderColour,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{fontSize: 29, fontWeight: 'bold', letterSpacing: 2}}>
      FAQs
    </Text>
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
        
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.row}>
            <View style={styles.bulletText}>
              <Text style={{fontSize: 18, fontWeight: '200',  marginHorizontal:3}}>
                1. How to take an order: In the application there is a tape of
                orders. If you want to take an order, you need to click on it.
                Depending on the scheme of operation, a window will appear with
                the time of delivery of the car or an automatic call will be sent
                to the passenger.
              </Text>
              <Text style={{marginTop: 10, marginHorizontal:3, fontSize: 18, fontWeight: '200'}}>
                2. I can not win an order You have a low rating or you are further
                from the client than those drivers who send a request for this
                order. Change your location. Provide service at a high level this
                will help to get good grades.
              </Text>
              <Text style={{marginTop: 10,  marginHorizontal:3, fontSize: 18, fontWeight: '200'}}>
                3. The passenger did not go to the order or there was a conflict
                situation Before the completion of the order, click the button
                "Problems with the order", select the appropriate menu item. After
                validating the data, the violators will be blocked.
              </Text>
              <Text style={{marginTop: 10, marginHorizontal:3, fontSize: 18, fontWeight: '200'}}>
                4. The application does not make outgoing calls to orders Try to
                reinstall the application and on the first call, click "Allow" and
                select "Phone". In the phone settings, give access to calls to the
                inDriver application: Settings - Application Permissions -
                inDriver - Make calls - Allow.
              </Text>
              <Text style={styles.text5}>
                5. Shows orders from another city Select any other city, click
                save. Select your city again. Restart the application. 6. The
                application asks you to enable GPS with GPS enabled
              </Text>
            </View>
          </View>
        </ScrollView>

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
      marginTop: 10,
      width: '80%',
      alignSelf: 'center',
    },
    PrimaryButtonLogout: {
      marginTop: 80,
      width: '85%',
      alignSelf: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      flex: 1,
      marginVertical: 4,
      paddingLeft: 5,
      paddingRight: 5,
      marginTop: 20,
    },
    bullet: {
      width: 10,
    },
    bulletText: {
      flex: 1,
    },
    text5: {
      marginTop: 10,
      fontSize: 20,
      fontWeight: '200',
      marginHorizontal:3,
    },
  });
  