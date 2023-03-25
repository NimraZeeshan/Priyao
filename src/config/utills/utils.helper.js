// @flow
import {Platform, Alert, Linking, PermissionsAndroid} from 'react-native';
import moment from 'moment';
// import {MessageBarManager} from 'react-native-message-bar';
import DataHandler from '../../services/dataHandler.service';
// import {MESSAGE_TYPES, DISCARD_WARNING} from '@/constants';
// import {Theme} from '@/assets/stylesheets/styles';
import {userSigninSuccess} from '../../redux/actions/UserActions';
import {IMAGE_BASE_URL} from '../../services/config';

export const TIME1 = 'HH:mm';
class Util {
  getCurrentUserAccessToken() {
    // console.log('dataHandler-----',DataHandler?.getStore()?.getState().user?.userDetail?.accessToken)
    // return "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjRlNmNjYTRiMjgzYmI4ZjNlNDIzMDQ2MmMwMjE2YzM3NmE1MTJhMThkMTZiMWI2NTUwZDMwNWRhMDM0MGRmMWU5ODM4NjFmMWU0OWRiYjNmIn0.eyJhdWQiOiIxIiwianRpIjoiNGU2Y2NhNGIyODNiYjhmM2U0MjMwNDYyYzAyMTZjMzc2YTUxMmExOGQxNmIxYjY1NTBkMzA1ZGEwMzQwZGYxZTk4Mzg2MWYxZTQ5ZGJiM2YiLCJpYXQiOjE1NzMwNTcxMTAsIm5iZiI6MTU3MzA1NzExMCwiZXhwIjoxNjA0Njc5NTEwLCJzdWIiOiI3YzdlZmQ2OC0xN2NlLTRmZDYtODk2OC02ZjVkMDQ3ZjcwZmUiLCJzY29wZXMiOltdfQ.p53sUtmAwFF6UwK5IDsK1FK2kIhn9tLYWFqeeMidwU6USkKUgZw38IvTQhK0ST0avQzPnmq6czzVbESP8gHO-NHY4OFebEIF5RJdCBMf42yVNU_rmFOiJSexLjavQ9TYt11cifEZIMwIzVCCM_OQ9H7nkJF46kFDA9j0DFwCAcEWJ93BDGZuvf1dC83M_IO-u15CBHE63MObDjrZHlbkqrakyPVC7WsMXFfEoE6r6tGZzwMGUj64sNceFSv_OqOvqT1SqoCWUX9p3RztZN60HbrHWnnsFgDQnOCx6eBFOnpoFKdoaXQBzH4NXIb4v_zfV1eWCUvd3E6ExUM45dTIXnA8l5Sh16gSBLdVr3lZvTX__IZAdFwwQ7vfNuhU14uuX78rYvFUthLwzpBpIRqCSrGwDJGsrGSelPgkzXaN05WXaGjASCaj8X28GbHJK37XJks83vFavZqh7kB1jse9bI9ucmZuTJu7F06pDLYGweyWt33aIZMz6ErAZH_VLm3bDWwqCkJpG5YTRRGWqBRz1ko0EXY_mq7ruiqsgI5vf_am4x_XzZ6h5r8YQnm5lbAPFNYoYb1LDtk6h-BQSGMFdV6eDEI_Sx3IOz9Slaykr-e5mdO2T09EeUWxyW5SZAkRDUvv3Qg8ViwdNiYXi7oY6nC3zvE0FFbYC1ENJp16hnY";
    return DataHandler?.getStore()?.getState()?.user?.userDetail?.accessToken;
  }
  getCurrentUserUUID() {
    // return "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjRlNmNjYTRiMjgzYmI4ZjNlNDIzMDQ2MmMwMjE2YzM3NmE1MTJhMThkMTZiMWI2NTUwZDMwNWRhMDM0MGRmMWU5ODM4NjFmMWU0OWRiYjNmIn0.eyJhdWQiOiIxIiwianRpIjoiNGU2Y2NhNGIyODNiYjhmM2U0MjMwNDYyYzAyMTZjMzc2YTUxMmExOGQxNmIxYjY1NTBkMzA1ZGEwMzQwZGYxZTk4Mzg2MWYxZTQ5ZGJiM2YiLCJpYXQiOjE1NzMwNTcxMTAsIm5iZiI6MTU3MzA1NzExMCwiZXhwIjoxNjA0Njc5NTEwLCJzdWIiOiI3YzdlZmQ2OC0xN2NlLTRmZDYtODk2OC02ZjVkMDQ3ZjcwZmUiLCJzY29wZXMiOltdfQ.p53sUtmAwFF6UwK5IDsK1FK2kIhn9tLYWFqeeMidwU6USkKUgZw38IvTQhK0ST0avQzPnmq6czzVbESP8gHO-NHY4OFebEIF5RJdCBMf42yVNU_rmFOiJSexLjavQ9TYt11cifEZIMwIzVCCM_OQ9H7nkJF46kFDA9j0DFwCAcEWJ93BDGZuvf1dC83M_IO-u15CBHE63MObDjrZHlbkqrakyPVC7WsMXFfEoE6r6tGZzwMGUj64sNceFSv_OqOvqT1SqoCWUX9p3RztZN60HbrHWnnsFgDQnOCx6eBFOnpoFKdoaXQBzH4NXIb4v_zfV1eWCUvd3E6ExUM45dTIXnA8l5Sh16gSBLdVr3lZvTX__IZAdFwwQ7vfNuhU14uuX78rYvFUthLwzpBpIRqCSrGwDJGsrGSelPgkzXaN05WXaGjASCaj8X28GbHJK37XJks83vFavZqh7kB1jse9bI9ucmZuTJu7F06pDLYGweyWt33aIZMz6ErAZH_VLm3bDWwqCkJpG5YTRRGWqBRz1ko0EXY_mq7ruiqsgI5vf_am4x_XzZ6h5r8YQnm5lbAPFNYoYb1LDtk6h-BQSGMFdV6eDEI_Sx3IOz9Slaykr-e5mdO2T09EeUWxyW5SZAkRDUvv3Qg8ViwdNiYXi7oY6nC3zvE0FFbYC1ENJp16hnY";
    return DataHandler.getStore().getState().user?.userDetail?.uuid;
  }
  updateCurrentUserAccessToken(token, refresh_token) {
    let store = DataHandler.getStore();
    let user = store.getState().user || {};
    // console.log("useruser", user.userDetail.uuid);
    store.dispatch(
      userSigninSuccess(user.userDetail.uuid, token, refresh_token),
    );
  }

