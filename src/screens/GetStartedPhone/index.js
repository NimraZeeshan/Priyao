import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  MainContainer,
  AuthHeader,
  AuthContainer,
  PrimaryInput,
  PrimaryButton,
  BackHeader,
  Loading,
} from '../../components';

import React from 'react';
import { Metrix, NavigationService, Images, Colors } from '../../config';
import navigationService from '../../config/navigationService';
import {useState, useEffect} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import auth from '@react-native-firebase/auth';
import { RNSVGSymbol } from 'react-native-svg';

export const GetStartedScreen = () => {

  const [phoneNumber, setphoneNumber] = useState('');
  //const [code, setCode] = useState('');
  //const [confirm, setConfirm] = useState(null);
 // const [code, setCode] = useState('');
  //const phoneInput = useRef(null);

//   const buttonPress = () => {
//     Alert.alert(phoneNumber);
// }

async function signInWithPhoneNumber(phoneNumber) {
       await auth().signInWithPhoneNumber(phoneNumber);
       // setConfirm(confirmation);
    }

    // function onAuthStateChanged(user) {
    //   console.log(user, 'user')
    // }
  
    // useEffect(() => {
    //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //   return subscriber; // unsubscribe on unmount
    // }, []);

    // async function confirmCode() {
    //       try {
    //         await confirm.confirm(code);
    //       } catch (error) {
    //         console.log('Invalid code');
    //       }
    //     }

  return (
    <>
     {/* <View style={styles.container}>
      
      <View
        style={{marginTop: -10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Get Location" onPress={getLocation} />
      </View>
      <Text>Latitude: {location ? location.coords.latitude : null}</Text>
      <Text>Longitude: {location ? location.coords.longitude : null}</Text>
    </View> */}
      <View style={{flex: 1}}>
        <Image
          source={Images.BackGetstart}
          style={{}}
          name="your-icon"
          size={20}
        />
      </View>
      <View
        style={{
          height: 364.38,
          width: 390,
          // borderColor: 'black',
          // borderWidth: 1,
          marginBottom: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 40, paddingTop: 10, paddingRight: 20}}>Compare & Save</Text>
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            textAlignVertical: 'center',
            marginTop: 5,
            paddingLeft: 10,
            paddingRight: 30,
            marginBottom: 10,
          }}
          numberOfLines={2}>
          Get to the best choice for your ride and save the best with Priyao
        </Text>
        <Image
          source={Images.LadyIcon}
          style={{
            height: 364.38,
            width: 380,
            marginRight: 32,

            // borderColor: 'black',
            // borderWidth: 1,
            marginBottom: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          name="your-icon"
          size={20}
        />
      </View>
      <View style={styles.container}>
        <PhoneInput
          //ref={phoneInput}
          defaultValue={phoneNumber}
         // value={code}
          defaultCode="PK"
          layout="first"
          withShadow
          autoFocus
          containerStyle={styles.phoneContainer}
          textContainerStyle={styles.textInput}
          onChangeFormattedText={text => {
             setphoneNumber(text)
              //setCode(text)
              //confirmCode()
           }}
        />
        {/* <Pressable style={styles.button} onPress={() => buttonPress()}>
            <Text style={styles.continueText}>Get Phone Number</Text>
          </Pressable> */}
        
        <PrimaryButton
          title={'Get Started'}
          color={Colors.HeaderColour}
          customStyles={styles.PrimaryButton}
          textColor="#4D4D4D"
          onPress={() => {
            signInWithPhoneNumber(phoneNumber)
            navigationService.navigate('ForgetPassScreen');
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // /////////////////// Country Picker Style

  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 0,
    marginBottom: 100,
    width: '100%',
    paddingHorizontal: 50,
    
  },

  phoneContainer: {
    height: 50,
    width: '100%',
    borderColor: 'rgb(0, 180, 0)',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
  },
  button: {
    marginTop: 30,
    width: '75%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  textInput: {
    paddingVertical: 0,
    borderRadius: 20,
  },

  PrimaryButton: {
    marginTop: 30,
    width: '80%',
  },
});



// import React, { useState } from 'react';
// import { Button, TextInput } from 'react-native';
// import auth from '@react-native-firebase/auth';

// export function GetStartedScreen() {
//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);

//   const [code, setCode] = useState('');

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }

//   if (!confirm) {
//     return (
//       <Button
//         title="Phone Number Sign In"
//         onPress={() => signInWithPhoneNumber('+92 343-063-0400')}
//       />
//     );
//   }

//   return (
//     <>
//       <TextInput value={code} onChangeText={text => setCode(text)} />
//       <Button title="Confirm Code" onPress={() => confirmCode()} />
//     </>
//   );
// }