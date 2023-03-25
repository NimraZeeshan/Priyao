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
import {Center} from 'native-base';
import {TextInput} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {useState, useRef} from 'react';

import {Card} from 'react-native-shadow-cards';

export const CurrentRideSeatScreen = () => {
  const DATA = [
    {
      id: 'comp1',
      description: 'This is component 1',
      image: require('../../assets/icons/SendBtn.png'),
    },
    {
      id: 'comp1',
      description: 'This is component 1',
      image: require('../../assets/icons/SendBtn.png'),
    },
    {
      id: 'comp1',
      description: 'This is component 1',
      image: require('../../assets/icons/SendBtn.png'),
    },
    {
      id: 'comp1',
      description: 'This is component 1',
      image: require('../../assets/icons/SendBtn.png'),
    },
  ];
  const Comp1 = () => {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={Images.AsimSamall}
            style={{
              height: 50.59,
              width: 50.59,
              marginLeft: 10,
              marginTop: 10,
            }}></Image>
          <Card
            style={{
              //   borderColor: 'black',
              //   borderWidth: 1,
              height: 75,
              width: '80%',
              alignSelf: 'center',
              marginLeft: 10,
              marginTop: 10,
            }}>
            <View
              style={{
                // borderColor: 'black',
                // borderWidth: 1,
                flexDirection: 'row',
              }}>
              <Image
                source={Images.StraightLocation}
                style={{height: 44.91, width: 12, margin: 5}}></Image>
              <View style={{flexDirection: 'column', margin: 5}}>
                <Text>Pick Up</Text>
                <Text>Dolmin Mall Clifton</Text>
                <Image source={Images.Line} style={{width: 200}}></Image>
                <Text>Drop Off</Text>
                <Text>Chase Up Super Mart Karachi</Text>
              </View>
              <View
                style={{
                  //   borderColor: 'black',
                  //   borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: Colors.HeaderColour, fontSize: 20}}>
                  PKR 200
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </View>
    );
  };
  const mapOfComponents = {
    comp1: <Comp1 />,
  };
  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        // padding: 16,
        height: 450,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
      {/* <Text>Swipe down to close</Text> */}
      <View
        style={{
          // borderColor: 'black',
          // borderWidth: 1,
          height: 70,
          backgroundColor: Colors.HeaderColour,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 20}}>Current Rides</Text>
      </View>
      <View>
        <FlatList
          data={DATA}
          renderItem={({item}) => {
            return mapOfComponents[item.id];
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <>
      <View
        style={{
          // borderColor: 'black',
          // borderWidth: 1,
          //   flex: 1,
          marginTop: 40,
          height: 500,
        }}>
        <Image
          source={Images.MapBig}
          style={{
            //   borderColor: 'black',
            //   borderWidth: 1,
            height: 500,
            width: 500,
            alignSelf: 'flex-start',
            position: 'absolute',
          }}></Image>
      </View>
      {/* <PrimaryButton
              title="Open Bottom Sheet"
              onPress={() => sheetRef.current.snapTo(1)}
            /> */}
      <View
        style={{
          flex: 1,
          //   backgroundColor: 'papayawhip',
          alignItems: 'center',
          justifyContent: 'center',
        }}></View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
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
    height: 50,
    paddingHorizontal: 20,
    marginTop: 10,
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
});
