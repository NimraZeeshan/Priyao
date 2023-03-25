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
import {Metrix, Images, Colors} from '../../config';
import {TextInput} from 'react-native-gesture-handler';
import {useState, useRef} from 'react';

import SwipeButton from 'rn-swipe-button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const OpenMailScreen = () => {
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
          <View style={{flex: 1}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                margin: 80,
              }}>
              <Image
                source={Images.EmailBox}
                style={{width: 97, height: 80}}></Image>
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 29, fontWeight: 'bold'}}>
                Check your mail
              </Text>
              <Text style={{textAlign: 'center', width: '80%'}}>
                We have sent a password recover instructions to your email.l
              </Text>
            </View>
            <View>
              <PrimaryButton
                title={'Open email app'}
                color={'#707070'}
                customStyles={styles.PrimaryButton}
                onPress={() => {
                  navigationService.navigate('ChangePasswordScreen');
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
    marginTop: 30,
    width: '85%',
    alignSelf: 'center',
  },
  input: {
    paddingHorizontal: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 5,
    width: '95%',
    padding: 15,
    borderRadius: 10,
  },
});
