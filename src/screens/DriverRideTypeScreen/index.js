import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Button,
  FlatList,
  Alert
} from 'react-native';
import React, {useState} from 'react';
import {
  AuthHeader,
  AuthContainer,
  PrimaryInput,
  PrimaryButton,
  Loading,
} from '../../components';
import {CustomText} from '../../components';
import {Metrix, NavigationService, Images, Colors} from '../../config';
import navigationService from '../../config/navigationService';
import {showToast} from '../../config/utills';
import {loginSuccess, setUserDetail} from '../../redux/actions/UserActions';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userLogin} from '../../services/login/login';
import {TextInput} from 'react-native-gesture-handler';
import {Center} from 'native-base';
import { useEffect} from 'react';


export const DriverRideTypeScreen = () => {
  
  return (
  <>

  <View
      style={{
        height: 90,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: Colors.HeaderColour,
        alignItems: 'center',
        justifyContent: 'center',
      }}>

      <Text style={{
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 5,
        marginTop: 0,
      }}>Ride Type</Text>
  </View>

  <View
        style={{
          // borderColor: 'black',
          // borderWidth: 1,
          height: 93.25,
          marginTop: 130,
          width: '80%',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigationService.navigate('SoloRidesScreens');
          }}>
          <Image
            source={Images.RideSharing}
            style={{
              width: 200,
              height:135.25,
            }}
            name="your-icon"
            size={20}
          />
        </TouchableOpacity>
        {/* <Text>Ride Sharing</Text> */}
      </View>

      <View
        style={{
          // borderColor: 'black',
          // borderWidth: 1,
          height: 93.25,
          marginTop: 70,
          width: '80%',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigationService.navigate('SoloRidesFromDriverRideTypeScreen');
          }}>
          <Image
            source={Images.SoloRides}
            style={{
              width: 200,
              height: 135.25,
              marginTop: 30,
            }}
            name="your-icon"
            size={20}
          />
        </TouchableOpacity>
        {/* <Text>Solo Rides</Text> */}
      </View>
      
  </>
  )
}