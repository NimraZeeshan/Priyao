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
export const EnterEmailScreen = () => {
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
          <View style={{flex: 1, width: '95%'}}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                margin: 20,
                //   alignItems: 'center',
              }}>
              <Text
                style={{color: '#4D4D4D', fontSize: 29, fontWeight: 'bold'}}>
                Reset password
              </Text>
              <Text>
                Enter the email associated with your account and we'll send an
                email with instructions to reset your password.
              </Text>
            </View>
            <View style={{margin: 20, width: '95%'}}>
              <Text>Email address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Email"
                maxLength={30}
              />
            </View>
            <View style={{margin: 20}}>
              <PrimaryButton
                title={'Send Instructions'}
                color={'#707070'}
                customStyles={styles.PrimaryButton}
                onPress={() => {
                  navigationService.navigate('OpenMailScreen');
                }}
              />
            </View>
          </View>
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
    // marginTop: 30,
    width: '85%',
    alignSelf: 'center',
  },
  input: {
    paddingHorizontal: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 5,
    width: '100%',
    padding: 15,
    borderRadius: 10,
  },
});
