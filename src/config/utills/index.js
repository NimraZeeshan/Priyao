import {Toast} from 'native-base';
// import { PermissionsAndroid} from 'react-native';
import moment from 'moment';

const passwordRegex =
  /^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[@!$#&*%^]).*$/;
// const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){8,16}$/;
const emailRegex = /^\w+([\.-]?\w+)*@{1}\w+([\.-]?\w+)*(\.[a-zA-Z]{2,3})+$/;
const fullNameRegex =
  /^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/;
const phoneNoRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export function validatePassword(password) {
  return passwordRegex.test(password);
}

export function validatePhoneNumber(phone) {
  return phoneNoRegex.test(phone);
}

export function validateEmail(email) {
  return emailRegex.test(email);
}

export function validateAlpha(name) {
  return fullNameRegex.test(name);
}

export function showToast(message, status = 'info', duration = 3000) {
  Toast.show({
    title: message,
    // position: 'absolute',
    bottom: 10,
    status,
    textStyle: {textAlign: 'center'},
    duration: duration,
    isClosable: true,
    placement: 'top',
    fontWeight: 'extrabold',
    // backgroundColor:'red',
  });
}

// export const requestPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//       {
//         message: 'MH1 App needs access to your Gallery',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//     } else {
//       console.log('Gallery permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

export const timeHumanize = time => {
  let current_time = moment().format('x');
  // let local_time = moment.utc(time).toDate();
  let to_local = moment(time).format('YYYY-MM-DD HH:mm:ss');
  let that_time = moment(to_local).format('x');
  let diff = current_time - that_time;

  var final_time = Math.floor(diff / 1000 / 60);
  if (final_time < 1) {
    return 'just now';
  } else if (final_time >= 1 && final_time < 60) {
    if (final_time < 2) {
      return `${final_time} min ago`;
    } else {
      return `${final_time} min ago`;
    }
  } else if (final_time >= 60 && final_time < 1440) {
    let new_hour = Math.floor(final_time / 60);
    if (new_hour <= 1) {
      return `${new_hour} hour ago`;
    } else {
      return `${new_hour} hours ago`;
    }
  } else {
    return moment(time).calendar(null, {
      lastDay: `[yesterday ${moment(time).format('hh:mm A')}]`,
      lastWeek: `[${moment(time).format('DD, MMM YYYY  hh:mm A')}]`,
      sameElse: `[${moment(time).format('DD, MMM YYYY  hh:mm A')}]`,
    });
  }
};

export const baseUrl = 'https://stadis.herokuapp.com/';
// export const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';
// export const GOOGLE_MAP_API_KEY = 'AIzaSyDby459lxUcpmXqFpF3BSEShekowrR9YxI';

// export let socket = null;

// export const setSocketRef = (params)=>{
//   socket = params;
// }
