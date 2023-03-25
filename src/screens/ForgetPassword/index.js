import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import React from 'react';
import {
  MainContainer,
  AuthHeader,
  AuthContainer,
  PrimaryInput,
  PrimaryButton,
} from '../../components';

import {CustomText} from '../../components';
import navigationService from '../../config/navigationService';
import {Metrix, NavigationService, Images, Colors} from '../../config';
import {useState, useEffect} from 'react';
import {showToast} from '../../config/utills';
import {OTP} from 'react-native-otp-form';
import auth from '@react-native-firebase/auth';

// import {Colors} from 'react-native-paper';

export const ForgetPassScreen = () => {
  //const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

    function onAuthStateChanged(user) {
          console.log(user, 'user')
        }
      
        useEffect(() => {
          const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
          return subscriber; // unsubscribe on unmount
        }, []);

        async function confirmCode() {
              try {
                await confirm.confirm(code);
              } catch (error) {
                console.log('Invalid code');
              }
            }

  return (
    <View>
      {/* <AuthHeader arrow={true} /> */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // borderColor: 'black',
          // borderWidth: 10,
          marginTop: 150,
        }}>
        <Text style={{fontSize: 40}}>Enter OTP</Text>
        <Text>Check your phone for OTP sent to 03*********</Text>
      </View>
      <View>
        <OTP
          value={code}
          codeCount={6}
          containerStyle={styles.Otp}
          otpStyles={styles.TexinputOtp}
          onChangeText={text => setCode(Number(text))}
        />
      </View>

      <View style={{marginTop: 20, alignSelf: 'flex-end', paddingRight: 80}}>
        <TouchableOpacity onPress={() => {
        }}>
          <Text style={{color: '#0887F0', fontSize: 15, marginHorizontal: -25}}>Resend OTP</Text>
        </TouchableOpacity>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <PrimaryButton
          title={'Countinue'}
          color={Colors.HeaderColour}
          textColor="#4D4D4D"
          customStyles={styles.PrimaryButton}
          onPress={() => {
            confirmCode()
            navigationService.navigate('HomeScreen');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  PrimaryButton: {
    marginTop: 30,
    width: '80%',
    height: 50,
    borderRadius: 50
  },
  Otp: {
    marginTop: 80,
  },
  TexinputOtp: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#707070',
    borderWidth: 0.5,
  },
});
