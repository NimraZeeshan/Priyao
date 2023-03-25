import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  useWindowDimensions,
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
import {Header, ListItem, Avatar} from 'react-native-elements';
import {Button, Center} from 'native-base';
import {TextInput} from 'react-native-gesture-handler';
import { Drawer } from '../../components/Drawer';
import {useState, useRef} from 'react';
import {Card} from 'react-native-shadow-cards';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';




export const FixedRouteScreenTwo = () => {
  const [openDrawer, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!openDrawer);
  };
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const Press1 = () => setActive1(!active1);
  const Press2 = () => setActive2(!active2);
  const Press3 = () => setActive3(!active3);

  return (
    <>
      <SafeAreaView>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'papayawhip',
            alignItems: 'center',
            justifyContent: 'center',
          }}></View>
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
        }}>
        <Text style={{fontSize: 25, fontWeight: 'bold', letterSpacing: 2}}>New Routes</Text>
      </View>


    <View style={{position: 'absolute', left: 0, zIndex: 1}}>
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

        <Card style={{alignSelf: 'center', marginTop: 20}}>
          <View
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 120,
              width: '95%',
              alignSelf: 'center',
              marginTop: 20,
              backgroundColor: 'white',
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={Images.lineDropLocation}
              style={{marginLeft: 10}}></Image>
            <View style={{width: '85%', flexDirection: 'column'}}>
              <Text style={{marginTop: 10, marginLeft: 20}}>Pick Up</Text>
              <TextInput
                style={styles.input}
                placeholder="Dolmin Mall Clifton"
              />
              <Text style={{marginTop: 10, marginLeft: 20}}>Drop Off</Text>
              <TextInput
                style={styles.input2}
                placeholder="Chase Up Super Mart Karachi"
              />
            </View>
          </View>
        </Card>
        <View
          style={{
            borderColor: 'black',
            borderWidth: 0.2,
            margin: 20,
            backgroundColor: '#707070',
          }}></View>
        <View
          style={{
            flexDirection: 'row',
            // borderColor: 'black',
            // borderWidth: 1,
            height: 80,
            // margin: 20,
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={Press1}>
            <Image
              source={Images.PriayoStandardremovebg}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 64,
                width: 104,

                backgroundColor: active1 ? '#707070' : '#F4F4F4',
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={Press2}>
            <Image
              source={Images.PriayoStandardremovebg}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 64,
                width: 104,

                backgroundColor: active2 ? '#707070' : '#F4F4F4',
                borderRadius: 10,
                marginLeft: 20,
              }}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={Press3}>
            <Image
              source={Images.PriayoStandardremovebg}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 64,
                width: 104,

                backgroundColor: active3 ? '#707070' : '#F4F4F4',
                borderRadius: 10,
                marginLeft: 20,
              }}
            />
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            // borderColor: 'black',
            // borderWidth: 1,
            justifyContent: 'space-between',
            marginRight: 65,
            marginLeft: 65,
          }}>
          <Text>Pirayo AC</Text>
          {/* <Text>Pirayo Standard</Text> */}
          <Text>Pirayo NoN AC</Text>
        </View>

        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            margin: 20,
            flexDirection: 'row',
          }}>
          <Image source={Images.Dot} style={{height: 40, width: 40}}></Image>
          <View
            style={{
              flexDirection: 'column',
              //   borderColor: 'black',
              //   borderWidth: 1,

              justifyContent: 'center',
            }}>
            <Text style={{color: '#707070', fontSize: 14}}>Schedule Time</Text>
            <Text style={{color: '#97ADB6', fontSize: 12}}>
              Schedule ride Time
            </Text>
          </View>
          <Card
            style={{
              width: 97.5,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 90,
            }}>
            <Text>04 : 30 Am</Text>
          </Card>
        </View>

        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            margin: 20,
            marginVertical: -15,
            flexDirection: 'row',
          }}>
          <Image source={Images.Dot} style={{height: 40, width: 40}}></Image>
          <View
            style={{
              flexDirection: 'column',
              //   borderColor: 'black',
              //   borderWidth: 1,

              justifyContent: 'center',
            }}>
            <Text style={{color: '#707070', fontSize: 14}}>DropOff Time</Text>
            <Text style={{color: '#97ADB6', fontSize: 12}}>
              Schedule return Time
            </Text>
          </View>
          <Card
            style={{
              width: 97.5,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 80,
            }}>
            <Text>07 : 00 pm</Text>
          </Card>
        </View>

        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            // margin: 20,
            marginLeft: 20,
            marginVertical: 20,
            flexDirection: 'row',
          }}>
          <Image source={Images.Dot} style={{height: 40, width: 40}}></Image>
          <View
            style={{
              flexDirection: 'column',
              //   borderColor: 'black',
              //   borderWidth: 1,
              width: '95%',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#707070', fontSize: 14}}>Fixed Days</Text>
            <Text style={{color: '#97ADB6', fontSize: 12}}>
              Set number of days
            </Text>
            <View
              style={{
                borderColor: '#D5DDE0',
                borderWidth: 0.5,
                width: '85%',
                marginTop: 5,
              }}></View>
          </View>
        </View>
        <View
          style={{
            //   borderColor: 'Black',
            //   borderWidth: 1,
            height: 50,
            width: '95%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 25,
            marginRight: 25,
            marginVertical: -10,
          }}>
          <TouchableOpacity>
            <Image source={Images.Mon} style={{width: 40, height: 40}}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.Tues} style={{width: 40, height: 40}}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.Wed} style={{width: 40, height: 40}}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.Thus} style={{width: 40, height: 40}}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.Fri} style={{width: 40, height: 40}}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.Sat} style={{width: 40, height: 40}}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.Sun} style={{width: 40, height: 40}}></Image>
          </TouchableOpacity>
        </View>

        <View style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginRight: hp('1%'),
              marginTop: hp('9%')
              }}>
          <TouchableOpacity 
            onPress={() => {
              navigationService.navigate('RideHistoryScreenTwo');
            }}
            style={{
              width: 140,
              height: 40,
              borderRadius: 10,
              justifyContent: 'center',
              backgroundColor: '#707070',
            }}>
            <Text 
              style={{ 
                alignSelf: 'center',
                color: 'white',
                fontSize: 20,
              }}>
              continue
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            flexDirection: 'row',
            paddingVertical: 150,
          }}>
          <Image
            source={Images.ArrowBig}
            style={{
                // borderColor: 'black',
                // borderWidth: 1,
              height: 49,
              width: 49,
              alignSelf: 'flex-start',
              padding: 10,
              marginLeft: 20,
            }}
          />
          <PrimaryButton
            title={'New Routes'}
            color={'#707070'}
            customStyles={styles.PrimaryButton3}
            onPress={() => {
              navigationService.navigate('RideHistoryScreenTwo');
            }}
          />
        </View>
        {/* <PrimaryButton
              title="Open Bottom Sheet"
              onPress={() => sheetRef.current.snapTo(1)}
            /> */}

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
    width: '60%',
    alignSelf: 'center',
    backgroundColor: '#707070',
  },

  input: {
    // height: 50,
    // borderWidth: 1,
    borderBottomWidth: 0.2,
    // height: 50,
    paddingHorizontal: 20,
    // marginTop: 10,
    borderRadius: 10,
    width: '100%',
    height: 40,
  },
  input2: {
    // height: 50,
    // borderWidth: 1,

    // height: 50,
    paddingHorizontal: 20,
    // marginTop: 10,
    borderRadius: 10,
    width: '100%',
    height: 40,
  },
  shadow: {
    borderColor: 'black', // if you need
    borderWidth: 0.2,
    overflow: 'hidden',
    shadowColor: '#707070',
    shadowRadius: 5,
    shadowOpacity: 0.5,
    height: 55,
    alignSelf: 'center',
    marginTop: 10,
    width: '95%',
    borderRadius: 10,
    flexDirection: 'row',
  },
  PrimaryButton3: {
    width: '60%',
    marginLeft: 70,
  },
  PrimaryButtonLogout: {
    marginTop: 80,
    width: '85%',
    alignSelf: 'center',
  },
});
