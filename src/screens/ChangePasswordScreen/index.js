import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
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
import {TextInput} from 'react-native-gesture-handler';
import {useState, useRef} from 'react';

import SwipeButton from 'rn-swipe-button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const ChangePasswordScreen = () => {
  const [hidePass, setHidePass] = useState(true);

  onSlideRight = () => {
    //perform Action on slide success.
  };

  return (
    <>
      <View style={{flex: 1}}>
        <View
          style={{
            height: Metrix.VerticalSize(100),
            //   width: Metrix.VerticalSize(400),
            // borderColor: 'black',
            // borderWidth: 1,
            backgroundColor: Colors.HeaderColour,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <Image
            source={Images.BackArrow}
            style={{
              height: Metrix.VerticalSize(40),
              width: Metrix.VerticalSize(40),
              // alignSelf: 'center',
            }}></Image>
          <Text style={{fontSize: 29, fontWeight: 'bold'}}>
            Forget Password
          </Text>
          <Image
            source={{}}
            style={{
              height: Metrix.VerticalSize(40),
              width: Metrix.VerticalSize(40),
              // alignSelf: 'center',
            }}></Image>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              margin: 20,
              // alignItems: 'center',
            }}>
            <Text style={{color: '#4D4D4D', fontSize: 29, fontWeight: 'bold'}}>
              Create new password
            </Text>
            <Text>
              Your new password must be different from previous used passwords.
            </Text>
          </View>
          <Text
            style={{
              // borderColor: 'black',
              // borderWidth: 1,
              width: wp('95%'),
              alignSelf: 'center',
              marginTop: 50,
            }}>
            Password
          </Text>
          <View
            style={{
              borderColor: 'black',
              borderWidth: 1,
              marginTop: 5,
              width: '95%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 8,
              borderRadius: 10,
            }}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={hidePass ? true : false}
              maxLength={30}
            />
            <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
              <Image
                source={Images.passwordeye}
                style={styles.icon}
                name="your-icon"
                size={10}
              />
            </TouchableOpacity>
          </View>
          <Text style={{margin: 10, color: '#4D4D4D'}}>
            Must be at least 8 characters.
          </Text>
          <Text
            style={{
              // borderColor: 'black',
              // borderWidth: 1,
              width: wp('95%'),
              alignSelf: 'center',
              marginTop: 20,
            }}>
            Change Password
          </Text>
          <View
            style={{
              borderColor: 'black',
              borderWidth: 1,
              marginTop: 5,
              width: '95%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 8,
              borderRadius: 10,
              // flex: 1,
            }}>
            <TextInput
              style={styles.input}
              placeholder="Change Password"
              secureTextEntry={hidePass ? true : false}
              maxLength={30}
            />
            <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
              <Image
                source={Images.passwordeye}
                style={styles.icon}
                name="your-icon"
                size={10}
              />
            </TouchableOpacity>
          </View>
          <Text style={{margin: 10, color: '#4D4D4D'}}>
            Both passwords must match.
          </Text>
          <PrimaryButton
            title={'Save'}
            color={'#707070'}
            customStyles={styles.PrimaryButton}
            onPress={() => {
              navigationService.navigate('EnterEmailScreen');
            }}
          />
        </ScrollView>
      </View>
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
  icon: {
    height: 30,
    width: 30,
    // marginRight: 5,
  },
  PrimaryButton: {
    marginTop: 30,
    width: '95%',
    alignSelf: 'center',
  },
  input: {
    paddingHorizontal: 10,
  },
});
