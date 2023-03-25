import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
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
import navigationService from '../../config/navigationService';
import {Metrix, NavigationService, Images, Colors} from '../../config';
import {Card} from 'react-native-shadow-cards';
import MenuDrawer from 'react-native-side-drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { RadioButton } from 'react-native-paper';



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


export const DriverAddCreditScreen = () => {
  const [openDrawer, setDrawerOpen] = useState(false);
  const [checked, setChecked] = useState('first');

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
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      backgroundColor: Colors.HeaderColour,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{fontSize: 29, fontWeight: 'bold', letterSpacing: 2}}>
      Your Credit
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




  <View style={{ alignItems: 'center', marginTop: hp('3%') }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
    <RadioButton
      value="first"
      status={checked === 'first' ? 'checked' : 'unchecked'}
      onPress={() => setChecked('first')}
      color={Colors.HeaderColour}
    />
    <Image source={Images.Easypaisa} style={{
      height: 19,
      width: 90,
    }} />
    <RadioButton
      value="second"
      status={checked === 'second' ? 'checked' : 'unchecked'}
      onPress={() => setChecked('second')}
      color={Colors.HeaderColour}
    />
    <Image source={Images.Jazzcash} style={{
      height: 25,
      width: 70,
    }} />
    </View>
  </View>


   
<View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: hp('2%')}}>
   <View style={{ flexDirection: 'column' }}>
    <View style={{ borderBottomWidth: 0, marginBottom: hp('1%') }}>
      <TextInput
        style={{ height: 50, width: wp('100%'), fontSize: 16, marginLeft: 5 }}
        placeholder="Mobile Number"
        underlineColorAndroid="transparent"
        keyboardType='numeric'
      />
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'silver' }} />
    </View>
    <View style={{ borderBottomWidth: 0 }}>
      <TextInput
        style={{ height: 50, width: 150, fontSize: 16, marginLeft: 5 }}
        placeholder="Amount"
        underlineColorAndroid="transparent"
        keyboardType='numeric'
      />
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'silver' }} />
    </View>
  </View>
</View>



<View style={{margin: 5}}>
  <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>Withdrawal</Text>
  <Text style={{ textAlign: 'center', lineHeight: 20 }}>
    Amount will be remitted to you after 1-2 {'\n'} (working days)
    of receiving your request
  </Text>
</View>


<Card style={{height: 220, alignSelf: 'center', marginTop: hp('1%')}}>

<View style={{height: 50, marginTop: 10}}>
  <View style={{flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10}}>
    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Withdrawal Fee</Text>
    <View style={{backgroundColor: Colors.HeaderColour, flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10}}>
      <Text style={{fontSize: 16, marginRight: 10}}>Amount Rs</Text>
      <Text style={{fontSize: 16}}>Fee Rs</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 5}}>
      <Text style={{fontSize: 16, marginRight: 10}}>200-1500</Text>
      <Text style={{fontSize: 16}}>25</Text>
    </View>
    <View style={{backgroundColor: 'silver', flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 5}}>
      <Text style={{fontSize: 16, marginRight: 10}}>1500-4000</Text>
      <Text style={{fontSize: 16}}>50</Text>
    </View>
    <View style={{backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 5}}>
      <Text style={{fontSize: 16, marginRight: 10}}>4001-10000</Text>
      <Text style={{fontSize: 16}}>100</Text>
    </View>
    <View style={{backgroundColor: 'silver', flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 5}}>
      <Text style={{fontSize: 16, marginRight: 10}}>10001-25000</Text>
      <Text style={{fontSize: 16}}>200</Text>
    </View>
  </View>
</View>

</Card>


  <PrimaryButton
    title={'Add to Wallet'}
    color={Colors.HeaderColour}
    customStyles={styles.PrimaryButton}
      // onPress={handleAddToWallet}
  />
   
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
  PrimaryButton: {
    alignSelf: 'center',
    marginTop: hp('3%'),
    width: '50%',
  },
  PrimaryButtonLogout: {
    marginTop: 80,
    width: '85%',
    alignSelf: 'center',
  },
});