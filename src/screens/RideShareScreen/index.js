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
import StarRating from 'react-native-star-rating-widget';
import {useState, useRef} from 'react';

import {Center} from 'native-base';
import {TextInput} from 'react-native-gesture-handler';
import {Card} from 'react-native-shadow-cards';

export const RideShareScreen = () => {
  const [rating, setRating] = useState(0);
  onSlideRight = () => {
    //perform Action on slide success.
  };

  return (
    <>
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
          <View
            style={{
              width: 350,
              height: 100,
              marginHorizontal: -5,
              marginVertical: -10,
              borderBottomLeftRadius: 50,
               borderBottomRightRadius: 50,
              backgroundColor: Colors.HeaderColour,
              alignItems: 'center',
              justifyContent: 'center',
              //flexDirection: 'row',
            }}>

           {/* <Image source={Images.Menu} style={{width: 49, height: 49}}></Image> */}

            <Text style={{
              fontSize: 25, 
              fontWeight: 'bold', 
              letterSpacing: 2,
              alignSelf: 'center',
              paddingLeft: 18,
              paddingBottom: 18,
            }}>Ride Share</Text>
          </View>

          <View style={styles.container}>
            <Card style={{padding: 10, margin: 10, alignSelf: 'center',}}>
              <Text style={{marginLeft: 20}}>Pick Up</Text>
              <TextInput
                style={{
                  borderBottomWidth: 0.2,
                  height: 40,
                  paddingHorizontal: 20,
                  //   marginTop: 10,
                  borderRadius: 10,
                  width: '100%',
                  height: 40,
                }}
                placeholder="Dolmin Mall Clifton"
              />
              <Text style={{marginTop: 5, marginLeft: 20}}>Drop Off</Text>
              <TextInput
                style={{
                  //   borderBottomWidth: 0.2,
                  height: 40,
                  paddingHorizontal: 20,
                  //   marginTop: 10,
                  borderRadius: 10,
                  width: '100%',
                  height: 40,
                }}
                placeholder="Chase Up Super Mart Karachi"
              />
            </Card>
            </View>
            <Text
              style={{
                marginTop: 10,
                marginLeft: 20,
                fontSize: 20,
                color: '#707070',
                flexDirection: 'row',
              }}>
              Shared Ride
              <Text>(Optional)</Text>
            </Text>
            <Card style={{height: 50, margin: 10,  alignSelf: 'center',}}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={Images.Dot}
                    style={{width: 50, height: 50, marginHorizontal: -10,}}></Image>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{marginTop: 10, color: '#707070'}}>
                      Select Passengers Gender
                    </Text>
                    <Text style={{marginTop: 2, color: '#97ADB6'}}>
                      Leave blank if not needed
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Card
                      style={{
                        width: 51,
                        height: 28,
                        alignSelf: 'center',
                        marginLeft: 10,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                      }}>
                      <Text>Male</Text>
                    </Card>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Card
                      style={{
                        width: 51,
                        height: 28,
                        alignSelf: 'center',
                        marginLeft: 10,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                      }}>
                      <Text>Female</Text>
                    </Card>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>

            <Card style={{height: 50, margin: 10,  alignSelf: 'center',}}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={Images.Dot}
                    style={{width: 50, height: 50,  marginHorizontal: -10,}}></Image>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{marginTop: 10, color: '#707070'}}>
                      Need Seat
                    </Text>
                    <Text style={{marginTop: 2, color: '#97ADB6'}}>
                      Select the number of seats
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigationService.navigate('ChooseRideScreen');
                    }}>
                    <Card
                      style={{
                        width: 25.15,
                        height: 25.15,
                        alignSelf: 'center',
                        marginLeft: 10,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                      }}>
                      <Text>1</Text>
                    </Card>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Card
                      style={{
                        width: 25.15,
                        height: 25.15,
                        alignSelf: 'center',
                        marginLeft: 10,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                      }}>
                      <Text>2</Text>
                    </Card>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Card
                      style={{
                        width: 25.15,
                        height: 25.15,
                        alignSelf: 'center',
                        marginLeft: 10,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                      }}>
                      <Text>3</Text>
                    </Card>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>

          <View
            style={{
              // borderColor: 'black',
              // borderWidth: 1,
              flexDirection: 'row',
              paddingVertical: 40,
              justifyContent: 'space-between',
              right: 10,
            }}>
            {/* <Image
              source={Images.ArrowBig}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 49,
                width: 49,
                alignSelf: 'flex-start',
                padding: 10,
                paddin: 10,
                marginLeft: 20,
              }}
            /> */}
            <PrimaryButton
              textColor={'white'}
              title={'Countinue'}
              color={'#707070'}
              customStyles={styles.PrimaryButton}
              onPress={() => {
                navigationService.navigate('ChooseRideScreen');
              }}
            />
          </View>

        </View>
      </SafeAreaView>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textinfo: {
    margin: 10,
    textAlign: 'center',
    fontSize: 10,
  },
  PrimaryButton: {
    // marginTop: 30,
    width: '50%',
    alignSelf: 'flex-end',
    marginHorizontal: 150,
    // backgroundColor: '#FF0000',
  },
  PrimaryButton2: {
    marginTop: 30,
    width: '40%',
  },
  input: {
    // height: 50,
    // borderWidth: 1,
    borderBottomWidth: 0.2,
    height: 40,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    width: '100%',
    height: 40,
  },
});
