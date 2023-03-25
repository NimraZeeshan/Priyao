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

import React, {useState}  from 'react';
import MenuDrawer from 'react-native-side-drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import navigationService from '../../config/navigationService';
import {Metrix, NavigationService, Images, Colors} from '../../config';
// import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import SwipeButton from 'rn-swipe-button';
import {Header, ListItem, Avatar} from 'react-native-elements';
// import {Card, Center} from 'native-base';
import {Card} from 'react-native-shadow-cards';
import {TextInput} from 'react-native-gesture-handler';
import metrix from '../../config/metrix';


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


export const FAQScreen = () => {

  const [openDrawer, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!openDrawer);
   };


  return (
    <>
      <View
        style={{
          height: 120,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: Colors.HeaderColour,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 29, fontWeight: 'bold'}}>FAQs</Text>
      </View>
      {/* <View
        style={{borderColor: 'black', borderWidth: 1, marginTop: 20}}></View> */}
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

      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <View>
       <TouchableOpacity onPress={toggleDrawer}>
        <Image
        source={Images.Menu}
          style={{
            height: 49,
            width: 49,
            marginLeft: 5,
            marginTop: -615,
            position: 'absolute',
            alignSelf: 'flex-start',
            padding: 10,
            marginLeft: 20,
      }}
    />
      </TouchableOpacity>
      </View>
      </Drawer>
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
