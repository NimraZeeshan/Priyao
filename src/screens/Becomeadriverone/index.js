import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  ActivityIndicator,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneInput from 'react-native-phone-number-input';
import RadioGroup from 'react-native-radio-buttons-group';
import ImagePicker, { cleanSingle } from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Card} from 'react-native-shadow-cards';
import Modal from 'react-native-modal';
import axios from 'axios';


export const Becomeadriverone = () => {       
  
  async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message:
          'This app needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};


  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

     <Text style={{alignSelf: 'center', lineHeight: 25, letterSpacing: 0.5}}>we have recieved your driver, we will verify your details documents
           and will update you soon
     </Text>
      <PrimaryButton
        title="Proceed"
        onPress={() => {
          setTimeout(() => {
            navigationService.navigate('Becomeadriverthree');
          }, 1000);
          
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
  // const [gender, setGender] = useState('Unknown');
  const phoneInput = useRef(null);
  const buttonPress = () => {
    Alert.alert(phoneNumber);
  };

  const radioButtonsData = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Male',
      value: 'option1',
     //color: 'Colors.HeaderColour',

    },
    {
      id: '2',
      label: 'Female',
      value: 'option2',
      //color: 'Colors.HeaderColour',

    },
  ];

  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  };

  const [fullname, setFullName] = useState('');
  const [last_name, setLast_Name] = useState('');
  const [contactnumber, setContactnNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 // const [gender, setGender] = useState(null);
  const [address, setAddress] = useState('');
  const [cnic, setCnic] = useState('');
  const [city, setCity] = useState('');
  const [photoone, setPhotoURIone] = useState('');
  const [phototwo, setPhotoURItwo] = useState('');
  const [photothree, setPhotoURIthree] = useState('');
  const [photofour, setPhotoURIFour] = useState('');


  const driverRegistration = () => {

//     const formData = new FormData();
//     formData.append("fullname", fullname);
//     formData.append("last_name", last_name);
//     formData.append("contactnumber", contactnumber);
//     formData.append("email", email);
//     formData.append("password", password);
//     formData.append("gender", 'male');
//     formData.append("type", 'driver');
//     formData.append("address", address);
//     formData.append("cnic", cnic);
//     formData.append("city", city);

//     formData.append("cnic_front", {
//       uri: photoone.path,
//       type: photoone.mime,
//       name: "image.png",
      
//     })
//     formData.append("cnic_back", {
//       uri: phototwo.path,
//       type: phototwo.mime,
//       name: "image.png",
      
//     })

//     formData.append("license_front", {
//       uri: photothree.path,
//       type: photothree.mime,
//       name: "image.png",
      
//     })

//     formData.append("license_back", {
//       uri: photofour.path,
//       type: photofour.mime,
//       name: "image.png",
      
//   });


//   fetch('http://asaanweb.com/pirayo/index.php/Driver_Controller/driver_signup', {

//   method: 'POST',
//   body: formData

// })
  
//   .then(function(res){
//     res.json().then((res)=>{
//      console.log(res)
//     // AsyncStorage.setItem('resId', JSON.stringify(res.response.id))
      
//     if(res.response.status === "true"){
//       console.log('in>>>>>>>>>>', res.response.status)
//       navigationService.navigate('Becomeadriverthree');
//     }
//     })
//   })

//   .catch(error => console.log('error>>>>>>>',  error));


setIsLoading(true);

const formData = new FormData();
formData.append("fullname", fullname);
formData.append("last_name", last_name);
formData.append("contactnumber", contactnumber);
formData.append("email", email);
formData.append("password", password);
formData.append("gender", 'male');
formData.append("type", 'driver');
formData.append("address", address);
formData.append("cnic", cnic);
formData.append("city", city);

console.log("fullname", fullname);
console.log("last_name", last_name);
console.log("contactnumber", contactnumber);
console.log("email", email);
console.log("password", password);
console.log("gender", 'male');
console.log("type", 'driver');
console.log("address", address);
console.log("cnic", cnic);
console.log("city", city);

formData.append("cnic_front", {
  uri: photoone.path,
  type: photoone.mime,
  name: "image.jpg",
});

formData.append("cnic_back", {
  uri: phototwo.path,
  type: phototwo.mime,
  name: "image.jpg",
});

formData.append("license_front", {
  uri: photothree.path,
  type: photothree.mime,
  name: "image.jpg",
});

formData.append("license_back", {
  uri: photofour.path,
  type: photofour.mime,
  name: "image.jpg",
});

fetch('http://asaanweb.com/pirayo/index.php/Driver_Controller/driver_signup', {
  method: 'POST',
  body: formData
})
  .then(res => res.json())
  .then(data => {
    console.log(data)
    if(data.response.status === 'true'){
      setIsLoading(false);
      console.log('in driver sign-up >>>>>>>>>>', data.response.status)
      navigationService.navigate('Becomeadriverthree');
    }
  })
  .catch(error => console.log('error>>>>>>>',  error));
};


// axios.post('http://asaanweb.com/pirayo/index.php/Driver_Controller/driver_signup', formData, {
//   headers: {
//     'Content-Type': 'application/json',
//   }
// })
//   .then(response => {
//     console.log("axios response????????? ", response);
//     //AsyncStorage.setItem('resId', JSON.stringify(response.id))
      
//     if(response.status === "true"){
//       console.log('in response >>>>>>>>>>', response.status)
//       navigationService.navigate('Becomeadriverthree');
//     }
//   })
//   .catch(error => {
//     console.error("catch error axios>>>>>> ",error);
//   });
// }
  
  // .then(function (res) {

  //   if (res.response.status == 'true') {
  //     console.log(res)
  //     setGenerateDriverId(res.response.id)
  //     navigationService.navigate('Becomeadriverthree');
  //   } else if (res.response.status == 'false') {
  //     console.log(res.response.status);
  //     showToast('user not found');
  //   }

  // })
//   .catch(error => console.log(error));
// };

// const generatingDriverID = () => {
//   try {
//     setTimeout(() => {
      
//       AsyncStorage.setItem('generateDriverId',JSON.stringify(generateDriverId))

//     }, 5000);
    
//   }
//   catch (error) {
//     console.log('driver id not generating error>>>>>>>>>>>>>', error);
//   }
// }



  const imagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: false,
      });
      console.log('---------->Image One', image);
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
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: false,
      });
      console.log('---------->Image Two', image);
      setPhotoURItwo(image);
      // [setPhotoURI];
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
      }
    }
  };

  const imagePicker3 = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: false,
      });
      console.log('---------->Image Three', image);
      setPhotoURIthree(image);
      // [setPhotoURI];
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
      }
    }
  };

  const imagePicker4 = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: false,
      });
      console.log('---------->Image Four', image);
      setPhotoURIFour(image);
      // [setPhotoURI];
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
      }
    }
  };


  return (
    <>
      <View
        style={{
          height: 105,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: Colors.HeaderColour,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 35,
          }}>
          Become A Driver
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
          <Text style={{paddingHorizontal: 10, marginTop: 10}}>First Name</Text>
          <TextInput
            placeholder="Enter first"
            defaultValue={fullname}
            onChangeText={e => {
              setFullName(e)
            }}
            style={{
              borderWidth: 1,
              height: 50,
              paddingHorizontal: 20,
              marginTop: 10,
              borderRadius: 10,
              width: '100%',
            }}>
            </TextInput>

          <Text style={{paddingHorizontal: 10, marginTop: 10}}>Last Name</Text>
          <TextInput
            placeholder="Enter last name"
            defaultValue={last_name}
            onChangeText={e => {
              setLast_Name(e)
            }}
            style={{
              borderWidth: 1,
              height: 50,
              paddingHorizontal: 20,
              marginTop: 10,
              borderRadius: 10,
              width: '100%',
            }}></TextInput>
          <View style={styles.container}>

            <Text style={{paddingHorizontal: 10}}>Contact Number</Text>
            <PhoneInput
              ref={phoneInput}
              defaultValue={contactnumber}
              defaultCode="PK"
              layout="first"
              withShadow
              autoFocus
              containerStyle={styles.phoneContainer}
              textContainerStyle={styles.textInput}
              onChangeText={e => {
                setContactnNumber(e)
              }}
            />
            {/* <Pressable style={styles.button} onPress={() => buttonPress()}>
            <Text style={styles.continueText}>Get Phone Number</Text>
          </Pressable> */}
          </View>

          <Text style={{paddingHorizontal: 10, marginTop: 10}}>Email</Text>
          <TextInput
            placeholder="someone@example.com"
            defaultValue={email}
            onChangeText={e => {
              setEmail(e)
            }}
            style={{
              borderWidth: 1,
              height: 50,
              paddingHorizontal: 20,
              marginTop: 10,
              borderRadius: 10,
              width: '100%',
            }}></TextInput>

          <Text style={{paddingHorizontal: 10, marginTop: 10}}>Password</Text>
          <TextInput
            placeholder="name112"
            secureTextEntry
            defaultValue={password}
            onChangeText={e => {
              setPassword(e)
            }}
            style={{
              borderWidth: 1,
              height: 50,
              paddingHorizontal: 20,
              marginTop: 10,
              borderRadius: 10,
              width: '100%',
            }}></TextInput>

          <Text style={{paddingHorizontal: 0, marginTop: 10}}>Select Gender</Text>
          <View style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
          <RadioGroup
            containerStyle={{
               marginTop: 5,
               borderWidth: 1,
               borderRadius: 10,
               
              }}
            radioButtons={radioButtons}
            layout="row"
            onPress={onPressRadioButton}
          />
          </View>

          <Text style={{paddingHorizontal: 10, marginTop: 10}}>Address</Text>
          <TextInput
            placeholder="Type your address"
            defaultValue={address}
            onChangeText={e => {
              setAddress(e)
            }}
            style={{
              borderWidth: 1,
              height: 100,
              paddingHorizontal: 20,
              marginTop: 10,
              borderRadius: 10,
              width: '100%',
            }}></TextInput>

          <Text style={{paddingHorizontal: 10, marginTop: 10}}>CNIC</Text>
          <TextInput
            placeholder="00000 - 00000 - 0000 -0"
            defaultValue={cnic}
            onChangeText={e => {
              setCnic(e)
            }}
            style={{
              borderWidth: 1,
              height: 50,
              paddingHorizontal: 20,
              marginTop: 10,
              borderRadius: 10,
              width: '100%',
            }}></TextInput>

          <Text style={{paddingHorizontal: 10, marginTop: 10}}>City</Text>
          <TextInput
            placeholder="Select Your city"
            defaultValue={city}
            onChangeText={e => {
              setCity(e)
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
              <Card
                style={{
                  width: 97.94,
                  height: 131.75,
                  borderColor: 'black',
                  borderWidth: 0.2,
                  marginTop: 20,
                }}>
                <Text style={{alignSelf: 'center'}}>CNIC Front</Text>
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
                <Text style={{alignSelf: 'center'}}>CNIC Back</Text>
              <Image source={{uri: phototwo?.path}} style={{
                width: 97.94,
                height: 131.75,
              }}/>
              </Card>
            </TouchableOpacity>
          </View>

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

            <TouchableOpacity onPress={imagePicker3}>
              <Card
                style={{
                  width: 97.94,
                  height: 131.75,
                  borderColor: 'black',
                  borderWidth: 0.2,
                  marginTop: 20,
                }}>
                <Text style={{alignSelf: 'center'}}>License Front</Text>
              <Image source={{uri: photothree?.path}} style={{
                width: 97.94,
                height: 131.75,
              }}/>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={imagePicker4}>
              <Card
                style={{
                  width: 97.94,
                  height: 131.75,
                  borderColor: 'black',
                  borderWidth: 0.2,
                  marginTop: 20,
                }}>
                <Text style={{alignSelf: 'center'}}>Back Front</Text>
              <Image source={{uri: photofour?.path}} style={{
                width: 97.94,
                height: 131.75,
              }}/>
              </Card>
            </TouchableOpacity>
          </View>

          <PrimaryButton
            textColor={'white'}
            title={'Continue'}
            color={'#707070'}
            customStyles={styles.PrimaryButtonCountinue}
            onPress={() => {
              driverRegistration();
              //generatingDriverID();
              //toggleModal();
            }}
          />
          {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.HeaderColour} />
          </View>
          )}
        </View>
      </ScrollView>
    {renderContent()}
    </>
  );
};

