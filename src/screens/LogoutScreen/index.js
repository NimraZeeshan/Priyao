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

import React from 'react';
import navigationService from '../../config/navigationService';
import {Metrix, NavigationService, Images, Colors} from '../../config';
// import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import SwipeButton from 'rn-swipe-button';
import {Header, ListItem, Avatar} from 'react-native-elements';
import {Center} from 'native-base';
import {TextInput} from 'react-native-gesture-handler';
import MenuDrawer from 'react-native-side-drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import PhoneInput from 'react-native-phone-number-input';
import {useState, useRef} from 'react';


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


export const LogoutScreen = () => {

  const [phoneNumber, setphoneNumber] = useState('');
  const [fullname, setFullName] = useState('');
  const [driverEmail, setDriverEmail] = useState('');
  const [driverContactNumber, setDriverContactNumber] = useState('');
  const [openDrawer, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
   setDrawerOpen(!openDrawer);
  };

  const phoneInput = useRef(null);
  const buttonPress = () => {
    Alert.alert(phoneNumber);
  };

  const profileUser = () => {
  fetch('http://asaanweb.com/pirayo/index.php/Pirayo_Controller/profile_user/25', {
    method: 'GET',
  })
  .then((response) => response.json())
  .then(function(res) {
    console.log(res)
      setFullName(res.response.data.fullname)
      setDriverEmail(res.response.data.email)
      setDriverContactNumber(res.response.data.contactnumber)
  })
  .catch(error => console.log(error));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            height: 120,

            backgroundColor: Colors.HeaderColour,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={Images.LogoutUserPic}
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 144,
              width: 144,
              marginTop: 110,
            }}
          />
           <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <View style={{
          height: 49,
          width: 49,
          marginLeft: 5,
          marginTop: -635,
          position: 'absolute',
          alignSelf: 'flex-start',
          padding: 10,
          marginLeft: 20,
          
        }}>
       <TouchableOpacity onPress={toggleDrawer}>
        <Image
        source={Images.Menu}
          style={{
            height: 49,
            width: 49,
            marginLeft: 5,
            marginTop: -575,
            position: 'absolute',
            alignSelf: 'flex-start',
            padding: 10,
            marginLeft: 20,
      }}
    />
      </TouchableOpacity>
      </View>
      </Drawer>
          <Text style={{fontSize: 21, marginTop: 10}}>Asim Azhar</Text>
        </View>
        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            marginTop: 100,
            height: 350,
            width: '95%',
            alignSelf: 'center',
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 15}}>Full Name</Text>
            <TextInput
              placeholder="Enter full name"
              defaultValue={fullname}
              style={{
                borderWidth: 0.2,
                height: 50,
                paddingHorizontal: 20,
                marginTop: 10,
                borderRadius: 10,
                width: '100%',
              }}></TextInput>
          </View>
          {/* <View style={{flexDirection: 'column', marginTop: 10}}>
            <Text style={{fontSize: 15}}>Last Name</Text>
            <TextInput
              placeholder="Enter last name"
              style={{
                borderWidth: 0.2,
                height: 50,
                paddingHorizontal: 20,
                marginTop: 10,
                borderRadius: 10,
                width: '100%',
              }}></TextInput>
          </View> */}
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 15}}>Email</Text>
            <TextInput
              placeholder="someone@example.com"
              defaultValue={driverEmail}
              style={{
                borderWidth: 0.2,
                height: 50,
                paddingHorizontal: 20,
                marginTop: 10,
                borderRadius: 10,
                width: '100%',
              }}></TextInput>
          </View>
          <View style={styles.container}>
          <Text style={{paddingHorizontal: 10}}>Contact Number</Text>
            <TextInput
              placeholder="someone@example.com"
              defaultValue={driverContactNumber}
              style={{
                borderWidth: 0.2,
                height: 50,
                paddingHorizontal: 20,
                marginTop: 10,
                borderRadius: 10,
                width: '100%',
              }}></TextInput>
          </View>
          {/* <View style={styles.container}>
            <Text style={{paddingHorizontal: 10}}>Contact Number</Text>
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="PK"
              layout="first"
              withShadow
              autoFocus
              containerStyle={styles.phoneContainer}
              textContainerStyle={styles.textInput}
              onChangeFormattedText={text => {
                setphoneNumber(text);
              }}
            /> */}
            {/* <Pressable style={styles.button} onPress={() => buttonPress()}>
            <Text style={styles.continueText}>Get Phone Number</Text>
          </Pressable> */}
          {/* </View> */}
         </View>
        <PrimaryButton
          title={'Done'}
          color={'#707070'}
          customStyles={styles.PrimaryButton}
          onPress={() => {
            profileUser()
            //navigationService.navigate('GetStartedPhone');
          }}
        />
      </SafeAreaView>
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
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },

  phoneContainer: {
    height: 50,
    width: '100%',
    borderColor: 'black',
    borderWidth: 0.2,
    borderRadius: 10,
    marginTop: 10,
  },
  PrimaryButton: {
    marginTop: 25,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#C0FF00',
  },
});
