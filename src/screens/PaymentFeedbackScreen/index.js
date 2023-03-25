import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import {
  AuthHeader,
  AuthContainer,
  PrimaryInput,
  PrimaryButton,
  Loading,
} from '../../components';

import React, {useEffect} from 'react';
import navigationService from '../../config/navigationService';
import {Metrix, NavigationService, Images, Colors} from '../../config';
// import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import SwipeButton from 'rn-swipe-button';
import {Header, ListItem, Avatar} from 'react-native-elements';
import StarRating from 'react-native-star-rating-widget';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Drawer } from '../../components/Drawer';
import {useState, useRef} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



export const PaymentFeedbackScreen = () => {
  const [openDrawer, setDrawerOpen] = useState(false);
  const [pickAddress, setPickAddress] = useState('');
  const [dropAddress, setDropAddress] = useState('');
  const [fullname, setFullName] = useState('');
  const [vehicle_name, setvehicle_Name] = useState('');
  const [vehicle_number, setVehicle_Number] = useState('');
  const [Amount, setAmount] = useState('');
  const [rating, setRating] = useState(0);
  const [profileimage, setProfileImage] = useState('');


  //////For Open Drawer
  const toggleDrawer = () => {
    setDrawerOpen(!openDrawer);
  };
/////

const PaymentFeedback = () => {

    fetch('http://asaanweb.com/pirayo/index.php/Vehicle_Controller/payment_deliverd/1/2', {
    
      method: 'GET',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      },
      })
      .then((response) => response.json())
      .then((res) => {if (res) {
        setFullName(res.data[0].fullname)
        setvehicle_Name(res.data[0].vehicle_name)
        setVehicle_Number(res.data[0].vehicle_number)
        setAmount(res.data[0].Amount)
        console.log(res.data[0].profileimage)
      }
      })
      .catch(error => console.log(error));

    setTimeout(() => {
        navigationService.navigate('HomeScreen');
    }, 5000);

}


   //for set pick drop location name on card
   const cardAddress = async () => {
    try {
      let pick = await AsyncStorage.getItem('pickAddress');
      let drop = await AsyncStorage.getItem('dropAddress');
        setPickAddress(pick)
        setDropAddress(drop)
    } catch (error) {
      console.log(error);
    }
  };
  cardAddress();
  //


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
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>

          <TouchableOpacity onPress={() => {
              navigationService.navigate('RideProcessScreen');
            }}>
            <Image
              source={Images.BackArrow}
              style={{width: 49, height: 49}}>
            </Image>
          </TouchableOpacity>
          <Text style={{fontSize: 25, fontWeight: 'bold', letterSpacing: 1, marginRight: wp('15%')}}>Payment & Feedback</Text>
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
   
     
        <ScrollView>
          <View
            style={{
              // borderColor: 'black',
              // borderWidth: 1,
              marginTop: 30,
              flexDirection: 'row',
              // justifyContent: 'space-evenly',
            }}>
            <Image
              defaultValue={profileimage} //AsimSamall
              style={{width: 35, height: 35, marginLeft: 10, marginVertical: 5}}></Image>
            <View
              style={{
                // borderColor: 'black',
                // borderWidth: 1,
                flexDirection: 'column',
                marginLeft: 20,
              }}>
              <TextInput
                defaultValue={fullname}
                style={{
                  marginTop: 5,
                }}>
              </TextInput>
              <TextInput
                defaultValue={vehicle_name}
                style={{
                  marginTop: 10,
                  fontWeight: 'bold',
                }}>
              </TextInput>
            </View>
            <View
              style={{
                // borderColor: 'black',
                // borderWidth: 1,
                flexDirection: 'column',
                marginLeft: 80,
                alignItems: 'center',
              }}> 
              <Image
                source={Images.BigCar}//pngwing
                style={{
                  width: 70,
                  height: 66,
                }}></Image>
              <TextInput style={{marginTop: -10}}
                defaultValue={vehicle_number}                
              >
                </TextInput>
            </View>
          </View>
          <Image
            source={Images.Line}
            style={{marginTop: 20, alignSelf: 'center'}}></Image>
          <Image
            source={Images.TwoLine}
            style={{
              marginTop: 20,
              alignSelf: 'center',
              height: 32.28,
              width: '85%',
            }}></Image>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginLeft: 10,
              marginRight: 10,
            }}>
            <Text style={{fontWeight: 'bold',}}>Pick Up:</Text>
            <TextInput style={{color: '#97ADB6'}}>{pickAddress}</TextInput>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginLeft: 10,
              marginRight: 10,
            }}>
            <Text  style={{fontWeight: 'bold',}}>Drop Off:</Text>
            <TextInput style={{color: '#97ADB6'}}>{dropAddress}</TextInput>
          </View>
          <Image
            source={Images.Line}
            style={{marginTop: 20, alignSelf: 'center'}}></Image>
          <View
            style={{
              // borderColor: 'black',
              // borderWidth: 1,
              marginTop: 20,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 30, fontWeight: 'bold', letterSpacing: 1}}>Total Fare</Text>
            <TextInput
            defaultValue={Amount}
            style={{fontSize: 60, color: Colors.HeaderColour, fontWeight: 'bold', letterSpacing: 1}}>
            </TextInput>
          </View>
          <Image
            source={Images.Line}
            style={{marginTop: 20, alignSelf: 'center'}}></Image>
          <View
            style={{
              // borderColor: 'black',
              // borderWidth: 1,
              marginTop: 20,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 30, fontWeight: 'bold', letterSpacing: 1}}>How was your ride?</Text>
          </View>
          <View
            style={{
              // borderColor: 'black',
              // borderWidth: 1,
              width: '85%',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <StarRating
              rating={rating}
              onChange={setRating}
              style={{alignSelf: 'center'}}
            />
          </View>
          <View style={{marginTop: 20}}>
            <TextInput
              placeholder="Say something about your experience "
              style={{
                borderWidth: 0.2,
                height: 50,
                paddingHorizontal: 20,
                marginTop: 10,
                borderRadius: 5,
                width: '85%',
                alignSelf: 'center',
              }}></TextInput>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '95%',
              // borderColor: 'black',
              // borderWidth: 1,
              marginTop: 20,
              alignSelf: 'center',
            }}>
            <PrimaryButton
              textColor={"white"}
              title={'Report'}
              color={'#707070'}
              customStyles={styles.PrimaryButton}
              onPress={() => {
                navigationService.navigate('ReportScreen');
              }}
            />
            <PrimaryButton
              textColor={"white"}
              title={'Sumbit'}
              color={'#707070'}
              customStyles={styles.PrimaryButton2}
              onPress={() => {
                PaymentFeedback()
                // navigationService.navigate('HomeScreen');
              }}
            />
          </View>
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
    marginTop: 30,
    width: '40%',
    alignSelf: 'center',
    backgroundColor: '#FF0000',
  },
  PrimaryButton2: {
    marginTop: 30,
    width: '40%',
    alignSelf: 'center',
  },
  PrimaryButtonLogout: {
    marginTop: 80,
    width: '85%',
    alignSelf: 'center',
  },
});