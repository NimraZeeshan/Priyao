import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import {
  MainContainer,
  AuthHeader,
  AuthContainer,
  PrimaryInput,
  PrimaryButton,
  BackHeader,
  Loading,
} from '../../components';

import React from 'react';
import {Metrix, NavigationService, Images, Colors} from '../../config';
import navigationService from '../../config/navigationService';
import {useState, useRef, useCallback} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import RadioGroup from 'react-native-radio-buttons-group';
import {Picker} from '@react-native-picker/picker';
// Import Image Picker
//import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {Card} from 'react-native-shadow-cards';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Becomeadriverthree = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState();

  AsyncStorage.getItem('resId').then((res)=>{
    setId(res)

    });

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
      <Text style={{fontSize: 20, fontWeight: 'bold', letterSpacing: 2}}>Congratulations!</Text>
    </View>

    <Text style={{alignSelf: 'center', lineHeight: 25, letterSpacing: 0.5}}>Congratulations! you have successfully registered your vehicle
    </Text>
    <PrimaryButton
      title="Proceed"
      onPress={() => {
        navigationService.navigate('LoginScreenFromHaveRide');
      }}// toggleModal
      customStyles={styles.PrimaryButton}
      />
  </View>
</Modal>
  );

  const Data = {
    image: '',
  };

  const [phoneNumber, setphoneNumber] = useState('');
  const [gender, setGender] = useState('Unknown');
  const phoneInput = useRef(null);
  const buttonPress = () => {
    Alert.alert(phoneNumber);
  };

  
  const [signupData, setSignupData] = useState(Data);

  const [vehicle_name, setVehicle_Name] = useState('');
  const [vehicle_brand, setVehicle_Brand] = useState('');
  const [vehicle_number, setVehicle_Number] = useState('');
  const [vehicle_color, setVehicle_Color] = useState('');
  const [photoone, setPhotoURIone] = useState(null);
  const [phototwo, setPhotoURItwo] = useState(null);

  
  const vehicleRegistration = () => {
    const formData = new FormData();
    formData.append('vehicle_name', vehicle_name);
    formData.append('vehicle_brand', vehicle_brand);
    formData.append('vehicle_number', vehicle_number);
    formData.append('vehicle_color', vehicle_color);
    formData.append("vehicle_license", {
      uri: photoone.path,
      type: photoone.mime,
      name: 'image.jpeg',
  });
    formData.append("vehicle_image", {
      uri: phototwo.path,
      type: phototwo.mime,
      name: 'image.jpeg',
  });

  fetch('http://asaanweb.com/pirayo/index.php/Vehicle_Controller/insert_vehicle', {

  method: 'POST',
  body: formData})
  .then((response) => response.json())

  .then(function (res) {
    if (res.response.status === 'true') {
      console.log(res.response.status);
      toggleModal()
      //navigationService.navigate('Becomeadriverfour');
    } else if (res.response.status == 'false') {
      console.log(res.response.status);
      showToast('not registered');
    }

  })
  .catch(error => console.log(error));
};

  const imagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: false,
      });
     // console.log('---------->Image', image);
      setPhotoURIone(image);

      setSignupData({...signupData, image: image});
      // [setPhotoURI];
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
      }
    }
  };

  const imagePicker2 = async () => {
    try {
      const imagetwo = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: false,
      });
      console.log('---------->Image', imagetwo);
      setPhotoURItwo(imagetwo);
      // [setPhotoURI];
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
      }
    }
  };
  
  
  <View style={{flex: 1}}>
 
