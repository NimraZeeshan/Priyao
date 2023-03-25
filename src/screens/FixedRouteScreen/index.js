import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import {
  AuthHeader,
  AuthContainer,
  PrimaryInput,
  PrimaryButton,
  Loading,
} from '../../components';


import React, {useEffect} from 'react';
import navigationService from '../../config/navigationService';
import {Metrix, NavigationService, Images, Colors} from '../../config';
import { Drawer } from '../../components/Drawer';
import {useState, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';




export const FixedRouteScreen = () => {

  const [openDrawer, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!openDrawer);
  };

  return (
    <>
     <View style={{flexDirection: 'row'}}>
      <View
        style={{
          width: wp('100%'),
          height: 80,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: Colors.HeaderColour,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 25, fontWeight: 'bold', letterSpacing: 2}}>Fixed Routes</Text>
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

      <View
        style={{
          // borderColor: 'black',
          // borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingVertical: 150,
        }}>
        <PrimaryButton
          textColor={"white"}
          title={'Your Routes'}
          color={'#707070'}
          customStyles={styles.PrimaryButton}
          onPress={() => {
            navigationService.navigate('RideHistoryScreenTwo');
          }}
        />
        <PrimaryButton
          textColor={"white"}
          title={'New Routes'}
          color={'#707070'}
          customStyles={styles.PrimaryButton}
          onPress={() => {
            navigationService.navigate('FixedRouteScreenTwo');
          }}
        />
      </View>

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
    margin: 40,
    width: '60%',
  },
  PrimaryButton2: {
    marginTop: 30,
    width: '15%',
    left: 20,
  },
  PrimaryButton3: {
    width: '60%',
    marginLeft: 70,
  },
  PrimaryButtonLogout: {
    marginTop: 80,
    width: '85%',
    alignSelf: 'center',
  },
});
