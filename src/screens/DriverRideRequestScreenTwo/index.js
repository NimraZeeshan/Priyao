import {
    StyleSheet,
    Text,
    View,
    ScrollView,
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
  
  import React from 'react';
  import navigationService from '../../config/navigationService';
  import {Metrix, NavigationService, Images, Colors} from '../../config';
  // import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
  import SwipeButton from 'rn-swipe-button';
  import {Header, ListItem, Avatar} from 'react-native-elements';
  import {Center} from 'native-base';
  import {Card} from 'react-native-shadow-cards';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';






  const DATA = [
    {
      id: 'comp1',
      description: 'This is component 1',
      image: require('../../assets/icons/SendBtn.png'),
    },
    {
      id: 'comp1',
      description: 'This is component 1',
      image: require('../../assets/icons/SendBtn.png'),
    },
    {
      id: 'comp1',
      description: 'This is component 1',
      image: require('../../assets/icons/SendBtn.png'),
    },
    // {
    //   id: 'comp1',
    //   description: 'This is component 1',
    //   image: require('../../assets/icons/SendBtn.png'),
    // },
  ];
  
  export const DriverRideRequestScreenTwo = () => {
    // onSlideRight = () => {
    //   //perform Action on slide success.
    // };
  
    const Comp1 = () => {
      return (
        <View>
            <ScrollView>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Card
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 150,
                // width: '95%',
                alignSelf: 'center',
                // marginLeft: 10,
                marginTop: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column', width: 60}}>
                  <Image
                    source={Images.AsimSamall}
                    style={{
                      height: 50.59,
                      width: 50.59,
                      marginLeft: 10,
                      marginTop: 5,
                    }}></Image>
                  <View
                    style={{
                      // borderColor: 'black',
                      // borderWidth: 1,
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={Images.StraightLocation}
                      style={{height: 44.91, width: 12, margin: 5}}></Image>
                    <View style={{flexDirection: 'column', margin: 5}}>
                      <Text>Pick Up</Text>
                      <Text>Dolmin Mall Clifton</Text>
                      <Image source={Images.Line} style={{width: 200}}></Image>
                      <Text>Drop Off</Text>
                      <Text>Chase Up Super Mart Karachi</Text>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'column', width: 180}}>
                  <Text style={{marginLeft: 5, marginTop: 5}}>Asim Azhar</Text>
                  <Text style={{marginLeft: 5}}>+92 300 0000000</Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      color: '#0887F0',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Ride Share
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: 8,
                    // width: wp(20),
                    // borderColor: 'black',
                    // borderWidth: 1,
                    // width: '35%',
                    marginHorizontal: -20,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: Colors.HeaderColour,
                      fontSize: 25,
                      fontWeight: 'bold',
                    }}>
                    PKR 350
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 10, marginHorizontal: 5}}>Distance</Text>
                    <Text style={{fontSize: 10}}>300m</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{paddingHorizontal: 15}}>Seats</Text>
                    <Text>1</Text>
                  </View>
                  <View
                    style={{
                      width: wp(25),
                      height: 33.94,
                      backgroundColor: Colors.HeaderColour,
                      borderRadius: 5,
                      marginTop: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                  <TouchableOpacity
                   onPress={() => {
                   navigationService.navigate('RideDeetailsScreen');
                  }}>
                    <Text style={{color: 'white'}}>View Details</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Card>
          </View>
        </ScrollView>
      </View>
      );
    };

    const mapOfComponents = {
      comp1: <Comp1 />,
    };
  
    return (
      <>
        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            height: 79,
            backgroundColor: Colors.HeaderColour,
            flexDirection: 'row',
          }}>
           <TouchableOpacity
                onPress={() => {
                  navigationService.navigate('DriverRideRequestScreen'); //RideDeetailsScreen
                }}>
            <Image
              source={Images.BackArrow}
              style={{
                height: 49,
                width: 49,
                marginTop: 15,
              }}></Image>
          </TouchableOpacity>
          <Text
            style={{
                alignSelf: 'center',
                justifyContent: 'center',
                marginLeft: 50,
                fontSize: 25,
                fontWeight: 'bold',
                letterSpacing: 2,
            }}>
            Ride Request
          </Text>
        </View>
        {/* <ScrollView>
            <View style={styles.container}>
              <View style={styles.mainbox}>
                {list.map((l, i) => (
                  <ListItem key={i} bottomDivider>
                    <Avatar source={{uri: l.avatar_url}} />
                    <ListItem.Content>
                      <ListItem.Title>{l.name}</ListItem.Title>
                      <ListItem.Title>{l.name2}</ListItem.Title>
                      <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                ))}
              </View>
            </View>
          </ScrollView> */}
        <View>
          <FlatList
            data={DATA}
            renderItem={({item}) => {
              return mapOfComponents[item.id];
            }}
            keyExtractor={item => item.id}
          />
        </View>
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
  });
  