</View>

 
  return (
  <>
    <View
      style={{
        height: 90,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: Colors.HeaderColour,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          letterSpacing: 2,
          fontSize: 30,
        }}>
        Become A Driver{id}
      </Text>
      <Text>Welcome back you've been missed</Text>
    </View>
    <ScrollView>
      <View
        style={{
          flex: 1,
          // borderWidth: 1,
          // alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
          margin: 10,
        }}>
        <Text style={{paddingHorizontal: 10, marginTop: 10}}>
          Vehicle brand
        </Text>
        <TextInput
          placeholder="Vehicle brand"
          defaultValue={vehicle_name}
          onChangeText={e => {
            setVehicle_Name(e)
          }}
          style={{
            borderWidth: 1,
            height: 50,
            paddingHorizontal: 20,
            marginTop: 10,
            borderRadius: 10,
            width: '100%',
          }}></TextInput>
        <Text style={{paddingHorizontal: 10, marginTop: 10}}>Model year</Text>
        <TextInput
          placeholder="Model year"
          defaultValue={vehicle_brand}
          onChangeText={e => {
            setVehicle_Brand(e)
          }}
          style={{
            borderWidth: 1,
            height: 50,
            paddingHorizontal: 20,
            marginTop: 10,
            borderRadius: 10,
            width: '100%',
          }}></TextInput>
        <Text style={{paddingHorizontal: 10, marginTop: 10}}>
          License plate number
        </Text>
        <TextInput
          placeholder="License plate number"
          defaultValue={vehicle_number}
          onChangeText={e => {
            setVehicle_Number(e)
          }}
          style={{
            borderWidth: 1,
            height: 50,
            paddingHorizontal: 20,
            marginTop: 10,
            borderRadius: 10,
            width: '100%',
          }}></TextInput>
        {/* <RadioGroup
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
        /> */}
        <Text style={{paddingHorizontal: 10, marginTop: 10}}>Color</Text>
        <TextInput
          placeholder="Red, Yellow, Green"
          defaultValue={setVehicle_Color}
          onChangeText={e => {
            setVehicle_Color(e)
          }}
          style={{
            borderWidth: 1,
            height: 50,
            paddingHorizontal: 20,
            marginTop: 10,
            borderRadius: 10,
            width: '100%',
          }}></TextInput>

        <View
          style={{
            // borderColor: 'black',
            // borderWidth: 1,
            height: 160,
            marginTop: 20,
            paddingHorizontal: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={imagePicker}>
            {/* <Image
              source={{uri: photoone?.path}}
              style={{
                width: 97.94,
                height: 131.75,
                orderColor: 'black',
                borderWidth: 1,
                marginTop: 20,
              }}
            /> */}
            <Card
              style={{
                width: 97.94,
                height: 131.75,
                borderColor: 'black',
                borderWidth: 0.2,
                marginTop: 20,
              }}>
              <Text style={{alignSelf: 'center'}}>License Platte Image</Text>
              <Image source={{uri: photoone?.path}} style={{
                width: 97.94,
                height: 131.75,
              }}/>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={imagePicker2}>
            <Card
              style={{
                width: 97.94,
                height: 131.75,
                borderColor: 'black',
                borderWidth: 0.2,
                marginTop: 20,
              }}>
                <Text style={{alignSelf: 'center'}}>Registration Image</Text>
              <Image source={{uri: phototwo?.path}} style={{
                width: 97.94,
                height: 131.75,
              }}/>
            </Card>
          </TouchableOpacity>
        </View>

        {/* <PrimaryButton title="Show modal" onPress={toggleModal} /> */}
        <PrimaryButton
          textColor={'white'}
          title={'Submit'}
          color={'#707070'}
          customStyles={styles.PrimaryButtonCountinue}
          onPress={() => {
            // toggleModal() &&
            vehicleRegistration()
            //navigationService.navigate('DriverRideTypeScreen');
          }}
        />
      </View>
    </ScrollView>
  {renderContent()}
  </>
  );
};

const styles = StyleSheet.create({
  PrimaryButton: {
    marginBottom: 15,
  },
  PrimaryButton2: {
    marginBottom: 10,
  },
  // /////////////////// Country Picker Style

  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 10,
  },
  PrimaryButtonCountinue: {
    marginTop: 30,
  },
  phoneContainer: {
    height: 50,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 30,
    width: '75%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  textInput: {
    paddingVertical: 0,
  },
});
