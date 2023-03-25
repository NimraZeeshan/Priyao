import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    useWindowDimensions,
  } from 'react-native';

import {PrimaryButton} from '../../components';
import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Images, Colors} from '../../config';
import navigationService from '../../config/navigationService';
import MenuDrawer from 'react-native-side-drawer';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';



const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});


export const Drawer = props => {
    const layout = useWindowDimensions();
    const [UserName, setUserName] = useState('');
    const [index, setIndex] = React.useState(0);
  
    const [routes] = React.useState([
      {key: 'first', title: 'UserMode'},
      {key: 'second', title: 'DriverMOde'},
    ]);
  
    const overlay = true;
    const position = 'left';
  
    const drawerContent = () => {
     // const route = useRoute();
  
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
  
      const welcomeUserName = async () => {
        try {
          let name = await AsyncStorage.getItem('UserName');
          setUserName(name.toUpperCase())
        } catch (error) {
          console.log(error);
        }
    };
  
  useEffect(()=>{
    welcomeUserName();
  },[]);
  
  
  
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

  const styles = StyleSheet.create({
    
    tabBar: {
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
      borderColor: 'black',
    },
    indicatorStyle: {
      backgroundColor: 'white',
      padding: 1.5,
      marginBottom: -2,
    },
    PrimaryButtonLogout: {
        marginTop: 80,
        width: '85%',
        alignSelf: 'center',
      },
  });