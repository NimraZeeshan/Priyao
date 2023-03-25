import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import {
  AuthHeader,
  AuthContainer,
  PrimaryInput,
  PrimaryButton,
  Loading,
} from '../../components';

import React, {useState} from 'react';
import navigationService from '../../config/navigationService';
import {Metrix, NavigationService, Images, Colors} from '../../config';
// import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import SwipeButton from 'rn-swipe-button';
import {Header, ListItem, Avatar} from 'react-native-elements';
// import {Card, Center} from 'native-base';
import {Card} from 'react-native-shadow-cards';
import { Drawer } from '../../components/Drawer';;





export const AddtowalletScreen = () => {

  const [openDrawer, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!openDrawer);
  };


  const { width, height } = useWindowDimensions();

  return (
    <>
   <View style={{flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: width,
            height: 80,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: Colors.HeaderColour,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 29, fontWeight: 'bold', letterSpacing: 2}}>
            Wallet
          </Text>
        </View>
        <View style={{position: 'absolute', left: 0, zIndex: 1}}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Image
              source={Images.Menu}
              style={{
                height: 49,
                width: 49,
                marginLeft: 5,
                marginTop: 20,
                padding: 10,
              }}
            />
          </TouchableOpacity>
        </View>

        <Drawer open={openDrawer} toggleDrawer={toggleDrawer} style={{zIndex: 0}}>
          {/* Drawer content */}
        </Drawer>
      </View>

      {/* <Modal
        visible={openDrawer}
        transparent={true}
        onRequestClose={closeDrawer}
        style={{zIndex: 0}}>
        <TouchableOpacity
          style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}
          onPress={closeDrawer}
        />
      </Modal> */}
    </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Card
          style={{
            //   borderColor: 'black',
            //   borderWidth: 1,
            alignSelf: 'center',
            width: '90%',
            height: 65,
            marginTop: 50,
          }}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
              height: Metrix.VerticalSize(90.75),
              justifyContent: 'center',
            }}>
            <Text style={{
              fontSize: 12,
              alignSelf: 'flex-start',
              marginTop: -20,
              }}>
                Available credit</Text>
            <Text style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: 'blue',
              alignSelf: 'flex-start',
              marginVertical: -1,
              }}>
              PKR 0
            </Text>
            <Image style={{
              marginTop: -50,
              alignSelf: 'flex-end',
              width: 30,
              height: 30,
              marginHorizontal: 5,
              marginVertical: 3,
            }}
                source={Images.Addcredit}
                name="your-icon"
                //size={10}
              />
            <TouchableOpacity
              onPress={() => {
                navigationService.navigate('UserAddCreditScreen');
              }}>
             <Text style={{
               fontSize: 12,
               alignSelf: 'flex-end',
               //marginHorizontal: -9,
            }}>
              Add credit
            </Text>
            </TouchableOpacity>
          </View>
        </Card>

        <Card
          style={{
            //   borderColor: 'black',
            //   borderWidth: 1,
            alignSelf: 'center',
            width: '90%',
           // height: 150,
            marginTop: 20,
          }}>
          <View
            style={{
              width: '95%',
              // height: '70%',
              alignSelf: 'center',
              alignItems: 'center',
              height: Metrix.VerticalSize(170.75),
              justifyContent: 'center',
              //marginVertical: -10,
            }}>
            <Text style={{
              fontSize: 12,
              alignSelf: 'flex-start',
              marginTop: -50,
              marginHorizontal: 20,
              
              }}>Transactions</Text>

            <Text style={{
              fontSize: 12,
              alignSelf: 'flex-start',
              marginBottom: -20,
              marginHorizontal: 20,
              paddingTop: 20,
              }}>
              Pirayo
            </Text>
            <View style={{
              width: 12, 
              height: 12, 
              backgroundColor: Colors.HeaderColour,
              borderRadius: 24,
              alignSelf: 'flex-start',
              marginBottom: -20,
              marginHorizontal: 6,
              marginVertical: 35,
              }}>
            </View>
          </View>
          <Text style={{
              fontSize: 20, 
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              marginTop: -69,
              marginLeft: 29,
              marginVertical: 30,
            }}>Negative Balance
          </Text>
          <Text style={{
              fontSize: 20, 
              fontWeight: 'bold',
              color: 'red',
              alignSelf: 'flex-end',
              marginTop: -55,
              marginHorizontal: 10,
              marginVertical: 30,
            }}>-PKR 174</Text>
          
           <Text style={{
              fontSize: 12,
              alignSelf: 'flex-start',
              paddingVertical: 30,
              marginHorizontal: 28,
              paddingTop: -30,
              }}>
              Credit Added
            </Text>
          <View style={{
              width: 12, 
              height: 12, 
              backgroundColor: Colors.HeaderColour,
              borderRadius: 24,
              alignSelf: 'flex-start',
              //marginBottom: 10,
              marginTop: -15,
              marginHorizontal: 12,
              }}>
            </View>
          <Text style={{
              fontSize: 20, 
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              marginTop: -20,
              marginLeft: 29,
              marginVertical: 30,
            }}>Wallet Top Up
          </Text>
          <Text style={{
              fontSize: 20, 
              fontWeight: 'bold',
              color: 'blue',
              alignSelf: 'flex-end',
              marginTop: -55,
              marginHorizontal: 10,
              marginVertical: 30,
            }}>+PKR 174</Text>

           <Text style={{
              fontSize: 12,
              alignSelf: 'flex-start',
              paddingVertical: 30,
              marginHorizontal: 28,
              paddingTop: -30,
              }}>
              Pirayo
           </Text>
            <View style={{
              width: 12, 
              height: 12, 
              backgroundColor: Colors.HeaderColour,
              borderRadius: 24,
              alignSelf: 'flex-start',
              //marginBottom: 10,
              marginTop: -15,
              marginHorizontal: 12,
              }}>
           </View>
           <Text style={{
              fontSize: 20, 
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              marginTop: -20,
              marginLeft: 29,
              marginVertical: 30,
            }}>Negative Balance
          </Text>
          <Text style={{
              fontSize: 20, 
              fontWeight: 'bold',
              color: 'blue',
              alignSelf: 'flex-end',
              marginTop: -55,
              marginHorizontal: 10,
              marginVertical: 30,
            }}>+PKR 174</Text>
        </Card>
        <Text></Text>

        {/* <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 20,
            //   borderColor: 'black',
            //   borderWidth: 1,
            width: '95%',
            alignSelf: 'center',
          }}>
          <PrimaryButton
            title={'Online Check'}
            color={Colors.HeaderColour}
            customStyles={styles.PrimaryButton}
            // onPress={() => {
            //   navigationService.navigate('SignupScreen');
            // }}
          />
          <PrimaryButton
            title={'My Income'}
            color={Colors.HeaderColour}
            customStyles={styles.PrimaryButton}
            onPress={() => {
              navigationService.navigate('RatingsAndReviewsScreen');
            }}
          />
          <PrimaryButton
            title={'Balance Statistics'}
            color={'#707070'}
            customStyles={styles.PrimaryButton}
            onPress={() => {
              navigationService.navigate('FAQScreen');
            }}
          />
        </View> */}
      </ScrollView>

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
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
  },
  PrimaryButtonLogout: {
    marginTop: 80,
    width: '85%',
    alignSelf: 'center',
  },
});
