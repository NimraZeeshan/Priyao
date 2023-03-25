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

export const ArrievedDestinationScreen = () => {
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const Press1 = () => setActive1(!active1);
  const Press2 = () => setActive2(!active2);
  const Press3 = () => setActive3(!active3);
  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        // padding: 16,
        height: 450,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
      }}>
      {/* <Text>Swipe down to close</Text> */}
      <View
        style={{
          // borderColor: 'black',
          // borderWidth: 1,
          height: 70,
          backgroundColor: Colors.HeaderColour,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 20, color: '#707070', fontWeight: 'bold'}}>
          You have arrived at the destination
        </Text>
      </View>
      <PrimaryButton
        title={'End Ride'}
        color={'#707070'}
        textColor={'white'}
        customStyles={styles.PrimaryButton}
        onPress={() => {
          navigationService.navigate('RideDeetailsScreen');
        }}
      />
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
        <View
          style={{
            //   borderColor: 'black',
            //   borderWidth: 1,
            height: 170,
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
            <Text>Pick Up</Text>
            <TextInput style={styles.input} placeholder="Dolmin Mall Clifton" />
            <Text style={{marginTop: 10}}>Drop Off</Text>
            <TextInput
              style={styles.input}
              placeholder="Chase Up Super Mart Karachi"
            />
          </View>
        </View>
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
        snapPoints={[180, 180, 0]}
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
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
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
});
