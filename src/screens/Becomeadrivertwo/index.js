import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import React from 'react';
import navigationService from '../../config/navigationService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Card} from 'react-native-shadow-cards';
import {Metrix, NavigationService, Images, Colors} from '../../config';

export const Becomeadrivertwo = () => {
  const handleMediaQueryChange = matches => {
    // matches will be true or false based on the value for the media query
  };
  return (
    <>
      <View
        style={{
          // height: 145,
          height: hp('17%'),
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: Colors.HeaderColour,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 40,
          }}>
          Become A Driver
        </Text>
        <Text>Welcome back you've been missed</Text>
      </View>
      <ScrollView>
        <Card
          style={{
            marginTop: 150,
            alignSelf: 'center',
            // borderColor: 'black',
            // borderWidth: 1,
            width: wp('95%'),
          }}>
          <View
            style={{
              // borderColor: 'black',
              // borderWidth: 1,
              width: wp('95%'),
              // alignSelf: 'center',
              // marginTop: 150,
            }}>
            <View
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                width: wp('95%'),
                height: 58,
                backgroundColor: Colors.HeaderColour,
                justifyContent: 'center',
                alignItems: 'center',
                // alignSelf: 'center',
              }}>
              <Text style={{fontSize: 25}}>Congratulations!</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigationService.navigate('Becomeadriverthree');
              }}>
              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  marginTop: 5,
                  paddingLeft: 20,
                  paddingRight: 20,
                  fontSize: 17,
                  height: hp('15'),
                }}
                numberOfLines={8}>
                we have received your driver request, we will verify your
                details documents and will update you soon
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
});