const styles = StyleSheet.create({
  PrimaryButton: {
    marginBottom: 10,
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
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});





// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   Pressable,
// //   ScrollView,
// //   KeyboardAvoidingView,
// //   Image,
// //   TouchableOpacity,
// //   TextInput,
// //   Button,
// // } from 'react-native';
// // import {
// //   MainContainer,
// //   AuthHeader,
// //   AuthContainer,
// //   PrimaryInput,
// //   PrimaryButton,
// //   BackHeader,
// //   Loading,
// // } from '../../components';

// // import React from 'react';
// // import {Metrix, NavigationService, Images, Colors} from '../../config';
// // import navigationService from '../../config/navigationService';
// // import {useState, useRef, useCallback} from 'react';
// // import PhoneInput from 'react-native-phone-number-input';
// // import RadioGroup from 'react-native-radio-buttons-group';
// // import {Picker} from '@react-native-picker/picker';
// // // Import Image Picker
// // //import ImagePicker from 'react-native-image-picker';
// // import ImagePicker from 'react-native-image-crop-picker';
// // import {Card} from 'react-native-shadow-cards';
// // import Modal from 'react-native-modal';

// // export const Becomeadriverone = () => {
// //   const [isModalVisible, setModalVisible] = useState(false);

// //   const toggleModal = () => {
// //     setModalVisible(!isModalVisible);
// //   };

// //   const renderContent = () => (

// // <Modal isVisible={isModalVisible}>
// //   <View style={{backgroundColor: 'white', borderRadius: 10}}>
// //     <View
// //       style={{
// //         // borderColor: 'black',
// //         // borderWidth: 1,
// //         height: 50,
// //         backgroundColor: Colors.HeaderColour,
// //         borderTopLeftRadius: 10,
// //         borderTopRightRadius: 10,
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //       }}>
// //       <Text style={{fontSize: 20, fontWeight: 'bold', letterSpacing: 2}}>Congratulations!</Text>
// //     </View>

// //     <Text style={{alignSelf: 'center', lineHeight: 25, letterSpacing: 0.5}}>Congratulations! you have successfully registered your vehicle
// //     </Text>
// //     <PrimaryButton
// //       title="Proceed"
// //       onPress={() => {
// //         navigationService.navigate('LoginScreenFromHaveRide');
// //       }}// toggleModal
// //       customStyles={styles.PrimaryButton}
// //       />
// //   </View>
// // </Modal>
// //   );

// //   const Data = {
// //     image: '',
// //   };

// //   const [phoneNumber, setphoneNumber] = useState('');
// //   const [gender, setGender] = useState('Unknown');
// //   const phoneInput = useRef(null);
// //   const buttonPress = () => {
// //     Alert.alert(phoneNumber);
// //   };

  
// //   const [signupData, setSignupData] = useState(Data);

// //   const [vehicle_name, setVehicle_Name] = useState("");
// //   const [vehicle_brand, setVehicle_Brand] = useState("");
// //   const [vehicle_number, setVehicle_Number] = useState("");
// //   const [vehicle_color, setVehicle_Color] = useState("");
// //   const [photoone, setPhotoURIone] = useState(null);
// //   const [phototwo, setPhotoURItwo] = useState(null);

  
// //   const vehicleRegistration = () => {
// //     const formData = new FormData();
// //     formData.append("vehicle_name", vehicle_name)
// //     formData.append("vehicle_brand", vehicle_brand)
// //     formData.append("vehicle_number", vehicle_number)
// //     formData.append("vehicle_color", vehicle_color)
// //     formData.append("vehicle_license", {
// //       uri: photoone.path,
// //       type: photoone.mime,
// //       name: "image.jpeg",
// //   })
// //     formData.append("vehicle_image", {
// //       uri: phototwo.path,
// //       type: phototwo.mime,
// //       name: "image.jpeg",
// // })

// //   fetch("http://asaanweb.com/pirayo/index.php/Vehicle_Controller/insert_vehicle", {

// //   method: "POST",
// //   body: formData})
// //   .then(async(res) => {
// //     const response = await res.json()
// //     console.log(response)
// //   })

// //   // .then(function (res) {
// //   //   if (res.response.status == "true") {
// //   //     toggleModal()
// //   //     //navigationService.navigate('Becomeadriverfour');
// //   //   } else if (res.response.status == "false") {
// //   //     console.log(res.response.status);
// //   //     showToast('user not found');
// //   //   }

// //   // })
// //   .catch(error => console.log(error));
// // };

// //   const imagePicker = async () => {
// //     try {
// //       const image = await ImagePicker.openPicker({
// //         mediaType: "photo",
// //         cropping: false,
// //       });
// //      // console.log('---------->Image', image);
// //       setPhotoURIone(image);

// //       setSignupData({...signupData, image: image});
// //       // [setPhotoURI];
// //     } catch (err) {
// //       if (err.message !== 'User cancelled image selection') {
// //       }
// //     }
// //   };

// //   const imagePicker2 = async () => {
// //     try {
// //       const imagetwo = await ImagePicker.openPicker({
// //         mediaType: "photo",
// //         cropping: false,
// //       });
// //       console.log('---------->Image', imagetwo);
// //       setPhotoURItwo(imagetwo);
// //       // [setPhotoURI];
// //     } catch (err) {
// //       if (err.message !== 'User cancelled image selection') {
// //       }
// //     }
// //   };
  
  
// //   <View style={{flex: 1}}>
 
// // </View>

 
// //   return (
// //   <>
// //     <View
// //       style={{
// //         height: 90,
// //         borderBottomLeftRadius: 50,
// //         borderBottomRightRadius: 50,
// //         backgroundColor: Colors.HeaderColour,
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //       }}>
// //       <Text
// //         style={{
// //           fontWeight: 'bold',
// //           letterSpacing: 2,
// //           fontSize: 30,
// //         }}>
// //         Become A Driver
// //       </Text>
// //       <Text>Welcome back you've been missed</Text>
// //     </View>
// //     <ScrollView>
// //       <View
// //         style={{
// //           flex: 1,
// //           // borderWidth: 1,
// //           // alignItems: 'center',
// //           justifyContent: 'center',
// //           paddingHorizontal: 20,
// //           margin: 10,
// //         }}>
// //         <Text style={{paddingHorizontal: 10, marginTop: 10}}>
// //           Vehicle brand
// //         </Text>
// //         <TextInput
// //           placeholder="Vehicle brand"
// //           defaultValue={vehicle_name}
// //           onChangeText={e => {
// //             setVehicle_Name(e)
// //           }}
// //           style={{
// //             borderWidth: 1,
// //             height: 50,
// //             paddingHorizontal: 20,
// //             marginTop: 10,
// //             borderRadius: 10,
// //             width: '100%',
// //           }}></TextInput>
// //         <Text style={{paddingHorizontal: 10, marginTop: 10}}>Model year</Text>
// //         <TextInput
// //           placeholder="Model year"
// //           defaultValue={vehicle_brand}
// //           onChangeText={e => {
// //             setVehicle_Brand(e)
// //           }}
// //           style={{
// //             borderWidth: 1,
// //             height: 50,
// //             paddingHorizontal: 20,
// //             marginTop: 10,
// //             borderRadius: 10,
// //             width: '100%',
// //           }}></TextInput>
// //         <Text style={{paddingHorizontal: 10, marginTop: 10}}>
// //           License plate number
// //         </Text>
// //         <TextInput
// //           placeholder="License plate number"
// //           defaultValue={vehicle_number}
// //           onChangeText={e => {
// //             setVehicle_Number(e)
// //           }}
// //           style={{
// //             borderWidth: 1,
// //             height: 50,
// //             paddingHorizontal: 20,
// //             marginTop: 10,
// //             borderRadius: 10,
// //             width: '100%',
// //           }}></TextInput>
// //         {/* <RadioGroup
// //           radioButtons={radioButtons}
// //           onPress={onPressRadioButton}
// //         /> */}
// //         <Text style={{paddingHorizontal: 10, marginTop: 10}}>Color</Text>
// //         <TextInput
// //           placeholder="Red, Yellow, Green"
// //           defaultValue={vehicle_color}
// //           onChangeText={e => {
// //             setVehicle_Color(e)
// //           }}
// //           style={{
// //             borderWidth: 1,
// //             height: 50,
// //             paddingHorizontal: 20,
// //             marginTop: 10,
// //             borderRadius: 10,
// //             width: '100%',
// //           }}></TextInput>

// //         <View
// //           style={{
// //             // borderColor: 'black',
// //             // borderWidth: 1,
// //             height: 160,
// //             marginTop: 20,
// //             paddingHorizontal: 40,
// //             flexDirection: 'row',
// //             justifyContent: 'space-between',
// //           }}>
// //           <TouchableOpacity onPress={imagePicker}>
// //             {/* <Image
// //               source={{uri: photoone?.path}}
// //               style={{
// //                 width: 97.94,
// //                 height: 131.75,
// //                 orderColor: 'black',
// //                 borderWidth: 1,
// //                 marginTop: 20,
// //               }}
// //             /> */}
// //             <Card
// //               style={{
// //                 width: 97.94,
// //                 height: 131.75,
// //                 borderColor: 'black',
// //                 borderWidth: 0.2,
// //                 marginTop: 20,
// //               }}>
// //               <Text style={{alignSelf: 'center'}}>License Platte Image</Text>
// //               <Image source={{uri: photoone?.path}} style={{
// //                 width: 97.94,
// //                 height: 131.75,
// //               }}/>
// //             </Card>
// //           </TouchableOpacity>

// //           <TouchableOpacity onPress={imagePicker2}>
// //             <Card
// //               style={{
// //                 width: 97.94,
// //                 height: 131.75,
// //                 borderColor: 'black',
// //                 borderWidth: 0.2,
// //                 marginTop: 20,
// //               }}>
// //                 <Text style={{alignSelf: 'center'}}>Registration Image</Text>
// //               <Image source={{uri: phototwo?.path}} style={{
// //                 width: 97.94,
// //                 height: 131.75,
// //               }}/>
// //             </Card>
// //           </TouchableOpacity>
// //         </View>

// //         {/* <PrimaryButton title="Show modal" onPress={toggleModal} /> */}
// //         <PrimaryButton
// //           textColor={'white'}
// //           title={'Submit'}
// //           color={'#707070'}
// //           customStyles={styles.PrimaryButtonCountinue}
// //           onPress={() => {
// //             // toggleModal() &&
// //             vehicleRegistration()
// //             //navigationService.navigate('DriverRideTypeScreen');
// //           }}
// //         />
// //       </View>
// //     </ScrollView>
// //   {renderContent()}
// //   </>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   PrimaryButton: {
// //     marginBottom: 15,
// //   },
// //   PrimaryButton2: {
// //     marginBottom: 10,
// //   },
// //   // /////////////////// Country Picker Style

// //   container: {
// //     flex: 1,
// //     // justifyContent: 'center',
// //     // alignItems: 'center',
// //     marginTop: 10,
// //   },
// //   PrimaryButtonCountinue: {
// //     marginTop: 30,
// //   },
// //   phoneContainer: {
// //     height: 50,
// //     width: '100%',
// //     borderColor: 'black',
// //     borderWidth: 1,
// //     borderRadius: 10,
// //     marginTop: 10,
// //   },
// //   button: {
// //     marginTop: 30,
// //     width: '75%',
// //     padding: 10,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: 'green',
// //   },
// //   textInput: {
// //     paddingVertical: 0,
// //   },
// // });


// import {
//   Alert,
//     StyleSheet,
//     Text,
//     View,
//     Pressable,
//     ScrollView,
//     KeyboardAvoidingView,
//     Image,
//     TouchableOpacity,
//     PermissionsAndroid,
//     TextInput,
//     Button,
//   } from 'react-native';
//   import {
//     MainContainer,
//     AuthHeader,
//     AuthContainer,
//     PrimaryInput,
//     PrimaryButton,
//     BackHeader,
//     Loading,
//   } from '../../components';
  
//   import React from 'react';
//   import {Metrix, NavigationService, Images, Colors} from '../../config';
//   import navigationService from '../../config/navigationService';
//   import {useState, useRef, useCallback} from 'react';
//   import AsyncStorage from '@react-native-async-storage/async-storage';
//   import PhoneInput from 'react-native-phone-number-input';
//   import RadioGroup from 'react-native-radio-buttons-group';
//   import ImagePicker, { cleanSingle } from 'react-native-image-crop-picker';
//   import {Picker} from '@react-native-picker/picker';
//   // import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//   import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
//   } from 'react-native-responsive-screen';
//   import {Card} from 'react-native-shadow-cards';
//   import Modal from 'react-native-modal';
  
  
//   export const Becomeadriverone = () => {
    
//     const [image1,setImage1]=useState([])
//     const [image2,setImage2]=useState([])
//     const [image3,setImage3]=useState([])
//     const [image4,setImage4]=useState([])
//    const onSelectImage1 = async () => {
  
//   Alert.alert(
//   'Upload Picture',
//   'Choose an option',
//   [
//   { text: 'Camera', onPress: onCamera1 },
//   { text: 'Gallery', onPress: onGallery1 },
//   { text: 'Cancel', onPress: () => { } }
//   ]
//   )
//   }
  
//   const onCamera1 = () => {
//   ImagePicker.openCamera({
//   width: wp('90%'),
//   height: hp('85%'),
//   cropping: true,
  
//   includeBase64:true,
//   }).then(image => {
//   setImage1(image)
  
  
//   });
//   }
  
//   const onGallery1 = () => {
  
//   ImagePicker.openPicker({
//   width:wp('90%'),
//   height:hp('80%'),
//   cropping: true,
//   includeBase64:true,
//   }).then(image => {
//   setImage1(image)
  
//   });
//   }
//    const onSelectImage2 = async () => {
  
//   Alert.alert(
//   'Upload Picture',
//   'Choose an option',
//   [
//   { text: 'Camera', onPress: onCamera2 },
//   { text: 'Gallery', onPress: onGallery2 },
//   { text: 'Cancel', onPress: () => { } }
//   ]
//   )
//   }
  
//   const onCamera2 = () => {
//   ImagePicker.openCamera({
//   width: wp('90%'),
//   height: hp('85%'),
//   cropping: true,
  
//   includeBase64:true,
//   }).then(image => {
//   setImage2(image)
  
  
//   });
//   }
  
//   const onGallery2 = () => {
  
//   ImagePicker.openPicker({
//   width:wp('90%'),
//   height:hp('80%'),
//   cropping: true,
//   includeBase64:true,
//   }).then(image => {
//   setImage2(image)
  
//   });
//   }
//    const onSelectImage3 = async () => {
  
//   Alert.alert(
//   'Upload Picture',
//   'Choose an option',
//   [
//   { text: 'Camera', onPress: onCamera3 },
//   { text: 'Gallery', onPress: onGallery3 },
//   { text: 'Cancel', onPress: () => { } }
//   ]
//   )
//   }
  
//   const onCamera3 = () => {
//   ImagePicker.openCamera({
//   width: wp('90%'),
//   height: hp('85%'),
//   cropping: true,
  
//   includeBase64:true,
//   }).then(image => {
//   setImage3(image)
  
  
//   });
//   }
  
//   const onGallery3 = () => {
  
//   ImagePicker.openPicker({
//   width:wp('90%'),
//   height:hp('80%'),
//   cropping: true,
//   includeBase64:true,
//   }).then(image => {
//   setImage3(image)
  
//   });
//   }
//    const onSelectImage4 = async () => {
  
//   Alert.alert(
//   'Upload Picture',
//   'Choose an option',
//   [
//   { text: 'Camera', onPress: onCamera4 },
//   { text: 'Gallery', onPress: onGallery4 },
//   { text: 'Cancel', onPress: () => { } }
//   ]
//   )
//   }
  
//   const onCamera4 = () => {
//   ImagePicker.openCamera({
//   width: wp('90%'),
//   height: hp('85%'),
//   cropping: true,
  
//   includeBase64:true,
//   }).then(image => {
//   setImage4(image)
  
  
//   });
//   }
  
//   const onGallery4 = () => {
  
//   ImagePicker.openPicker({
//   width:wp('90%'),
//   height:hp('80%'),
//   cropping: true,
//   includeBase64:true,
//   }).then(image => {
//   setImage4(image)
  
//   });
//   }


//     const [isModalVisible, setModalVisible] = useState(false);
  
//     const toggleModal = () => {
//       setModalVisible(!isModalVisible);
//     };
  
//     const renderContent = () => (
  
//       <Modal isVisible={isModalVisible}>
//       <View style={{backgroundColor: 'white', borderRadius: 10}}>
//         <View
//           style={{
//             // borderColor: 'black',
//             // borderWidth: 1,
//             height: 50,
//             backgroundColor: Colors.HeaderColour,
//             borderTopLeftRadius: 10,
//             borderTopRightRadius: 10,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Text style={{fontSize: 20, fontWeight: 'bold', letterSpacing: 2}}>Congratulations!</Text>
//         </View>
  
//        <Text style={{alignSelf: 'center', lineHeight: 25, letterSpacing: 0.5}}>we have recieved your driver, we will verify your details documents
//              and will update you soon
//        </Text>
//         <PrimaryButton
//           title="Proceed"
//           onPress={() => {
//             setTimeout(() => {
//               navigationService.navigate('Becomeadriverthree');
//             }, 1000);
            
//           }}// toggleModal
//           customStyles={styles.PrimaryButton}
//           />
//       </View>
//     </Modal>
//     );
  
//     const Data = {
//       image: '',
//     };
  
  
//     const [phoneNumber, setphoneNumber] = useState('');
//     // const [gender, setGender] = useState('Unknown');
//     const phoneInput = useRef(null);
//     const buttonPress = () => {
//       Alert.alert(phoneNumber);
//     };
  
//     const radioButtonsData = [
//       {
//         id: '1', // acts as primary key, should be unique and non-empty string
//         label: 'Male',
//         value: 'option1',
//        //color: 'Colors.HeaderColour',
  
//       },
//       {
//         id: '2',
//         label: 'Female',
//         value: 'option2',
//         //color: 'Colors.HeaderColour',
  
//       },
//     ];
  
//     const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  
//     function onPressRadioButton(radioButtonsArray) {
//       setRadioButtons(radioButtonsArray);
//     };
  
//     const [fullname, setFullName] = useState('');
//     const [last_name, setLast_Name] = useState('');
//     const [contactnumber, setContactnNumber] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState(null);
//    // const [gender, setGender] = useState(null);
//     const [address, setAddress] = useState('');
//     const [cnic, setCnic] = useState('');
//     const [city, setCity] = useState('');
//     const [photoone, setPhotoURIone] = useState(null);
//     const [phototwo, setPhotoURItwo] = useState(null);
//     const [photothree, setPhotoURIthree] = useState(null);
//     const [photofour, setPhotoURIFour] = useState(null);
//    // const [generateDriverId, setGenerateDriverId] = useState('');
  
//     const driverRegistration = () => {
//       const formData = new FormData();
//       formData.append("fullname", fullname);
//       formData.append("last_name", last_name);
//       formData.append("contactnumber", contactnumber);
//       formData.append("email", email);
//       formData.append("password", password);
//       formData.append("gender", 'male');
//       formData.append("type", 'driver');
//       formData.append("address", address);
//       formData.append("cnic", cnic);
//       formData.append("city", city);
//       formData.append("cnic_front",image1 );
//       formData.append("cnic_back",image2);
//       formData.append("license_front",image3);
//       formData.append("license_back", image4);
  
  
//     fetch('http://asaanweb.com/pirayo/index.php/Driver_Controller/driver_signup', {
  
//     method: 'POST',
//     body: formData
  
//   })
    
//     .then(function(res){
//       res.json().then((res)=>{
//        console.log(res)
//        AsyncStorage.setItem('resId', JSON.stringify(res.response.id))
//       //driverID.set('driver.id', res.response.id)
        
//       if(res.response.status){
//         console.log('in>>>>>>>>>>', res.response.status)
//         navigationService.navigate('Becomeadriverthree');
//       }
//       })
//     })
  
//   //   .then(async(res) => {
//   //     if(res){
//   //     // const response = await res.json()
//   //     console.log('in')
//   //     }
  
//   // })
//     .catch(error => console.log('error>>>>>>>',  error));
//   };
    
//     // .then(function (res) {
  
//     //   if (res.response.status == 'true') {
//     //     console.log(res)
//     //     setGenerateDriverId(res.response.id)
//     //     navigationService.navigate('Becomeadriverthree');
//     //   } else if (res.response.status == 'false') {
//     //     console.log(res.response.status);
//     //     showToast('user not found');
//     //   }
  
//     // })
//   //   .catch(error => console.log(error));
//   // };
  
//   // const generatingDriverID = () => {
//   //   try {
//   //     setTimeout(() => {
        
//   //       AsyncStorage.setItem('generateDriverId',JSON.stringify(generateDriverId))
  
//   //     }, 5000);
      
//   //   }
//   //   catch (error) {
//   //     console.log('driver id not generating error>>>>>>>>>>>>>', error);
//   //   }
//   // }
  
  
  
//     const imagePicker = async () => {
//       try {
//         const image = await ImagePicker.openPicker({
//           mediaType: 'photo',
//           cropping: false,
//         });
//         console.log('---------->Image', image);
//         setPhotoURIone(image);
  
//         setSignupData({...signupData, image: image});
//         // [setPhotoURI];
//       } catch (err) {
//         if (err.message !== 'User cancelled image selection') {
//         }
//       }
//     };
  
  
//     const imagePicker2 = async () => {
//       try {
//         const image = await ImagePicker.openPicker({
//           mediaType: 'photo',
//           cropping: false,
//         });
//         console.log('---------->Image', image);
//         setPhotoURItwo(image);
//         // [setPhotoURI];
//       } catch (err) {
//         if (err.message !== 'User cancelled image selection') {
//         }
//       }
//     };
  
//     const imagePicker3 = async () => {
//       try {
//         const image = await ImagePicker.openPicker({
//           mediaType: 'photo',
//           cropping: false,
//         });
//         console.log('---------->Image', image);
//         setPhotoURIthree(image);
//         // [setPhotoURI];
//       } catch (err) {
//         if (err.message !== 'User cancelled image selection') {
//         }
//       }
//     };
  
//     const imagePicker4 = async () => {
//       try {
//         const image = await ImagePicker.openPicker({
//           mediaType: 'photo',
//           cropping: false,
//         });
//         console.log('---------->Image', image);
//         setPhotoURIFour(image);
//         // [setPhotoURI];
//       } catch (err) {
//         if (err.message !== 'User cancelled image selection') {
//         }
//       }
//     };
    

//     return (
//       <>
//         <View
//           style={{
//             height: 105,
//             borderBottomLeftRadius: 50,
//             borderBottomRightRadius: 50,
//             backgroundColor: Colors.HeaderColour,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Text
//             style={{
//               fontSize: 35,
//             }}>
//             Become A Driver
//           </Text>
//           <Text>Welcome back you've been missed</Text>
//         </View>
//         <ScrollView>
//           <View
//             style={{
//               flex: 1,
//               // borderWidth: 1,
//               // alignItems: 'center',
//               justifyContent: 'center',
//               paddingHorizontal: 20,
//               margin: 10,
//             }}>
//             <Text style={{paddingHorizontal: 10, marginTop: 10}}>First Name</Text>
//             <TextInput
//               placeholder="Enter first"
//               defaultValue={fullname}
//               onChangeText={e => {
//                 setFullName(e)
//               }}
//               style={{
//                 borderWidth: 1,
//                 height: 50,
//                 paddingHorizontal: 20,
//                 marginTop: 10,
//                 borderRadius: 10,
//                 width: '100%',
//               }}>
//               </TextInput>
  
//             <Text style={{paddingHorizontal: 10, marginTop: 10}}>Last Name</Text>
//             <TextInput
//               placeholder="Enter last name"
//               defaultValue={last_name}
//               onChangeText={e => {
//                 setLast_Name(e)
//               }}
//               style={{
//                 borderWidth: 1,
//                 height: 50,
//                 paddingHorizontal: 20,
//                 marginTop: 10,
//                 borderRadius: 10,
//                 width: '100%',
//               }}></TextInput>
//             <View style={styles.container}>
  
//               <Text style={{paddingHorizontal: 10}}>Contact Number</Text>
//               <PhoneInput
//                 ref={phoneInput}
//                 defaultValue={contactnumber}
//                 defaultCode="PK"
//                 layout="first"
//                 withShadow
//                 autoFocus
//                 containerStyle={styles.phoneContainer}
//                 textContainerStyle={styles.textInput}
//                 onChangeText={e => {
//                   setContactnNumber(e)
//                 }}
//               />
//               {/* <Pressable style={styles.button} onPress={() => buttonPress()}>
//               <Text style={styles.continueText}>Get Phone Number</Text>
//             </Pressable> */}
//             </View>
  
//             <Text style={{paddingHorizontal: 10, marginTop: 10}}>Email</Text>
//             <TextInput
//               placeholder="someone@example.com"
//               defaultValue={email}
//               onChangeText={e => {
//                 setEmail(e)
//               }}
//               style={{
//                 borderWidth: 1,
//                 height: 50,
//                 paddingHorizontal: 20,
//                 marginTop: 10,
//                 borderRadius: 10,
//                 width: '100%',
//               }}></TextInput>
  
//             <Text style={{paddingHorizontal: 10, marginTop: 10}}>Password</Text>
//             <TextInput
//               placeholder="name112"
//               secureTextEntry
//               defaultValue={password}
//               onChangeText={e => {
//                 setPassword(e)
//               }}
//               style={{
//                 borderWidth: 1,
//                 height: 50,
//                 paddingHorizontal: 20,
//                 marginTop: 10,
//                 borderRadius: 10,
//                 width: '100%',
//               }}></TextInput>
  
//             <Text style={{paddingHorizontal: 0, marginTop: 10}}>Select Gender</Text>
//             <View style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//             <RadioGroup
//               containerStyle={{
//                  marginTop: 5,
//                  borderWidth: 1,
//                  borderRadius: 10,
                 
//                 }}
//               radioButtons={radioButtons}
//               layout="row"
//               onPress={onPressRadioButton}
//             />
//             </View>
  
//             <Text style={{paddingHorizontal: 10, marginTop: 10}}>Address</Text>
//             <TextInput
//               placeholder="Type your address"
//               defaultValue={address}
//               onChangeText={e => {
//                 setAddress(e)
//               }}
//               style={{
//                 borderWidth: 1,
//                 height: 100,
//                 paddingHorizontal: 20,
//                 marginTop: 10,
//                 borderRadius: 10,
//                 width: '100%',
//               }}></TextInput>
  
//             <Text style={{paddingHorizontal: 10, marginTop: 10}}>CNIC</Text>
//             <TextInput
//               placeholder="00000 - 00000 - 0000 -0"
//               defaultValue={cnic}
//               onChangeText={e => {
//                 setCnic(e)
//               }}
//               style={{
//                 borderWidth: 1,
//                 height: 50,
//                 paddingHorizontal: 20,
//                 marginTop: 10,
//                 borderRadius: 10,
//                 width: '100%',
//               }}></TextInput>
  
//             <Text style={{paddingHorizontal: 10, marginTop: 10}}>City</Text>
//             <TextInput
//               placeholder="Select Your city"
//               defaultValue={city}
//               onChangeText={e => {
//                 setCity(e)
//               }}
//               style={{
//                 borderWidth: 1,
//                 height: 50,
//                 paddingHorizontal: 20,
//                 marginTop: 10,
//                 borderRadius: 10,
//                 width: '100%',
//               }}></TextInput>
  
//             <View
//               style={{
//                 // borderColor: 'black',
//                 // borderWidth: 1,
//                 height: 160,
//                 marginTop: 20,
//                 paddingHorizontal: 40,
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//               }}>
  
//               <TouchableOpacity onPress={onSelectImage1}>
//                 <Card
//                   style={{
//                     width: 97.94,
//                     height: 131.75,
//                     borderColor: 'black',
//                     borderWidth: 0.2,
//                     marginTop: 20,
//                   }}>
//                   <Text style={{alignSelf: 'center'}}>CNIC Front</Text>
//                 <Image source={{uri: photoone?.path}} style={{
//                   width: 97.94,
//                   height: 131.75,
//                 }}/>
//                 </Card>
//               </TouchableOpacity>
  
//               <TouchableOpacity onPress={onSelectImage2}>
//                 <Card
//                   style={{
//                     width: 97.94,
//                     height: 131.75,
//                     borderColor: 'black',
//                     borderWidth: 0.2,
//                     marginTop: 20,
//                   }}>
//                   <Text style={{alignSelf: 'center'}}>CNIC Back</Text>
//                 <Image source={{uri: phototwo?.path}} style={{
//                   width: 97.94,
//                   height: 131.75,
//                 }}/>
//                 </Card>
//               </TouchableOpacity>
//             </View>
  
//             <View
//               style={{
//                 // borderColor: 'black',
//                 // borderWidth: 1,
//                 height: 160,
//                 marginTop: 20,
//                 paddingHorizontal: 40,
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//               }}>
  
//               <TouchableOpacity onPress={onSelectImage3}>
//                 <Card
//                   style={{
//                     width: 97.94,
//                     height: 131.75,
//                     borderColor: 'black',
//                     borderWidth: 0.2,
//                     marginTop: 20,
//                   }}>
//                   <Text style={{alignSelf: 'center'}}>License Front</Text>
//                 <Image source={{uri: photothree?.path}} style={{
//                   width: 97.94,
//                   height: 131.75,
//                 }}/>
//                 </Card>
//               </TouchableOpacity>
  
//               <TouchableOpacity onPress={onSelectImage4}>
//                 <Card
//                   style={{
//                     width: 97.94,
//                     height: 131.75,
//                     borderColor: 'black',
//                     borderWidth: 0.2,
//                     marginTop: 20,
//                   }}>
//                   <Text style={{alignSelf: 'center'}}>Back Front</Text>
//                 <Image source={{uri: photofour?.path}} style={{
//                   width: 97.94,
//                   height: 131.75,
//                 }}/>
//                 </Card>
//               </TouchableOpacity>
//             </View>
  
//             <PrimaryButton
//               textColor={'white'}
//               title={'Continue'}
//               color={'#707070'}
//               customStyles={styles.PrimaryButtonCountinue}
//               onPress={() => {
//                 requestCameraPermission()
//                 //driverRegistration()
//               // toggleModal();
//             // navigationService.navigate('Becomeadriverthree');
//               }}
//             />
//           </View>
//         </ScrollView>
//       {renderContent()}
//       </>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     PrimaryButton: {
//       marginBottom: 10,
//     },
//     PrimaryButton2: {
//       marginBottom: 10,
//     },
//     // /////////////////// Country Picker Style
  
//     container: {
//       flex: 1,
//       // justifyContent: 'center',
//       // alignItems: 'center',
//       marginTop: 10,
//     },
//     PrimaryButtonCountinue: {
//       marginTop: 30,
//     },
//     phoneContainer: {
//       height: 50,
//       width: '100%',
//       borderColor: 'black',
//       borderWidth: 1,
//       borderRadius: 10,
//       marginTop: 10,
//     },
//     button: {
//       marginTop: 30,
//       width: '75%',
//       padding: 10,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'green',
//     },
//     textInput: {
//       paddingVertical: 0,
//     },
//   });
  
  
  
  
  
  // import {
  //   StyleSheet,
  //   Text,
  //   View,
  //   Pressable,
  //   ScrollView,
  //   KeyboardAvoidingView,
  //   Image,
  //   TouchableOpacity,
  //   TextInput,
  //   Button,
  // } from 'react-native';
  // import {
  //   MainContainer,
  //   AuthHeader,
  //   AuthContainer,
  //   PrimaryInput,
  //   PrimaryButton,
  //   BackHeader,
  //   Loading,
  // } from '../../components';
  
  // import React from 'react';
  // import {Metrix, NavigationService, Images, Colors} from '../../config';
  // import navigationService from '../../config/navigationService';
  // import {useState, useRef, useCallback} from 'react';
  // import PhoneInput from 'react-native-phone-number-input';
  // import RadioGroup from 'react-native-radio-buttons-group';
  // import {Picker} from '@react-native-picker/picker';
  // // Import Image Picker
  // //import ImagePicker from 'react-native-image-picker';
  // import ImagePicker from 'react-native-image-crop-picker';
  // import {Card} from 'react-native-shadow-cards';
  // import Modal from 'react-native-modal';
  
  // export const Becomeadriverone = () => {
  //   const [isModalVisible, setModalVisible] = useState(false);
  
  //   const toggleModal = () => {
  //     setModalVisible(!isModalVisible);
  //   };
  
  //   const renderContent = () => (
  
  // <Modal isVisible={isModalVisible}>
  //   <View style={{backgroundColor: 'white', borderRadius: 10}}>
  //     <View
  //       style={{
  //         // borderColor: 'black',
  //         // borderWidth: 1,
  //         height: 50,
  //         backgroundColor: Colors.HeaderColour,
  //         borderTopLeftRadius: 10,
  //         borderTopRightRadius: 10,
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}>
  //       <Text style={{fontSize: 20, fontWeight: 'bold', letterSpacing: 2}}>Congratulations!</Text>
  //     </View>
  
  //     <Text style={{alignSelf: 'center', lineHeight: 25, letterSpacing: 0.5}}>Congratulations! you have successfully registered your vehicle
  //     </Text>
  //     <PrimaryButton
  //       title="Proceed"
  //       onPress={() => {
  //         navigationService.navigate('LoginScreenFromHaveRide');
  //       }}// toggleModal
  //       customStyles={styles.PrimaryButton}
  //       />
  //   </View>
  // </Modal>
  //   );
  
  //   const Data = {
  //     image: '',
  //   };
  
  //   const [phoneNumber, setphoneNumber] = useState('');
  //   const [gender, setGender] = useState('Unknown');
  //   const phoneInput = useRef(null);
  //   const buttonPress = () => {
  //     Alert.alert(phoneNumber);
  //   };
  
    
  //   const [signupData, setSignupData] = useState(Data);
  
  //   const [vehicle_name, setVehicle_Name] = useState("");
  //   const [vehicle_brand, setVehicle_Brand] = useState("");
  //   const [vehicle_number, setVehicle_Number] = useState("");
  //   const [vehicle_color, setVehicle_Color] = useState("");
  //   const [photoone, setPhotoURIone] = useState(null);
  //   const [phototwo, setPhotoURItwo] = useState(null);
  
    
  //   const vehicleRegistration = () => {
  //     const formData = new FormData();
  //     formData.append("vehicle_name", vehicle_name)
  //     formData.append("vehicle_brand", vehicle_brand)
  //     formData.append("vehicle_number", vehicle_number)
  //     formData.append("vehicle_color", vehicle_color)
  //     formData.append("vehicle_license", {
  //       uri: photoone.path,
  //       type: photoone.mime,
  //       name: "image.jpeg",
  //   })
  //     formData.append("vehicle_image", {
  //       uri: phototwo.path,
  //       type: phototwo.mime,
  //       name: "image.jpeg",
  // })
  
  //   fetch("http://asaanweb.com/pirayo/index.php/Vehicle_Controller/insert_vehicle", {
  
  //   method: "POST",
  //   body: formData})
  //   .then(async(res) => {
  //     const response = await res.json()
  //     console.log(response)
  //   })
  
  //   // .then(function (res) {
  //   //   if (res.response.status == "true") {
  //   //     toggleModal()
  //   //     //navigationService.navigate('Becomeadriverfour');
  //   //   } else if (res.response.status == "false") {
  //   //     console.log(res.response.status);
  //   //     showToast('user not found');
  //   //   }
  
  //   // })
  //   .catch(error => console.log(error));
  // };
  
  //   const imagePicker = async () => {
  //     try {
  //       const image = await ImagePicker.openPicker({
  //         mediaType: "photo",
  //         cropping: false,
  //       });
  //      // console.log('---------->Image', image);
  //       setPhotoURIone(image);
  
  //       setSignupData({...signupData, image: image});
  //       // [setPhotoURI];
  //     } catch (err) {
  //       if (err.message !== 'User cancelled image selection') {
  //       }
  //     }
  //   };
  
  //   const imagePicker2 = async () => {
  //     try {
  //       const imagetwo = await ImagePicker.openPicker({
  //         mediaType: "photo",
  //         cropping: false,
  //       });
  //       console.log('---------->Image', imagetwo);
  //       setPhotoURItwo(imagetwo);
  //       // [setPhotoURI];
  //     } catch (err) {
  //       if (err.message !== 'User cancelled image selection') {
  //       }
  //     }
  //   };
    
    
  //   <View style={{flex: 1}}>
   
  // </View>
  
   
  //   return (
  //   <>
  //     <View
  //       style={{
  //         height: 90,
  //         borderBottomLeftRadius: 50,
  //         borderBottomRightRadius: 50,
  //         backgroundColor: Colors.HeaderColour,
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}>
  //       <Text
  //         style={{
  //           fontWeight: 'bold',
  //           letterSpacing: 2,
  //           fontSize: 30,
  //         }}>
  //         Become A Driver
  //       </Text>
  //       <Text>Welcome back you've been missed</Text>
  //     </View>
  //     <ScrollView>
  //       <View
  //         style={{
  //           flex: 1,
  //           // borderWidth: 1,
  //           // alignItems: 'center',
  //           justifyContent: 'center',
  //           paddingHorizontal: 20,
  //           margin: 10,
  //         }}>
  //         <Text style={{paddingHorizontal: 10, marginTop: 10}}>
  //           Vehicle brand
  //         </Text>
  //         <TextInput
  //           placeholder="Vehicle brand"
  //           defaultValue={vehicle_name}
  //           onChangeText={e => {
  //             setVehicle_Name(e)
  //           }}
  //           style={{
  //             borderWidth: 1,
  //             height: 50,
  //             paddingHorizontal: 20,
  //             marginTop: 10,
  //             borderRadius: 10,
  //             width: '100%',
  //           }}></TextInput>
  //         <Text style={{paddingHorizontal: 10, marginTop: 10}}>Model year</Text>
  //         <TextInput
  //           placeholder="Model year"
  //           defaultValue={vehicle_brand}
  //           onChangeText={e => {
  //             setVehicle_Brand(e)
  //           }}
  //           style={{
  //             borderWidth: 1,
  //             height: 50,
  //             paddingHorizontal: 20,
  //             marginTop: 10,
  //             borderRadius: 10,
  //             width: '100%',
  //           }}></TextInput>
  //         <Text style={{paddingHorizontal: 10, marginTop: 10}}>
  //           License plate number
  //         </Text>
  //         <TextInput
  //           placeholder="License plate number"
  //           defaultValue={vehicle_number}
  //           onChangeText={e => {
  //             setVehicle_Number(e)
  //           }}
  //           style={{
  //             borderWidth: 1,
  //             height: 50,
  //             paddingHorizontal: 20,
  //             marginTop: 10,
  //             borderRadius: 10,
  //             width: '100%',
  //           }}></TextInput>
  //         {/* <RadioGroup
  //           radioButtons={radioButtons}
  //           onPress={onPressRadioButton}
  //         /> */}
  //         <Text style={{paddingHorizontal: 10, marginTop: 10}}>Color</Text>
  //         <TextInput
  //           placeholder="Red, Yellow, Green"
  //           defaultValue={vehicle_color}
  //           onChangeText={e => {
  //             setVehicle_Color(e)
  //           }}
  //           style={{
  //             borderWidth: 1,
  //             height: 50,
  //             paddingHorizontal: 20,
  //             marginTop: 10,
  //             borderRadius: 10,
  //             width: '100%',
  //           }}></TextInput>
  
  //         <View
  //           style={{
  //             // borderColor: 'black',
  //             // borderWidth: 1,
  //             height: 160,
  //             marginTop: 20,
  //             paddingHorizontal: 40,
  //             flexDirection: 'row',
  //             justifyContent: 'space-between',
  //           }}>
  //           <TouchableOpacity onPress={imagePicker}>
  //             {/* <Image
  //               source={{uri: photoone?.path}}
  //               style={{
  //                 width: 97.94,
  //                 height: 131.75,
  //                 orderColor: 'black',
  //                 borderWidth: 1,
  //                 marginTop: 20,
  //               }}
  //             /> */}
  //             <Card
  //               style={{
  //                 width: 97.94,
  //                 height: 131.75,
  //                 borderColor: 'black',
  //                 borderWidth: 0.2,
  //                 marginTop: 20,
  //               }}>
  //               <Text style={{alignSelf: 'center'}}>License Platte Image</Text>
  //               <Image source={{uri: photoone?.path}} style={{
  //                 width: 97.94,
  //                 height: 131.75,
  //               }}/>
  //             </Card>
  //           </TouchableOpacity>
  
  //           <TouchableOpacity onPress={imagePicker2}>
  //             <Card
  //               style={{
  //                 width: 97.94,
  //                 height: 131.75,
  //                 borderColor: 'black',
  //                 borderWidth: 0.2,
  //                 marginTop: 20,
  //               }}>
  //                 <Text style={{alignSelf: 'center'}}>Registration Image</Text>
  //               <Image source={{uri: phototwo?.path}} style={{
  //                 width: 97.94,
  //                 height: 131.75,
  //               }}/>
  //             </Card>
  //           </TouchableOpacity>
  //         </View>
  
  //         {/* <PrimaryButton title="Show modal" onPress={toggleModal} /> */}
  //         <PrimaryButton
  //           textColor={'white'}
  //           title={'Submit'}
  //           color={'#707070'}
  //           customStyles={styles.PrimaryButtonCountinue}
  //           onPress={() => {
  //             // toggleModal() &&
  //             vehicleRegistration()
  //             //navigationService.navigate('DriverRideTypeScreen');
  //           }}
  //         />
  //       </View>
  //     </ScrollView>
  //   {renderContent()}
  //   </>
  //   );
  // };
  
  // const styles = StyleSheet.create({
  //   PrimaryButton: {
  //     marginBottom: 15,
  //   },
  //   PrimaryButton2: {
  //     marginBottom: 10,
  //   },
  //   // /////////////////// Country Picker Style
  
  //   container: {
  //     flex: 1,
  //     // justifyContent: 'center',
  //     // alignItems: 'center',
  //     marginTop: 10,
  //   },
  //   PrimaryButtonCountinue: {
  //     marginTop: 30,
  //   },
  //   phoneContainer: {
  //     height: 50,
  //     width: '100%',
  //     borderColor: 'black',
  //     borderWidth: 1,
  //     borderRadius: 10,
  //     marginTop: 10,
  //   },
  //   button: {
  //     marginTop: 30,
  //     width: '75%',
  //     padding: 10,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: 'green',
  //   },
  //   textInput: {
  //     paddingVertical: 0,
  //   },
  // });
  