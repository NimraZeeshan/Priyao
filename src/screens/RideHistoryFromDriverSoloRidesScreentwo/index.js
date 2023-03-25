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
  import {TextInput} from 'react-native-gesture-handler';
  import {useState, useRef} from 'react';
  import {Card} from 'react-native-shadow-cards';
  import StarRating from 'react-native-star-rating-widget';
  import {widthPercentageToDP} from 'react-native-responsive-screen';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { color } from 'react-native-reanimated';
  
 export const RideHistoryFromDriverSoloRidesScreentwo = () => {
  
    return (
      <>
        <View
          style={{
            height: 79,
  
            backgroundColor: Colors.HeaderColour,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold', letterSpacing: 2,}}>Your Rides</Text>
          <Image
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
          />
        </View>
      <TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text  style={{fontSize: 20, marginVertical: 10, fontWeight: 'bold',}}>
          Solo Ride     |     Ride Sharing</Text>
        </View>
  
        <View style={{flexDirection: 'column'}}>
        <Text style={{alignSelf: 'flex-start',
                      fontWeight: 'bold',
                      marginHorizontal: 70,
                      marginVertical: -20,
                      color: Colors.HeaderColour,
                      }}>________________</Text>
        </View>
        </TouchableOpacity>

        <ScrollView>
        <Card style={{width: '96%', height: 140, alignSelf: 'center', marginTop: 10}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={Images.AsimSamall}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 50.59,
                width: 50.59,
                alignSelf: 'flex-start',
                margin: 5,
              }}></Image>
            <View style={{flexDirection: 'column'}}>
              {/* <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                Suzuki Mehran
              </Text> */}
              <Text style={{fontSize: 13, color: '#97ADB6'}}>Asim Azhar</Text>
              <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                +9234005678934
              </Text>
              <Text style={{fontSize: 16, color: 'blue'}}>
                Solo Ride
              </Text>
            </View>
            <View style={{marginLeft: 60, flexDirection: 'column',}}>
              <Text style={{color: Colors.HeaderColour, fontSize: 25, fontWeight: 'bold'}}>PKR 150</Text>
              <Text style={{fontSize: 12,}}>Distance       100m</Text>
              </View>
              </View>
              </View>
              <View
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 50,
              width: '80%',
              alignSelf: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <Image
              source={Images.metlocation}
              style={{width: 15, height: 20}}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: '#97ADB6', fontSize: 10, marginLeft: 5}}>
                Pick Up
              </Text>
              <Text style={{marginLeft: 5, fontSize: 12}}>Dolmin Mall Clifton</Text>
              <Image
                source={Images.Line}
                style={{width: 200, height: 1, marginTop: 10}}></Image>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={Images.DropOffLocation}
                style={{width: 15, height: 20}}></Image>
              <View style={{flexDirection: 'column', width: '50%'}}>
                <Text style={{color: '#97ADB6', fontSize: 10, marginLeft: 5}}>
                  Drop Off
                </Text>
                <Text style={{marginLeft: 5, fontSize: 8}}>
                  Chase Up Super Mart Karachi
                </Text>
              </View>
            </View>
          </View>
        </Card>

        <Card style={{width: '96%', height: 140, alignSelf: 'center', marginTop: 10}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={Images.AsimSamall}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 50.59,
                width: 50.59,
                alignSelf: 'flex-start',
                margin: 5,
              }}></Image>
            <View style={{flexDirection: 'column'}}>
              {/* <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                Suzuki Mehran
              </Text> */}
              <Text style={{fontSize: 13, color: '#97ADB6'}}>Asim Azhar</Text>
              <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                +9234005678934
              </Text>
              <Text style={{fontSize: 16, color: 'blue'}}>
                Solo Ride
              </Text>
            </View>
            <View style={{marginLeft: 60, flexDirection: 'column',}}>
              <Text style={{color: Colors.HeaderColour, fontSize: 25, fontWeight: 'bold'}}>PKR 150</Text>
              <Text style={{fontSize: 12,}}>Distance       100m</Text>
              </View>
              </View>
              </View>
              <View
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 50,
              width: '80%',
              alignSelf: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <Image
              source={Images.metlocation}
              style={{width: 15, height: 20}}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: '#97ADB6', fontSize: 10, marginLeft: 5}}>
                Pick Up
              </Text>
              <Text style={{marginLeft: 5, fontSize: 12}}>Dolmin Mall Clifton</Text>
              <Image
                source={Images.Line}
                style={{width: 200, height: 1, marginTop: 10}}></Image>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={Images.DropOffLocation}
                style={{width: 15, height: 20}}></Image>
              <View style={{flexDirection: 'column', width: '50%'}}>
                <Text style={{color: '#97ADB6', fontSize: 10, marginLeft: 5}}>
                  Drop Off
                </Text>
                <Text style={{marginLeft: 5, fontSize: 8}}>
                  Chase Up Super Mart Karachi
                </Text>
              </View>
            </View>
          </View>
        </Card>

        <Card style={{width: '96%', height: 140, alignSelf: 'center', marginTop: 10}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={Images.AsimSamall}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 50.59,
                width: 50.59,
                alignSelf: 'flex-start',
                margin: 5,
              }}></Image>
            <View style={{flexDirection: 'column'}}>
              {/* <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                Suzuki Mehran
              </Text> */}
              <Text style={{fontSize: 13, color: '#97ADB6'}}>Asim Azhar</Text>
              <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                +9234005678934
              </Text>
              <Text style={{fontSize: 16, color: 'blue'}}>
                Solo Ride
              </Text>
            </View>
            <View style={{marginLeft: 60, flexDirection: 'column',}}>
              <Text style={{color: Colors.HeaderColour, fontSize: 25, fontWeight: 'bold'}}>PKR 150</Text>
              <Text style={{fontSize: 12,}}>Distance       100m</Text>
              </View>
              </View>
              </View>
              <View
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 50,
              width: '80%',
              alignSelf: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <Image
              source={Images.metlocation}
              style={{width: 15, height: 20}}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: '#97ADB6', fontSize: 10, marginLeft: 5}}>
                Pick Up
              </Text>
              <Text style={{marginLeft: 5, fontSize: 12}}>Dolmin Mall Clifton</Text>
              <Image
                source={Images.Line}
                style={{width: 200, height: 1, marginTop: 10}}></Image>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={Images.DropOffLocation}
                style={{width: 15, height: 20}}></Image>
              <View style={{flexDirection: 'column', width: '50%'}}>
                <Text style={{color: '#97ADB6', fontSize: 10, marginLeft: 5}}>
                  Drop Off
                </Text>
                <Text style={{marginLeft: 5, fontSize: 8}}>
                  Chase Up Super Mart Karachi
                </Text>
              </View>
            </View>
          </View>
        </Card>

        <Card style={{width: '96%', height: 140, alignSelf: 'center', marginTop: 10}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={Images.AsimSamall}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 50.59,
                width: 50.59,
                alignSelf: 'flex-start',
                margin: 5,
              }}></Image>
            <View style={{flexDirection: 'column'}}>
              {/* <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                Suzuki Mehran
              </Text> */}
              <Text style={{fontSize: 13, color: '#97ADB6'}}>Asim Azhar</Text>
              <Text style={{fontSize: 13, marginTop: 5, color: '#707070'}}>
                +9234005678934
              </Text>
              <Text style={{fontSize: 16, color: 'blue'}}>
                Solo Ride
              </Text>
            </View>
            <View style={{marginLeft: 60, flexDirection: 'column',}}>
              <Text style={{color: Colors.HeaderColour, fontSize: 25, fontWeight: 'bold'}}>PKR 150</Text>
              <Text style={{fontSize: 12,}}>Distance       100m</Text>
              </View>
              </View>
              </View>
              <View
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 50,
              width: '80%',
              alignSelf: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <Image
              source={Images.metlocation}
              style={{width: 15, height: 20}}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: '#97ADB6', fontSize: 10, marginLeft: 5}}>
                Pick Up
              </Text>
              <Text style={{marginLeft: 5, fontSize: 12}}>Dolmin Mall Clifton</Text>
              <Image
                source={Images.Line}
                style={{width: 200, height: 1, marginTop: 10}}></Image>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={Images.DropOffLocation}
                style={{width: 15, height: 20}}></Image>
              <View style={{flexDirection: 'column', width: '50%'}}>
                <Text style={{color: '#97ADB6', fontSize: 10, marginLeft: 5}}>
                  Drop Off
                </Text>
                <Text style={{marginLeft: 5, fontSize: 8}}>
                  Chase Up Super Mart Karachi
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </ScrollView>
      </>
    );
  };
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       // marginTop: StatusBar.currentHeight || 0,
//     },
//     item: {
//       padding: 5,
//       marginVertical: 8,
//       marginHorizontal: 16,
//       borderRadius: 10,
//     },
//     title: {
//       fontSize: 14,
//     },
//   });
  