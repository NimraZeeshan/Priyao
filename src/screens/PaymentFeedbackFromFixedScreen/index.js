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
  import StarRating from 'react-native-star-rating-widget';
  import {useState, useRef} from 'react';
  
  import {Center} from 'native-base';
  import {TextInput} from 'react-native-gesture-handler';

  export const PaymentFeedbackFromFixedScreen = () => {
    const [rating, setRating] = useState(0);
    onSlideRight = () => {
      //perform Action on slide success.
    };
  
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={{flex: 1}}>
              <View
                style={{
                  // borderColor: 'black',
                  // borderWidth: 1,
                  height: 100,
                  backgroundColor: Colors.HeaderColour,
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Image
                  source={Images.BackArrow}
                  style={{width: 49, height: 49}}></Image>
                <Text style={{fontSize: 20, fontWeight: 'bold', letterSpacing: 1}}>PAYMENT & Feedback</Text>
                <Image
                  source={Images.Menu}
                  style={{width: 49, height: 49}}></Image>
              </View>
              <View
                style={{
                  // borderColor: 'black',
                  // borderWidth: 1,
                  marginTop: 30,
                  flexDirection: 'row',
                  // justifyContent: 'space-evenly',
                }}>
                <Image
                  source={Images.AsimSamall}
                  style={{width: 65, height: 65, marginLeft: 10}}></Image>
                <View
                  style={{
                    // borderColor: 'black',
                    // borderWidth: 1,
                    flexDirection: 'column',
                    marginLeft: 20,
                  }}>
                  <Text
                    style={{
                      marginTop: 10,
                    }}>
                    Asim Azhar
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontWeight: 'bold',
                    }}>
                    Toyota Carolla
                  </Text>
                </View>
                <View
                  style={{
                    // borderColor: 'black',
                    // borderWidth: 1,
                    flexDirection: 'column',
                    marginLeft: 40,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Images.pngwing}
                    style={{
                      width: 100,
                      height: 46,
                    }}></Image>
                  <Text>ARY 6068</Text>
                </View>
              </View>
              <Image
                source={Images.Line}
                style={{marginTop: 20, alignSelf: 'center'}}></Image>
              <Image
                source={Images.TwoLine}
                style={{
                  marginTop: 20,
                  alignSelf: 'center',
                  height: 32.28,
                  width: '85%',
                }}></Image>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Text style={{fontWeight: 'bold',}}>Dolmin Mall</Text>
                <Text  style={{fontWeight: 'bold',}}>Chase Up</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Text style={{color: '#97ADB6'}}>Dolmin Mall Road </Text>
                <Text style={{color: '#97ADB6'}}>Super Mart Karachi</Text>
              </View>
              <Image
                source={Images.Line}
                style={{marginTop: 20, alignSelf: 'center'}}></Image>
              <View
                style={{
                  // borderColor: 'black',
                  // borderWidth: 1,
                  marginTop: 20,
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 30, fontWeight: 'bold', letterSpacing: 1}}>Total Fare</Text>
                <Text style={{fontSize: 60, color: Colors.HeaderColour, fontWeight: 'bold', letterSpacing: 1}}>
                  PKR 600
                </Text>
              </View>
              <Image
                source={Images.Line}
                style={{marginTop: 20, alignSelf: 'center'}}></Image>
              <View
                style={{
                  // borderColor: 'black',
                  // borderWidth: 1,
                  marginTop: 20,
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 30, fontWeight: 'bold', letterSpacing: 1}}>How was your ride?</Text>
              </View>
              <View
                style={{
                  // borderColor: 'black',
                  // borderWidth: 1,
                  width: '85%',
                  alignSelf: 'center',
                  marginTop: 20,
                }}>
                <StarRating
                  rating={rating}
                  onChange={setRating}
                  style={{alignSelf: 'center'}}
                />
              </View>
              <View style={{marginTop: 20}}>
                <TextInput
                  placeholder="Say something about your experience "
                  style={{
                    borderWidth: 0.2,
                    height: 50,
                    paddingHorizontal: 20,
                    marginTop: 10,
                    borderRadius: 5,
                    width: '85%',
                    alignSelf: 'center',
                  }}></TextInput>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '95%',
                  // borderColor: 'black',
                  // borderWidth: 1,
                  marginTop: 20,
                  alignSelf: 'center',
                }}>
                <PrimaryButton
                  title={'Report'}
                  color={'#707070'}
                  customStyles={styles.PrimaryButton}
                  onPress={() => {
                    navigationService.navigate('ReportScreen');
                  }}
                />
                <PrimaryButton
                  title={'Sumbit'}
                  color={'#707070'}
                  customStyles={styles.PrimaryButton2}
                  onPress={() => {
                    navigationService.navigate('HomeScreen');
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
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
      width: '40%',
      alignSelf: 'center',
      backgroundColor: '#FF0000',
    },
    PrimaryButton2: {
      marginTop: 30,
      width: '40%',
      alignSelf: 'center',
    },
  });
  