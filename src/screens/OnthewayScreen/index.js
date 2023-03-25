import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
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
// import {Card, Center} from 'native-base';
import {Card} from 'react-native-shadow-cards';
export const OnthewayScreen = () => {
  onSlideRight = () => {
    //perform Action on slide success.
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <Image
              source={Images.Map}
              style={{
                //   borderColor: 'black',
                //   borderWidth: 1,
                height: 550,
                width: 410,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: Colors.HeaderColour,
              height: 50,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20}}>You are on the way to Pick Up</Text>
          </View>
          <View style={{height: 250}}>
            <View
              style={{
                backgroundColor: 'white',
                // height: 50,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Card
                style={{
                  //   borderColor: 'black',
                  //   borderWidth: 1,
                  width: '95%',

                  //   height: 180,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column', width: 60}}>
                    <Image
                      source={Images.AsimSamall}
                      style={{
                        height: 50.59,
                        width: 50.59,
                        marginLeft: 10,
                        marginTop: 5,
                      }}></Image>
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
                        <Image
                          source={Images.Line}
                          style={{width: 200}}></Image>
                        <Text>Drop Off</Text>
                        <Text>Chase Up Super Mart Karachi</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{flexDirection: 'column', width: 180}}>
                    <Text style={{marginLeft: 5, marginTop: 5}}>
                      Asim Azhar
                    </Text>
                    <Text style={{marginLeft: 5}}>+92 300 0000000</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginTop: 8,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignSelf: 'center',
                        // borderColor: 'black',
                        // borderWidth: 1,
                      }}>
                      <Text style={{fontSize: 30}}>500m</Text>
                      <Text style={{fontSize: 30}}>Away</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginBottom: 10,
                  }}>
                  <PrimaryButton
                    title={'Cancel'}
                    color={'#FF0000'}
                    customStyles={styles.PrimaryButton2}
                    textColor={'white'}
                    onPress={() => {
                      navigationService.navigate('');
                    }}
                  />
                  <PrimaryButton
                    title={'Arrived'}
                    color={Colors.HeaderColour}
                    textColor={'#707070'}
                    customStyles={styles.PrimaryButton}
                    onPress={() => {
                      navigationService.navigate('ArrievedDestinationScreen');
                    }}
                  />
                </View>
              </Card>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {/* <RNSlidingButton
                style={{
                  width: 240,
                }}
                height={35}
                onSlidingSuccess={this.onSlideRight}
                slideDirection={SlideDirection.RIGHT}>
                <View style={{}}>
                  <Text numberOfLines={1} style={styles.titleText}>
                    SLIDE RIGHT TO ACCEPT >
                  </Text>
                </View>
              </RNSlidingButton> */}
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
    width: '45%',
    alignSelf: 'center',
    marginLeft: 10,
  },
  PrimaryButton2: {
    marginTop: 30,
    width: '45%',
    alignSelf: 'center',
  },
});
