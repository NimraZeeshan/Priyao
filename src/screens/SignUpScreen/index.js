import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  imagePicker,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';

import React from 'react';
import axios from 'axios';


import {
  MainContainer,
  AuthHeader,
  AuthContainer,
  PrimaryInput,
  PrimaryButton,
  BackHeader,
  Loading,
} from '../../components';
import {CustomText} from '../../components';
import {Metrix, NavigationService, Images, Colors} from '../../config';
import CheckBox from '@react-native-community/checkbox';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import {useState, useRef} from 'react';
import {showToast} from '../../config/utills';
import {userSignup} from '../../services/signup/signup';
import navigationService from '../../config/navigationService';


export const SignupScreen = () => {

  // const sign_up_data = {
  //   image: '',
  //   name: '',
  //   email: '',
  //   phoneNumber: '',
  //   password: '',
  //   retypepassword: '',
  // };
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [signupData, setSignupData] = useState(sign_up_data);
  // const [showPass, setShowPass] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  // const [showRePass, setShowRePass] = useState(true);

  
  const phoneInput = useRef(null);
  // const buttonPress = () => {
  //   Alert.alert(phoneNumber);
  // };
  const [isSelected, setSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const imagePicker = async () => {
  //   try {
  //     const image = await ImagePicker.openPicker({
  //       mediaType: "photo",
  //       cropping: false,
  //     });
  //     console.log("---------->Image", image);
  //     setSelectedImage(image);
  //     setSignupData({ ...signupData, image: image });
  //     // if (_.isEmpty(image?.path)) {
  //     //   alert("Upload image field required.");
  //     //   return;
  //     // } else {
  //     //   const body = new FormData();
  //     //   body.append("file", {
  //     //     uri: image?.path,
  //     //     name: image?.mime,
  //     //     type: image?.mime,
  //     //   });

  //     //   setIsLoading(true);

  //     //   uploadProfilePic(body)
  //     //     .then((res) => {
  //     //       setIsLoading(false);
  //     //       getUserDetails(userData?.token);
  //     //       alert("Image is uploaded please save it.");
  //     //     })
  //     //     .catch((err) => {
  //     //       setIsLoading(false);
  //     //       alert("Something went wrong please contact to admin.");
  //     //     });
  //     // }
  //   } catch (err) {
  //     setIsLoading(false);

  //     if (err.message !== "User cancelled image selection") {
  //     }
  //   }
  // };

  // const Register = () => {
  //   if (signupData.name == "") {
  //     showToast("Please add name first.");
  //     return;
  //   } else if (signupData.email == "") {
  //     showToast("Please add email first.");
  //     return;
  //   } else if (signupData.phoneNumber == "") {
  //     showToast("Please add phone number first");
  //     return;
  //   } else if (signupData.password == "") {
  //     showToast("Please add password first.");
  //     return;
  //   } else {
  //     let formdata = new FormData();
  //     formdata.append("userImage",{uri: selectedImage.sourceURL, name: selectedImage?.filename, type: selectedImage?.mime});
  //     formdata.append("name", signupData.name);
  //     formdata.append("contactNo", signupData.phoneNumber);
  //     formdata.append("email", signupData.email);
  //     formdata.append("password", signupData.password);
  //     formdata.append("confirmPassword", signupData.retypepassword);
  //     formdata.append("fcm", "123213123123123");

  //     // console.log("user--", formdata);

  //     setIsLoading(true);
  //     userSignup(formdata)
  //       .then((res) => {
  //         console.log("res-- sign up", res?.data);
  //         setIsLoading(false);
  //         NavigationService.navigate("OTPScreen", { from: "RegisterScreen" ,item: res?.data});
  //       })
  //       .catch((error) => {
  //         setIsLoading(false);
  //         showToast(`${error?.response?.data?.msg}` || `${error}`);
  //       });
  //   }
  // };
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactnumber, setphoneNumber] = useState('');
  const [generateUserId, setGenerateUserId] = useState('');


  const signupHandler = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('contactnumber', contactnumber);
    formData.append('type', 'user');
  
  fetch('http://asaanweb.com/pirayo/index.php/Pirayo_Controller/insertdata', {
  
    method: 'POST',
    body: formData})
    .then(function(res){
      res.json().then((respo)=>{
  
      AsyncStorage.setItem('UserId', JSON.stringify(respo.response.id))
      if(respo.response.status  === "true"){
        setIsLoading(false);
        console.log('in console>>>>>>>>>>>', respo)
        if (respo.response.id) {
            console.log('>>>>>>>>>>>>>>>>>>>>>UserID ', respo.response.id)
            navigationService.navigate('LoginScreen');
        }
      }
      })
    })
  
    .catch(error => console.log(error));
    setTimeout(() => {
      
    }, 2000);
  
  

};
// AsyncStorage.getItem('UserId').then((res)=>{
//   //console.log('async>>>>>>>>>>>>',res);
// });

// storage.clearAll()


  //   axios({
  //   url: "http://asaanweb.com/pirayo/index.php/Pirayo_Controller/insertdata",
  //   method: "POST",
  //   obj: formData,
  //   headers: { 
  //     Accept: 'application/json',
  //     "Content-Type": "multipart/form-data" },
  // })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (response) {
  //     console.log(response);
  //   });

  // const abc = () => {
  //   try {
  //     setTimeout(() => {
        
  //       AsyncStorage.getItem('generateUserId').then((res)=>{console.log(res)})
  
  //     }, 7000);
      
  //   }
  //   catch (error) {
  //     console.log('driver id not generating error>>>>>>>>>>>>>', error);
  //   }
  // }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          height: 100,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: Colors.HeaderColour,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{
              fontSize: 29,
              fontWeight: 'bold',
              letterSpacing: 2,
        }}>Register</Text>
      </View>
      <View
        style={{
          flex: 1,
          // borderColor: 'black',
          // borderWidth: 1,
          paddingHorizontal: 20,
        }}>
        <View style={{marginTop: 20}}>
          <Text style={{paddingHorizontal: 10}}>Full Name</Text>
          <TextInput
            placeholder="Enter Username"
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
            }}></TextInput>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{paddingHorizontal: 10}}>Password</Text>
          <TextInput
            secureTextEntry
            placeholder="Enter Password"
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
        </View>
        <View style={{marginTop: 20}}>
          <TextInput
            placeholder="Re type password"
            style={{
              borderWidth: 1,
              height: 50,
              paddingHorizontal: 20,
              marginTop: 10,
              borderRadius: 10,
              width: '100%',
            }}></TextInput>
        </View>
        <View style={{marginTop: 40}}>
          <Text style={{paddingHorizontal: 10}}>Email</Text>
          <TextInput
            placeholder="Enter Email"
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
        </View>

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
            onChangeFormattedText={text => {
              setphoneNumber(text);
            }}
          />
          {/* <Pressable style={styles.button} onPress={() => buttonPress()}>
            <Text style={styles.continueText}>Get Phone Number</Text>
          </Pressable> */}
        </View>

        <View style={styles.container}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              color={Colors.HeaderColour}
              style={styles.checkbox}
            />
            <Text style={styles.label}>
              I agree term conditions and privacy policy
            </Text>
          </View>
          {/* <Text>Is CheckBox selected: {isSelected ? '👍' : '👎'}</Text> */}
        </View>
        <PrimaryButton
          textColor={"white"}
          title={'Get Started'}
          color={'#707070'}
          customStyles={styles.PrimaryButton}
          onPress={() => {
            signupHandler();
          }}
        />
         {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.HeaderColour} />
          </View>
          )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    // borderWidth: 1,
    // borderColor: 'black',
    height: '55%',
    justifyContent: 'space-evenly',
  },
  forgetPassContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  lastContainer: {
    height: '15%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: '20%',
  },
  SignUpContainer: {
    flexDirection: 'row',
  },

  PrimaryButton: {
    marginTop: 30,
  },
  // /////////////////// Country Picker Style

  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 40,
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

  ///////////////////////////////////// CheckBOX STYLE
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
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
