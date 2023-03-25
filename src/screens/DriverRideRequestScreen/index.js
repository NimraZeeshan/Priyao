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
import { Metrix, NavigationService, Images, Colors } from '../../config';
// import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import SwipeButton from 'rn-swipe-button';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Header, ListItem, Avatar } from 'react-native-elements';
import { Center } from 'native-base';
import { Card } from 'react-native-shadow-cards';
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
  // {
  //   id: 'comp1',
  //   description: 'This is component 1',
  //   image: require('../../assets/icons/SendBtn.png'),
  // },
  // {
  //   id: 'comp1',
  //   description: 'This is component 1',
  //   image: require('../../assets/icons/SendBtn.png'),
  // },
  // {
  //   id: 'comp1',
  //   description: 'This is component 1',
  //   image: require('../../assets/icons/SendBtn.png'),
  // },
];

export const DriverRideRequestScreen = () => {
  // onSlideRight = () => {
  //   //perform Action on slide success.
  // };

  const Comp1 = () => {
    return (
      <View>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginHorizontal: 20, marginVertical: 10 }}>
          {/* <Card
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 150,
                // width: '95%',
                alignSelf: 'center',
                // marginLeft: 10,
                marginTop: 10,
              }}> */}
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column', width: 70, marginVertical: -5, }}>
              <TouchableOpacity
                onPress={() => {
                  navigationService.navigate('RideRequestTwo'); //RideDeetailsScreen
                }}>
                <Image
                  source={Images.AsimSamall}
                  style={{
                    height: 60.59,
                    width: 60.59,
                    marginLeft: 10,
                    marginTop: 5,
                  }}></Image>
              </TouchableOpacity>
              <View
                style={{
                  // borderColor: 'black',
                  // borderWidth: 1,
                  flexDirection: 'row',
                }}>
              <Image
                source={Images.StraightLocation}
                style={{ height: 100, width: 12, marginVertical: 25 }}></Image>
              <View style={{ flexDirection: 'column', marginVertical: 25 }}>
                <Text style={{ marginHorizontal: 20 }}>Pick Up</Text>
                <Text style={{ marginHorizontal: 10, }}>Dolmin Mall Clifton</Text>
                <Image source={Images.Line} style={{ width: 200, marginHorizontal: 10, marginVertical: 8 }}></Image>
                <Text style={{ marginHorizontal: 20 }}>Drop Off</Text>
                <Text style={{ marginHorizontal: 10, }}>Chase Up Super Mart Karachi</Text>
                <Text style={{ fontSize: 20, marginHorizontal: 10, marginVertical: 20, }}>Distance</Text>
                <Text style={{ color: 'silver', marginVertical: -10, marginHorizontal: 10, }}>Estimated Fare</Text>
              </View>
                <Text style={{ fontSize: 20, color: 'silver', alignSelf: 'center', marginTop: 108 }}>300m</Text>
                <Text style={{ color: Colors.HeaderColour, fontSize: 25, fontWeight: 'bold', alignSelf: 'flex-end', marginHorizontal: -260, marginVertical: -12 }}>PKR 350</Text>
              </View>
            </View>
                <Text style={{ fontWeight: 'bold', marginVertical: 280 }}>Pick Up Time</Text>
            <View style={{ flexDirection: 'column', width: 180 }}>
                <Text style={{ marginLeft: 5, marginTop: 5 }}>Asim Azhar</Text>
                <Text style={{ marginLeft: 5 }}>+92 300 0000000</Text>
                <Text style={{ color: 'silver', marginVertical: 254, marginHorizontal: -85 }}>7:45</Text>

              {/* <Text
                    style={{
                      marginLeft: 5,
                      color: '#0887F0',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Ride Share
                  </Text> */}
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 8,
                // width: wp(20),
                // borderColor: 'black',
                // borderWidth: 1,
                // width: '35%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {/* <Text
                    style={{
                      color: Colors.HeaderColour,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    PKR 350
                  </Text> */}
              {/* <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 10}}>Distance</Text>
                    <Text style={{fontSize: 10}}>300m</Text>
                  </View> */}
              {/* <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>Seats</Text>
                    <Text>1</Text>
                  </View> */}
              {/* <View
                    style={{
                      width: wp(20),
                      height: 33.94,
                      backgroundColor: Colors.HeaderColour,
                      borderRadius: 5,
                      marginTop: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: 'white'}}>Accepted</Text>
                  </View> */}
            </View>
          </View>
          {/* </Card> */}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 10,
          }}>

          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{
              width: 310,
              height: 550,
              borderRadius: 50,
              marginVertical: -280,
              //marginTop: -20,
              marginHorizontal: 1,
            }}
            region={{
              latitude: 24.8825,
              longitude: 67.0694,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>

            <Marker
              coordinate={{ latitude: 24.8825, longitude: 67.0694 }}
              pinColor={'red'} // any color
              title={'Hello'}
              description={'getting you soon'}
              // image={Images.Map}

              image={Images.MArkerMap}
            />

          </MapView>
        </View>
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
        <TouchableOpacity>
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
          renderItem={({ item }) => {
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
