import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  PrimaryButton,
} from '../../components';

import React, {useState} from 'react';
import navigationService from '../../config/navigationService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Card} from 'react-native-shadow-cards';
import {Metrix, NavigationService, Images, Colors} from '../../config';
import Modal from 'react-native-modal';


export const Becomeadriverfour = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderContent = () => (

    <Modal isVisible={isModalVisible}>
    <View style={{backgroundColor: 'white', borderRadius: 10}}>
      <View
        style={{
          // borderColor: 'black',
          // borderWidth: 1,
          height: 50,
          backgroundColor: Colors.HeaderColour,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 20}}>Select a reason</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigationService.navigate('PaymentFeedbackScreen');
        }}>
        <Card
          style={{
            margin: 10,
            height: 50,
            alignSelf: 'center',
            width: '95%',
            flexDirection: 'row',
          }}>
          <Image
            source={Images.Ellipse}
            style={{
              width: 16,
              height: 16,
              justifyContent: 'center',
              alignSelf: 'center',
              marginLeft: 5,
            }}></Image>
          <Text style={{alignSelf: 'center', marginLeft: 5}}>
            I don't need the ride anymore
          </Text>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity>
        <Card
          style={{
            margin: 10,
            height: 50,
            alignSelf: 'center',
            width: '95%',
            flexDirection: 'row',
          }}>
          <Image
            source={Images.Ellipse}
            style={{
              width: 16,
              height: 16,
              justifyContent: 'center',
              alignSelf: 'center',
              marginLeft: 5,
            }}></Image>
          <Text style={{alignSelf: 'center', marginLeft: 5}}>
            I changed my mind
          </Text>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity>
        <Card
          style={{
            margin: 10,
            height: 50,
            alignSelf: 'center',
            width: '95%',
            flexDirection: 'row',
          }}>
          <Image
            source={Images.Ellipse}
            style={{
              width: 16,
              height: 16,
              justifyContent: 'center',
              alignSelf: 'center',
              marginLeft: 5,
            }}></Image>
          <Text style={{alignSelf: 'center', marginLeft: 5}}>
            Captain isn't replying
          </Text>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity>
        <Card
          style={{
            margin: 10,
            height: 50,
            alignSelf: 'center',
            width: '95%',
            flexDirection: 'row',
          }}>
          <Image
            source={Images.Ellipse}
            style={{
              width: 16,
              height: 16,
              justifyContent: 'center',
              alignSelf: 'center',
              marginLeft: 5,
            }}></Image>
          <Text style={{alignSelf: 'center', marginLeft: 5}}>
            Car or captain details didn't match
          </Text>
        </Card>
      </TouchableOpacity>

      <PrimaryButton
        title="Proceed"
        onPress={() => {
          navigationService.navigate('CancelUserScreen');
        }}// toggleModal
        customStyles={styles.PrimaryButton}
        />
    </View>
  </Modal>
  );

  const shadowsStyling = {
    width: 100,
    height: 100,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
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
            <View style={{width: wp('95%'), height: hp('15')}}>
              <TouchableOpacity
                onPress={() => {
                  //navigationService.navigate('HomeScreen');
                  toggleModal();
                }}>
                <Text
                  style={{
                    marginTop: 10,
                    textAlign: 'center',
                    marginTop: 5,
                    paddingLeft: 20,
                    paddingRight: 20,
                    fontSize: 17,
                  }}
                  numberOfLines={8}>
                  Congratulations! you have successfully registered your vehicle
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </ScrollView>
    {renderContent()}
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
