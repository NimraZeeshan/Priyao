import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    useWindowDimensions,
    TouchableOpacity,
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
  import {color} from 'react-native-reanimated';
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


  export const MyIncomeFromDriverSoloRidesScreen = () => {

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
      Wallet
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
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Card
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              alignSelf: 'center',
              width: '90%',
              height: 65,
              marginTop: 50,
            }}>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                alignItems: 'center',
                height: Metrix.VerticalSize(90.75),
                justifyContent: 'center',
              }}>
              <Text style={{
                fontSize: 12,
                alignSelf: 'flex-start',
                marginTop: -20,
                }}>
                  Available credit</Text>
              <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'blue',
                alignSelf: 'flex-start',
                marginVertical: -1,
                }}>
                PKR 0
              </Text>
              <Image style={{
                marginTop: -50,
                alignSelf: 'flex-end',
                width: 30,
                height: 30,
                marginHorizontal: 5,
                marginVertical: 3,
              }}
                  source={Images.Addcredit}
                  name="your-icon"
                  //size={10}
                />
               <TouchableOpacity
              onPress={() => {
                navigationService.navigate('DriverAddCreditScreen');
              }}>
             <Text style={{
               fontSize: 12,
               alignSelf: 'flex-end',
               //marginHorizontal: -9,
            }}>
              Add credit
            </Text>
            </TouchableOpacity>
            </View>
          </Card>
  
          <Card
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              alignSelf: 'center',
              width: '90%',
             // height: 150,
              marginTop: 20,
            }}>
            <View
              style={{
                width: '95%',
                // height: '70%',
                alignSelf: 'center',
                alignItems: 'center',
                height: Metrix.VerticalSize(170.75),
                justifyContent: 'center',
                //marginVertical: -10,
              }}>
              <Text style={{
                fontSize: 12,
                alignSelf: 'flex-start',
                marginTop: -50,
                marginHorizontal: 20,
                
                }}>Transactions</Text>
  
              <Text style={{
                fontSize: 12,
                alignSelf: 'flex-start',
                marginBottom: -20,
                marginHorizontal: 20,
                paddingTop: 20,
                }}>
                Pirayo
              </Text>
              <View style={{
                width: 12, 
                height: 12, 
                backgroundColor: Colors.HeaderColour,
                borderRadius: 24,
                alignSelf: 'flex-start',
                marginBottom: -20,
                marginHorizontal: 6,
                marginVertical: 35,
                }}>
              </View>
            </View>
            <Text style={{
                fontSize: 20, 
                fontWeight: 'bold',
                alignSelf: 'flex-start',
                marginTop: -69,
                marginLeft: 29,
                marginVertical: 30,
              }}>Negative Balance
            </Text>
            <Text style={{
                fontSize: 20, 
                fontWeight: 'bold',
                color: 'red',
                alignSelf: 'flex-end',
                marginTop: -55,
                marginHorizontal: 10,
                marginVertical: 30,
              }}>-PKR 174</Text>
            
             <Text style={{
                fontSize: 12,
                alignSelf: 'flex-start',
                paddingVertical: 30,
                marginHorizontal: 28,
                paddingTop: -30,
                }}>
                Credit Added
              </Text>
            <View style={{
                width: 12, 
                height: 12, 
                backgroundColor: Colors.HeaderColour,
                borderRadius: 24,
                alignSelf: 'flex-start',
                //marginBottom: 10,
                marginTop: -15,
                marginHorizontal: 12,
                }}>
              </View>
            <Text style={{
                fontSize: 20, 
                fontWeight: 'bold',
                alignSelf: 'flex-start',
                marginTop: -20,
                marginLeft: 29,
                marginVertical: 30,
              }}>Wallet Top Up
            </Text>
            <Text style={{
                fontSize: 20, 
                fontWeight: 'bold',
                color: 'blue',
                alignSelf: 'flex-end',
                marginTop: -55,
                marginHorizontal: 10,
                marginVertical: 30,
              }}>+PKR 174</Text>
  
             <Text style={{
                fontSize: 12,
                alignSelf: 'flex-start',
                paddingVertical: 30,
                marginHorizontal: 28,
                paddingTop: -30,
                }}>
                Pirayo
             </Text>
              <View style={{
                width: 12, 
                height: 12, 
                backgroundColor: Colors.HeaderColour,
                borderRadius: 24,
                alignSelf: 'flex-start',
                //marginBottom: 10,
                marginTop: -15,
                marginHorizontal: 12,
                }}>
             </View>
             <Text style={{
                fontSize: 20, 
                fontWeight: 'bold',
                alignSelf: 'flex-start',
                marginTop: -20,
                marginLeft: 29,
                marginVertical: 30,
              }}>Negative Balance
            </Text>
            <Text style={{
                fontSize: 20, 
                fontWeight: 'bold',
                color: 'blue',
                alignSelf: 'flex-end',
                marginTop: -55,
                marginHorizontal: 10,
                marginVertical: 30,
              }}>+PKR 174</Text>
          </Card>
          <Text></Text>
  
          {/* <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 20,
              //   borderColor: 'black',
              //   borderWidth: 1,
              width: '95%',
              alignSelf: 'center',
            }}>
            <PrimaryButton
              title={'Online Check'}
              color={Colors.HeaderColour}
              customStyles={styles.PrimaryButton}
              // onPress={() => {
              //   navigationService.navigate('SignupScreen');
              // }}
            />
            <PrimaryButton
              title={'My Income'}
              color={Colors.HeaderColour}
              customStyles={styles.PrimaryButton}
              onPress={() => {
                navigationService.navigate('RatingsAndReviewsScreen');
              }}
            />
            <PrimaryButton
              title={'Balance Statistics'}
              color={'#707070'}
              customStyles={styles.PrimaryButton}
              onPress={() => {
                navigationService.navigate('FAQScreen');
              }}
            />
          </View> */}
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
  });
  