  userIsServiceProvider() {
    return (
      DataHandler.getStore().getState().user.data.user_type ===
      'service provider'
    );
  }

  getCurrentDate() {
    var currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth());
    var formatDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1 < 10
        ? `0${currentDate.getMonth() + 1}`
        : currentDate.getMonth() + 1
    }-${('0' + currentDate.getDate()).slice(-2)}`;
    return formatDate;
  }
  getErrorText(error) {
    if (error instanceof Array) {
      if (error.length > 0) return error[0];
    } else {
      return error;
    }
    return '';
  }

  isNumber(val) {
    return /^\d+$/.test(val);
  }

  openLinkInBrowser(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // console.log("Don't know how to open URI: ");
      }
    });
  }

  generateGetParameter(obj) {
    let final = '?';
    for (const key in obj) {
      final = `${final}${key}=${obj[key]}&`;
    }
    final = final.slice(0, -1);
    return final;
  }
  isEmailValid(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}

export const getTokenFromStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('userAuth');
    if (value !== null) {
      // We have data!!
      return Promise.resolve(JSON.parse(value));
    }
  } catch (error) {
    // Error retrieving data
  }
};
export const getObjectByKeys = (arr, key = 'id', deleteKey = null) => {
  let obj = {};
  arr.forEach(val => {
    obj[val[key]] = val;
    if (deleteKey) {
      delete obj[val[key]][deleteKey];
    }
  });
  return obj;
};
export const setTokenInStorage = payload => {
  AsyncStorage.setItem('userAuth', JSON.stringify(payload), err => {
    if (err) {
      throw err;
    }
  }).catch(err => {});
};
export const getIdsFromData = (data, key = 'id') => {
  return data?.map(item => item[key]);
};
export const getMediaPreview = mediaPath => {
  return {uri: `${IMAGE_BASE_URL}${mediaPath}`};
};
export const getConvertedTime = date => {
  return moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');
};

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
      lastDay: `[yesterday ${moment(time).format('HH:mm')}]`,
      lastWeek: `[${moment(time).format('DD, MMM YYYY  HH:mm')}]`,
      sameElse: `[${moment(time).format('DD, MMM YYYY  HH:mm')}]`,
    });
  }
};

export default new Util();
