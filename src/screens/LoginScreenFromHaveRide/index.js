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
    Platform,
    ActivityIndicator
  } from 'react-native';
  import React, {useState} from 'react';
  import {
    AuthHeader,
    AuthContainer,
    PrimaryInput,
    PrimaryButton,
    PermissionsAndroid,
    Loading,
  } from '../../components';
  import {CustomText} from '../../components';
  import {Metrix, NavigationService, Images, Colors} from '../../config';
  import PushNotification from "react-native-push-notification";
  import navigationService from '../../config/navigationService';
  import {showToast} from '../../config/utills';
  import {loginSuccess, setUserDetail} from '../../redux/actions/UserActions';
  import { useNavigation } from '@react-navigation/native';
  import {useDispatch} from 'react-redux';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import database from '@react-native-firebase/database';
  import {userLogin} from '../../services/login/login';
  import {TextInput} from 'react-native-gesture-handler';
  import Geolocation from 'react-native-geolocation-service';
  import {Center} from 'native-base';
  import { useEffect} from 'react';
  import { cos } from 'react-native-reanimated';
  import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
  
  
  export const LoginScreenFromHaveRide = () => {

    const [hidePass, setHidePass] = useState(true);
    const dispatch = useDispatch();

    const navigation = useNavigation();
  
    const login_in_data = {
      email: '',
      password: '',
    };
  
    const [latitude1,Setlat]=useState([])
    const [longitude1,SetLongitude]=useState([])
    const [loginData, setLoginData] = useState(login_in_data);
    const [showPass, setShowPass] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [gettingLoginStatus, setGettingLoginStatus] = useState(true);


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


    function getData(){
      console.log("Working",latitude1,longitude1);
    // var latitude=24.8680458
    // var longitude=67.0562306
    Geolocation.getCurrentPosition(info=>{
      Setlat(info.coords.latitude)
      SetLongitude(info.coords.longitude)
      
      // SetSpeed(info.coords.speed)
      // SetAccuracy(info.coords.accuracy)
     
    }
    
    )
    
  }
    
  // setInterval(getData,1000);


    const driverSignInHandler = async () => {

      var driverLoc = await AsyncStorage.getItem('driverLocation');
            console.log('driver Location>>>>>>>>>',  driverLoc);

      var driverLat = await AsyncStorage.getItem('driverLatitude');
          var latitude = Number(driverLat);
       console.log('Driver Latitude>>>>>>>>>>>>', latitude);

      var driverLong = await AsyncStorage.getItem('driverLongitude');
           var longitude = Number(driverLong);
      console.log('Driver Longitude>>>>>>>>>', longitude);

      var driverFcmToken = await AsyncStorage.getItem('fcmToken');
            console.log('Driver Fcm Token>>>>>>>>>', driverFcmToken);

      var driverID = await AsyncStorage.getItem('resId');
            console.log('Driver ID>>>>>>>>>', driverID);

            AsyncStorage.setItem('isUser', false);    
            AsyncStorage.setItem('riderId', driverID);  

      setIsLoading(true);

     
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

      fetch(`http://asaanweb.com/pirayo/index.php/Driver_Controller/driver_login/${driverID}`, {
  
      method: 'POST',
      body: formData})
      .then((response) => response.json())
      .then(function (res) {

        setTimeout(async () => {
        if (res.response.status == 'true') {
            setIsLoading(false);
          if (driverID == null) {
            AsyncStorage.setItem('resId', res.response.id);
            var driverID = await AsyncStorage.getItem('resId');
            navigationService.navigate('DriverRideTypeScreen')
            console.log('reSet driver ID on login<><><><><><>', driverID)
          }
          console.log(res)
  
        } else if (res.response.status == 'false') {
          showToast('user not found');
          setIsLoading(false);
        }
      }, 1000);
      })

//       .catch(error => console.log(error));

 
//   //////////
//   const driverLatLngInFirebase = () => {

//     setTimeout(async () => {

//       if (driverID != '') {
//         setTimeout(() => {
//           database().ref(`DriverLatLng&ID-${driverID}/`).push({
//             latitude: latitude,
//             longitude: longitude
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
//         Alert.alert(`failed to fetch DATA> ${driverID}`);
//         console.log(`failed to fetch DATA>><<><><><>< ${driverID}`);
//       }
//     }, 1000);

//     // fetch(`https://otp-testin-default-rtdb.firebaseio.com/DriverLatLng&ID-${driverID}.json`, {

//     //   method: 'POST',
//     //   body: JSON.stringify({driverLatInNum, driverLongInNum})
//     // })
//     // .then(response => response.json())
//     // .then(res => {
//     //   console.log(' Firebase Response>> ' ,res);
//     // })
//     // .catch(error => console.log(' Firebase driverLatLng&ID Error>> ' ,error));
  
//    };

//   driverLatLngInFirebase();

const driverLatLngInLocalDataBase = () => {
  const formData = new FormData();

  formData.append('latitude', latitude1);
  formData.append('longitude', longitude1);

  fetch(`http://asaanweb.com/pirayo/index.php/Pirayo_Controller/add_lat_lang/${driverID}`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(function (res) {

        if (res.status == 'true') {
          console.log(' driver LatLng added on Local Databse>>> ',res.message);

        } else if (res.status == 'false') {
          console.log(res.status);
          showToast('not submitted driver latlng');
        }
      })
      .catch(error => console.log(' not submitted LatLng>>> ', error));
    }

  driverLatLngInLocalDataBase();


//   //////////
  const driverDeviceTokenInLocalDataBase = () => {

    console.log(' Driver Token >>> ', driverFcmToken);
  
    const formData = new FormData();
  
    formData.append('type', 'driver');
    formData.append('token', driverFcmToken);

    fetch(`http://asaanweb.com/pirayo/index.php/Driver_Controller/driver_token/${driverID}`, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(function (res) {

      if (res.status == 'true') {
        console.log(' Driver Token Success>>> ', res);

      } else if (res.status == 'false') {
        console.log(res.status);
        showToast('not submitted token');
      }
      
    })
    .catch(error => console.log(error));

    const formData1 = new FormData();
  
    formData.append('status', 'online');
    

    fetch(`http://asaanweb.com/pirayo/index.php/Driver_Controller/updatedriverstatus/${driverID}`, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(function (res) {

      if (res.status == 'true') {
        console.log(' Driver Online Success>>> ', res);

      } else if (res.status == 'false') {
        console.log(res.status);
        showToast('not submitted token');
      }
      
    })
    .catch(error => console.log(error));
 
  }
  driverDeviceTokenInLocalDataBase();

//   //////////
    const driverName = async () => {

      const Email = email;
      const extractName = Email.split('@')[0];
      AsyncStorage.setItem('driverName', extractName);
      try {
        await AsyncStorage.getItem('driverName');
  
      } catch (error) {
        console.log(error);
      }
    };

  driverName();

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
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            letterSpacing: 1,
            marginTop: -10,
          }}>Hello Again!</Text>
          <Text  style={{
            fontStyle: 'italic',
            letterSpacing: 1,
            marginTop: 7,
          }}>Welcome back you've been missed</Text>
        </View>
        {/* <ScrollView> */}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              margin: 20,
            }}>
            <Text style={{}}>Email</Text>
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
                setPassword(e)
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
              textColor={"white"}
              title={'Sign In'}
              color={'#707070'}
              customStyles={styles.PrimaryButton}
              onPress={() => {
                driverSignInHandler();
              }}
              disabled = {email === '' || password === ''}
              />
              {isLoading && (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color={Colors.HeaderColour} />
              </View>
              )}

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

            <Text style={{marginHorizontal: 110}}>or continue with</Text>
        
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
              onPress={(()=>{
                _signIn()
              })}>
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
                margin: 60,
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
                    navigationService.navigate('Becomeadriverone');
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
      top: -20,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },

  });
  