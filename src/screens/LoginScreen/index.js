import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Button,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  AuthHeader,
  AuthContainer,
  PrimaryInput,
  PrimaryButton,
  Loading,
} from '../../components';
import {CustomText} from '../../components';
import {Metrix, NavigationService, Images, Colors} from '../../config';
import navigationService from '../../config/navigationService';
import {showToast} from '../../config/utills';
import {loginSuccess, setUserDetail} from '../../redux/actions/UserActions';
import {useDispatch} from 'react-redux';
import {userLogin} from '../../services/login/login';
import database from '@react-native-firebase/database';
import {useNavigation, StackActions} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {AlertDialog, Center} from 'native-base';
import {useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



export const LoginScreen = () => {
  var navigation = useNavigation();
  const [hidePass, setHidePass] = useState(true);
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState(login_in_data);
  const [showPass, setShowPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);




  const login_in_data = {
    email: '',
    password: '',
  };

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId: '109919930711-9nu9vp3mkun3pvg58ijhdo36039il68n.apps.googleusercontent.com',

    });
    // Check if user is already signed in
    _isSignedIn();
  }, []);


  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      // Set User Info if user is already signed in
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  };


  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };


 const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      setUserInfo(userInfo);
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (
          error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
        ) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };


  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null); 
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };

  // if (gettingLoginStatus) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );

  // }

  const signInHandler = async () => { 

    var userLat = await AsyncStorage.getItem('latitude');
         console.log('userlat>>>>>>>>>', userLat);

    var userLong = await AsyncStorage.getItem('longitude');
        console.log('userlong>>>>>>>>>', userLong);

    var userid = await AsyncStorage.getItem('UserId');
        console.log('UserID>>>>>>>>>', userid);

    var userFcmToken = await AsyncStorage.getItem('fcmToken');
        console.log('User Fcm Token>>>>>>>>>', userFcmToken);  
        
    setIsLoading(true);
   

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
   // console.log('>>>>>>>>>>>>>>>>>>>', userId)

    // if (email && password) {
    //   navigationService.navigate('HomeScreen');
    // } else if (email == '') {
    //   showToast('Please Enter Email');
    // } else if (password == '') {
    //   showToast('Please Enter Password');
    // }


    fetch(`http://asaanweb.com/pirayo/index.php/Pirayo_Controller/login/${userid}`, {

      method: 'POST',
      body: formData
    })
    .then((response) => response.json())
    .then(async function (res) {

        if (res.response.status == 'true') {
           setIsLoading(false);
           //TODO
           navigationService.navigate('HomeScreen');
//


          //navigation.dispatch(StackActions.replace("HomeScreen"));
        if (userid == null) {
           AsyncStorage.setItem('UserId', res.response.id);
           var userid = await AsyncStorage.getItem('UserId');
          
          console.log('reSet ID on login <><><><><><>', userid)
        }

        } else if (res.response.status == 'false') {
          setIsLoading(false);
          showToast('user not found');
        }
     
    })
      .catch(error => console.log('user not found>>> ' ,error));


    const userLatLngInLocalDataBase = () => {
      const formData = new FormData();
    
      formData.append('latitude', userLat);
      formData.append('longitude', userLong);
    
      fetch(`http://asaanweb.com/pirayo/index.php/Pirayo_Controller/add_lat_lang/${userid}`, {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(function (res) {
    
            if (res.status == 'true') {
              console.log(' User LatLng added on Local Databse>>> ',res.message);
    
            } else if (res.status == 'false') {
              console.log(res.status);
              showToast('not submitted');
            }
          })
          .catch(error => console.log(' not submitted LatLng>>> ', error));
        }

    userLatLngInLocalDataBase();
      
      
    const userDeviceTokenInLocalDataBase = () => {
        const formData = new FormData();
      
        formData.append('type', 'user');
        formData.append('token', userFcmToken);
      
      fetch(`http://asaanweb.com/pirayo/index.php/Pirayo_Controller/user_token/${userid}`, {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(function (res) {
          setTimeout(() => {

          if (res.status == 'true') {
            console.log(' User Token Success>>> ', res);
  
          } else if (res.status == 'false') {
            console.log(res.status);
            showToast('not submitted token');
          }
          }, 1000);
          
        })
        .catch(error => console.log(' not submitted token>> ', error));
        }

    userDeviceTokenInLocalDataBase();

     
  // const userLatLng = () => {

  //     setTimeout(async () => {

  //       if (userid != '') {
  //         setTimeout(() => {
  //           database().ref(`${userid}/`).push({
  //             userLat,
  //             userLong,
  //           })
  //           .then((data)=>{
  //               //success callback
  //               //console.log('data ' , data)
  //           }).catch((error)=>{
  //               //error callback
  //               console.log('error ' , error)
  //         }, 1000);
        
  //       })
  //       } else {
  //         Alert.alert(`failed to fetch DATA> ${userid}`);
  //         console.log(`failed to fetch DATA>><<><><><>< ${userid}`);
  //       }
  //     }, 1000);

  //   //fetch(
  //     // `https://otp-testin-default-rtdb.firebaseio.com/userLatLong&ID-${userid}.json`,
  //     // {
  //     //   method: 'POST',
  //     //   body: JSON.stringify({userLat, userLong})
  //     // },
  //     // )
  //     // .then(response => response.json())
  //     // .then(res => {
  //     //   console.log(' Firebase Response>> ', res);
  //     // })
  //     // .catch(error => console.log(' Firebase userLatLng&ID Error>> ' ,error));
  // }
  // userLatLng(); 

   //
  
  
   const userName = async () => {
    const Email = email;
    const extractName = Email.split('@')[0];
    AsyncStorage.setItem('UserName', extractName);
    try {
      await AsyncStorage.getItem('UserName');

    } catch (error) {
      console.log(error);
    }
  }

userName();

};
    

  // const loginName = () => {
  //   navigation.navigate("HomeScreen", {
  //     email: email,
  //   })
  // }
 
  // const loginName = () => {
  //   navigation.navigate("HomeScreen", {
  //     email: email,
  //   })
  // }


  const signInHandlerWithNumber = () => {
    navigationService.navigate('GetStartedScreen');
  };


  const Login = () => {
    if (loginData.email == '') {
      showToast('Please Enter Email');
      return;
    } else if (loginData.password == '') {
      showToast('Please Enter Password.');
      return;
    } else {
      const body = {
        email: loginData.email,
        password: loginData.password,
      };
      console.log('user--', body);
      setIsLoading(true);
      userLogin(body)
        .then(res => {
          console.log('res-->>>>>>>>>>', res);
          AsyncStorage.setItem('password', JSON.stringify(loginData?.password));
          dispatch(
            setUserDetail({
              ...res?.data?.data,
            }),
          );
          AsyncStorage.setItem(
            'userData',
            JSON.stringify({
              ...res?.data?.data,
            }),
          );
          dispatch(loginSuccess(true));
          setLoginData({
            email: '',
            password: '',
          });
          setIsLoading(false);
        })
        .catch(error => {
          console.log('res-->>>>>>>>>>', error);
          setIsLoading(false);
          // alert(error?.response?.data?.msg)
          showToast(`${error?.response?.data?.msg}`);
        });
    }
  };

  return (
    <>
      <View
        style={{
          height: 100,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: Colors.HeaderColour,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            letterSpacing: 1,
            marginTop: -10,
          }}>
          Hello Again!
        </Text>
        <Text
          style={{
            fontStyle: 'italic',
            letterSpacing: 1,
            marginTop: 7,
          }}>
          Welcome back you've been missed
        </Text>
      </View>
      {/* <ScrollView> */}
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          margin: 15,
        }}>
        <Text style={{}}>Email</Text>
        <TextInput
          placeholder="Enter Email"
          defaultValue={email}
          onChangeText={e => {
            setEmail(e);
          }}
          style={{
            borderWidth: 1,
            height: 50,
            paddingHorizontal: 20,
            marginTop: 10,
            borderRadius: 10,
            width: '100%',
          }}></TextInput>
        <Text style={{marginTop: 20}}>Password</Text>
        <View
          style={{
            borderColor: 'black',
            borderWidth: 1,
            marginTop: 5,
            width: '100%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 8,
            borderRadius: 10,
            margin: 20,
          }}>
          <TextInput
            defaultValue={password}
            onChangeText={e => {
              setPassword(e);
            }}
            style={styles.input}
            placeholder="Password"
            secureTextEntry={hidePass ? true : false}
            maxLength={30}
          />
          <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
            <Image
              source={Images.passwordeye}
              style={styles.icon}
              name="your-icon"
              size={10}
            />
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => {
              navigationService.navigate('EnterEmailScreen');
            }}>
            <Text style={{color: '#0887F0'}}>Forget Password</Text>
          </TouchableOpacity>
        </View>

        <PrimaryButton
          textColor={'white'}
          title={'sign In'}
          color={'#707070'}
          customStyles={styles.PrimaryButton}
          onPress={() => {
            signInHandler();
          }}
          disabled={email === '' || password === ''}
        />
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.HeaderColour}/>
          </View>
        )}

        <PrimaryButton
          title={'Sign In with number'}
          color={Colors.HeaderColour}
          customStyles={styles.PrimaryButton}
          onPress={() => {
            signInHandlerWithNumber();
          }}
        />
        <View
          style={{
            // borderWidth: 1,
            flexDirection: 'row',
            marginTop: 30,
            // height: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View
            style={{
              borderWidth: 1,
              width: '30%',
              height: 0,
              borderColor: '#707070',
            }}></View>
          <View style={{width: '30%'}}>
            <Text>Or Sign In with</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              width: '30%',
              height: 0,
              borderColor: '#707070',
            }}></View>
        </View>
        <View
          style={{
            // borderWidth: 1,
            flexDirection: 'row',
            marginTop: 30,
            // height: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            alignSelf: 'center',
          }}>
          <View
            style={{
              // borderWidth: 1,
              width: 53,
              height: 53,
              borderColor: '#707070',
              alignItems: 'center',
            }}>
            <Image
              source={Images.FbLogo}
              style={{
                // tintColor: 'red',
                width: 30,
                height: 30,
                marginTop: 10,
              }}
              // resizeMode={'contain'}
            />
          </View>
          <View
            style={{
              // borderWidth: 1,
              width: 53,
              height: 53,
              borderColor: '#707070',
              alignItems: 'center',
            }}>
            <Image
              source={Images.AppleLogo}
              style={{
                // tintColor: 'red',
                width: 30,
                height: 35,
                marginTop: 10,
              }}
              // resizeMode={'contain'}
            />
          </View>
          <View
            style={{
              // borderWidth: 1,
              width: 53,
              height: 53,
              borderColor: '#707070',
              alignItems: 'center',
            }}>
           <TouchableOpacity
              style={styles.button}
              onPress={() => {
                _signIn();
              }}>
            <Image
              source={Images.GoogleLogo}
              style={{
                // tintColor: 'red',
                width: 30,
                height: 30,
                marginTop: 10,
              }}
              // resizeMode={'contain'}
            />
          </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            // borderWidth: 1,
            flexDirection: 'row',
            // marginTop: 30,
            // height: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '80%',
            alignSelf: 'center',
            left: 10,
            margin: 10,
          }}>
          <View style={{width: '35%'}}>
            <Text>not a member</Text>
          </View>
          <View
            style={{
              width: 2,
              borderColor: 'black',
              height: 20,
              backgroundColor: '#707070',
            }}></View>
          <View style={{width: '35%'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigationService.navigate('SignupScreen');
              }}>
              <Text style={{color: '#0887F0'}}>Register now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer2: {
    height: Metrix.VerticalSize(150),
    justifyContent: 'space-evenly',
    // marginVertical: Metrix.VerticalSize(20),

    //  borderWidth: 1
  },
  forgetPassContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    // borderWidth: 1,
  },
  lastContainer: {
    height: Metrix.VerticalSize(100),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // borderWidth: 1,
  },
  SignUpContainer: {
    flexDirection: 'row',
  },

  PrimaryButton: {
    marginTop: 30,
    width: '85%',
    alignSelf: 'center',
  },

  inputContainer: {
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    height: 40,
    // borderWidth: 1,
    // height: 50,
    paddingHorizontal: 15,
    // marginTop: 10,
    // borderRadius: 10,
    // width: '100%',
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
    //borderRadius: 10
  },
});
