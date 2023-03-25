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
    Animated,
  } from 'react-native';
  import {
    AuthHeader,
    AuthContainer,
    PrimaryInput,
    PrimaryButton,
    Loading,
  } from '../../components';
  
  // import React from 'react';
  import React, {useEffect, useState, useRef} from 'react';
  import navigationService from '../../config/navigationService';
  import {Metrix, NavigationService, Images, Colors} from '../../config';
  import MenuDrawer from 'react-native-side-drawer';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
  import {Card} from 'react-native-shadow-cards';
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


  export const RatingsReviewsFromDriverSoloRidesScreen = () => {
  
    const counter = useRef(new Animated.Value(0)).current;
    const countInterval = useRef(null);
    const [count, setCount] = useState(0);
    const [openDrawer, setDrawerOpen] = useState(false);

   const toggleDrawer = () => {
    setDrawerOpen(!openDrawer);
   };
  
    useEffect(() => {
      countInterval.current = setInterval(() => setCount(old => old + 5), 1000);
      return () => {
        clearInterval(countInterval);
      };
    }, []);
  
    useEffect(() => {
      load(count);
      if (count >= 100) {
        setCount(100);
        clearInterval(countInterval);
      }
    }, [count]);
  
    const load = count => {
      Animated.timing(counter, {
        toValue: count,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };
  
    const widthlength = counter.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    });
  
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
      Ratings & Reviews
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
          <View
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              marginTop: 10,
              width: '95%',
              alignSelf: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20}}>Rating</Text>
            <Text style={{color: Colors.HeaderColour, fontSize: 34}}>Normal</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //   borderColor: 'black',
              //   borderWidth: 1,
            }}>
            <View style={styles.container}>
              <View style={styles.progressBar}>
                <Animated.View
                  style={
                    ([StyleSheet.absoluteFill],
                    {backgroundColor: '#8BED4F', width: '50%'})
                  }></Animated.View>
              </View>
              <Text>Reviews: Medium</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.progressBar}>
                <Animated.View
                  style={
                    ([StyleSheet.absoluteFill],
                    {backgroundColor: '#F72C00', width: '35%'})
                  }></Animated.View>
              </View>
              <Text>Experience: novice</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //   borderColor: 'black',
              //   borderWidth: 1,
            }}>
            <View style={styles.container}>
              <View style={styles.progressBar}>
                <Animated.View
                  style={
                    ([StyleSheet.absoluteFill],
                    {backgroundColor: '#8BED4F', width: '100%'})
                  }></Animated.View>
              </View>
              <Text>Reputation: Excellent</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.progressBar}>
                <Animated.View
                  style={
                    ([StyleSheet.absoluteFill],
                    {backgroundColor: '#F72C00', width: '50%'})
                  }></Animated.View>
              </View>
              <Text>Frequency of operation: Low</Text>
            </View>
          </View>
          <Card style={{alignSelf: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 10,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#707070', fontSize: 29}}>0</Text>
                <Text style={{color: '#97ADB6'}}>rides</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 10,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#707070', fontSize: 29}}>0</Text>
                <Text style={{color: '#97ADB6'}}>rides</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 10,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#707070', fontSize: 29}}>0</Text>
                <Text style={{color: '#97ADB6'}}>rides</Text>
              </View>
            </View>
          </Card>
          <View
            style={{
              flex: 1,
              // borderColor: 'black',
              // borderWidth: 1,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 140,
            }}>
            <Text style={{fontSize: 20, textAlign: 'center'}} numberOfLines={4}>
              At the moment you didn't receive any reviews
            </Text>
          </View>
        </ScrollView>

      </>
    );
  };
  
  const styles = StyleSheet.create({
    //   container: {
    //     width: '100%',
    //     padding: 16,
    //     // paddingTop: 100,
    //   },
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
    container: {
      flex: 1,
      flexDirection: 'column',
      padding: 8,
    },
    progressBar: {
      marginTop: 10,
      height: 14,
      flexDirection: 'row',
      // width: '50%',
      backgroundColor: 'white',
      borderColor: '#000',
      borderWidth: 0.8,
      // borderRadius: 10,
      borderTopRightRadius: 2,
      borderBottomRightRadius: 2,
      borderTopLeftRadius: 2,
      borderBottomLeftRadius: 2,
    },
  });
  