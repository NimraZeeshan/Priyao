// @flow

import {
  MENU,
  USER_SIGNUP,
  USER_OTP_VERIFY,
  USER_RESEND_OTP_VERIFY,
  USER_SIGNIN,
  USER_SIGNOUT,
  UPDATE_USER_PROFILE,
  USER_FORGOT_PASSWORD,
  SIMILAR_PRODUCT,
  VIEW_PRODUCT,
  USER_UPDATE_PASSWORD,
  USER_ID,
  CHANGE_PASSWORD,
  GET_USER,
  USER_NAME,
  FORGOT_PASSWORD,
  SAVE_ANONYMOUS_ID,
  GET_APPLICATION_SETTINGS,
  GET_USER_ADDRESS,
  ADD_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
  GET_PICKUP_ADDRESS,
  GET_CUSTOMER_PROFILE,
  UPLOAD_EMIRATES_IMAGES,
  UPLOAD_PASSPORT_IMAGES,
  UPLOAD_INSURANCE_IMAGES,
  UPLOAD_TOPUP_IMAGES,
  CREATE_CUSTOMER_PROFILE,
  DELETE_USER_ADDRESS,
  REMOVE_CUSTOMER_PROFILE,
  GET_SINGLE_CUSTOMER_PROFILE,
  GET_UPLOAD_IMAGES,
  UPDATE_CUSTOMER_PROFILE,
  ADD_BILLING_ADDRESS,
  GET_BILLING_ADDRESS,
  UPDATE_BILLING_ADDRESS,
  DELETE_BILLING_ADDRESS,
  CHANGE_PASSWORD_CUSTOME,
  USER_PRIMARY_EMAIL_OTP_VERIFY,
  USER_PRIMARY_PHONE_OTP_VERIFY,
  USER_SECONDARY_EMAIL_OTP_VERIFY,
  USER_SECONDARY_PHONE_OTP_VERIFY,
  USER_SECONDARY_PHONE_OTP_VERIFICATION,
  USER_SECONDARY_EMAIL_OTP_VERIFICATION,
  GET_INVOICE_PDF,
  USER_PRIMARY_PHONE_OTP_VERIFICATION,
  USER_PRIMARY_EMAIL_OTP_VERIFICATION,
  USER_RESEND_PRIMARY_PHONE_OTP_VERIFY,
  USER_RESEND_PRIMARY_EMAIL_OTP_VERIFY,
  USER_RESEND_SECONDARY_PHONE_OTP_VERIFY,
  USER_RESEND_SECONDARY_EMAIL_OTP_VERIFY,
  GET_INVENTORY,
  USER_DETAIL,
  UPDATE_USER_VEHICLE,
  LOGIN_SUCCESSFUL,
  TABINDEX,
  ROUTE,
  RESTUARANT_DETAIL,
  SAVE_CORDS,
  USER_POSITION
} from "./ActionTypes";

export function loginSuccess(payload) {
  return {
    payload,
    type: LOGIN_SUCCESSFUL.SUCCESS,
  };
}
export function Route(payload) {
  return {
    payload,
    type: ROUTE.SUCCESS,
  };
}
export function TabIndex(payload) {
  return {
    payload,
    type: TABINDEX.SUCCESS,
  };
}
//-- SHOW MENU ---//
export function menu(payload) {
  return {
    payload,
    type: MENU.SUCCESS,
  };
}
//-- SIGN UP ----//
export function userSignupRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNUP.REQUEST,
  };
}
//-- OPT VERIFY ----//
export function userOtpVerifyRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_OTP_VERIFY.REQUEST,
  };
}
//-- RESEND OTP ----//
export function userResendOtpRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_RESEND_OTP_VERIFY.REQUEST,
  };
}

export function userSignupSuccess(data) {
  return {
    data,
    //access_token,
    // save_token,
    type: USER_SIGNUP.SUCCESS,
  };
}

//-- SIGN IN ----//
export function userSigninRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNIN.REQUEST,
  };
}

export function userSigninSuccess(data, access_token, refresh_token) {
  return {
    data,
    access_token,
    refresh_token,
    // save_token,
    type: USER_SIGNIN.SUCCESS,
  };
}

//-- UPDATE USER PROFILE ----//
export function updateUserProfileRequest(userid, payload, responseCallback) {
  return {
    userid,
    payload,
    responseCallback,
    type: UPDATE_USER_PROFILE.REQUEST,
  };
}

export function updateUserProfileSuccess(data, responseCallback) {
  return {
    data,
    responseCallback,
    type: UPDATE_USER_PROFILE.SUCCESS,
  };
}

//-- CHANGE PASSWORD ----//
export function changePasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_PASSWORD.REQUEST,
  };
}

export function changePasswordSuccess(data, responseCallback) {
  return {
    data,
    responseCallback,
    type: CHANGE_PASSWORD.SUCCESS,
  };
}
export function changePasswordCustome(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_PASSWORD_CUSTOME.REQUEST,
  };
}
//-- FORGOT PASSWORD ----//
export function forgotPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: FORGOT_PASSWORD.REQUEST,
  };
}

export function forgotPasswordSuccess(data, responseCallback) {
  return {
    data,
    responseCallback,
    type: FORGOT_PASSWORD.SUCCESS,
  };
}

//-- GET USER ----//
export function getUserRequest(userid, payload, responseCallback) {
  return {
    userid,
    payload,
    responseCallback,
    type: GET_USER.REQUEST,
  };
}

export function getUserSuccess(data, responseCallback) {
  return {
    data,
    responseCallback,
    type: GET_USER.SUCCESS,
  };
}

export function getInvoicePDFRequest(payload, responseCallback) {
  return {
    type: GET_INVOICE_PDF.REQUEST,
    payload,
    responseCallback,
  };
}
//-- GET APPLICATION SETTINGS ----//
export function getAppSettingsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_APPLICATION_SETTINGS.REQUEST,
  };
}

//-- GET APPLICATION SETTINGS ----//
export function getInventoryRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_INVENTORY.REQUEST,
  };
}

export function getAppSettingsSuccess(data, responseCallback) {
  return {
    data,
    responseCallback,
    type: GET_APPLICATION_SETTINGS.SUCCESS,
  };
}

export function userSignOutRequest(responseCallback) {
  return {
    responseCallback,
    type: USER_SIGNOUT.REQUEST,
  };
}

export function userSignOutSuccess() {
  return {
    type: USER_SIGNOUT.SUCCESS,
  };
}

export function updatePasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_UPDATE_PASSWORD.REQUEST,
  };
}
export function updatePasswordSuccess(token, responseCallback) {
  return {
    token,
    responseCallback,
    type: USER_UPDATE_PASSWORD.SUCCESS,
  };
}

export function setUserID(payload) {
  return {
    type: USER_ID,
    payload,
  };
}

export function setUsername(payload) {
  return {
    type: USER_NAME,
    payload,
  };
}
export function setUserDetail(payload) {
  return {
    type: USER_DETAIL,
    payload,
  };
}
export function setRestuarantDetail(payload) {
  return {
    type: RESTUARANT_DETAIL,
    payload,
  };
}

export function setSaveCoords(payload) {
  return {
    type: SAVE_CORDS,
    payload,
  };
}

export function setUserPosition(payload) {
  return {
    type: USER_POSITION,
    payload,
  };
}
export function getUserAddress(payload) {
  return {
    type: GET_USER_ADDRESS.REQUEST,
    payload,
  };
}

export function addUserAddress(payload) {
  return {
    type: ADD_USER_ADDRESS.REQUEST,
    payload,
  };
}
export function updateUserAddressRedux(payload) {
  return {
    payload,
    type: UPDATE_USER_ADDRESS,
  };
}
export function getBillingAddress(payload) {
  return {
    type: GET_BILLING_ADDRESS.REQUEST,
    payload,
  };
}

export function addBillingAddress(payload) {
  return {
    type: ADD_BILLING_ADDRESS.REQUEST,
    payload,
  };
}
export function updateBillingAddress(payload) {
  return {
    type: UPDATE_BILLING_ADDRESS.REQUEST,
    payload,
  };
}
export function deleteBillingAddress(payload) {
  return {
    type: DELETE_BILLING_ADDRESS.REQUEST,
    payload,
  };
}
export function getPickupAddress(payload) {
  return {
    type: GET_PICKUP_ADDRESS.REQUEST,
    payload,
  };
}
export function getCustomerProfile(payload) {
  return {
    type: GET_CUSTOMER_PROFILE.REQUEST,
    payload,
  };
}
export function getSingleCustomerProfile(payload, responseCallback) {
  return {
    type: GET_SINGLE_CUSTOMER_PROFILE.REQUEST,
    payload,
    responseCallback,
  };
}
export function getUploadImages(payload, responseCallback) {
  return {
    type: GET_UPLOAD_IMAGES.REQUEST,
    payload,
    responseCallback,
  };
}
export function uploadEmiratesImages(payload, responseCallback) {
  return {
    type: UPLOAD_EMIRATES_IMAGES.REQUEST,
    payload,
    responseCallback,
  };
}
export function uploadPassportImages(payload, responseCallback) {
  return {
    type: UPLOAD_PASSPORT_IMAGES.REQUEST,
    payload,
    responseCallback,
  };
}
export function uploadInsuranceImages(payload, responseCallback) {
  return {
    type: UPLOAD_INSURANCE_IMAGES.REQUEST,
    payload,
    responseCallback,
  };
}
export function uploadTopupImages(payload, responseCallback) {
  return {
    type: UPLOAD_TOPUP_IMAGES.REQUEST,
    payload,
    responseCallback,
  };
}
export function createProfile(payload, responseCallback) {
  return {
    type: CREATE_CUSTOMER_PROFILE.REQUEST,
    payload,
    responseCallback,
  };
}

export function updateProfile(payload, responseCallback) {
  return {
    type: UPDATE_CUSTOMER_PROFILE.REQUEST,
    payload,
    responseCallback,
  };
}
//Profile Primary
export function primaryPhoneProfile(payload, responseCallback) {
  return {
    type: USER_PRIMARY_PHONE_OTP_VERIFY.REQUEST,
    payload,
    responseCallback,
  };
}
export function primaryEmailProfile(payload, responseCallback) {
  return {
    type: USER_PRIMARY_EMAIL_OTP_VERIFY.REQUEST,
    payload,
    responseCallback,
  };
}

//Profile Secondary
export function secondaryPhoneProfile(payload, responseCallback) {
  return {
    type: USER_SECONDARY_PHONE_OTP_VERIFY.REQUEST,
    payload,
    responseCallback,
  };
}
export function secondaryEmailProfile(payload, responseCallback) {
  return {
    type: USER_SECONDARY_EMAIL_OTP_VERIFY.REQUEST,
    payload,
    responseCallback,
  };
}
export function verificationSecondaryPhoneProfile(payload, responseCallback) {
  return {
    type: USER_SECONDARY_PHONE_OTP_VERIFICATION.REQUEST,
    payload,
    responseCallback,
  };
}
export function verificationSecondaryEmailProfile(payload, responseCallback) {
  return {
    type: USER_SECONDARY_EMAIL_OTP_VERIFICATION.REQUEST,
    payload,
    responseCallback,
  };
}
export function resendSecondaryPhoneProfile(payload, responseCallback) {
  return {
    type: USER_RESEND_SECONDARY_PHONE_OTP_VERIFY.REQUEST,
    payload,
    responseCallback,
  };
}
export function resendSecondaryEmailProfile(payload, responseCallback) {
  return {
    type: USER_RESEND_SECONDARY_EMAIL_OTP_VERIFY.REQUEST,
    payload,
    responseCallback,
  };
}

// export function primaryPhoneProfile(payload, responseCallback) {
//   return {
//     type: USER_PRIMARY_PHONE_OTP_VERIFY.REQUEST,
//     payload,
//     responseCallback,
//   };
// }
// export function primaryEmailProfile(payload, responseCallback) {
//   return {
//     type: USER_PRIMARY_EMAIL_OTP_VERIFY.REQUEST,
//     payload,
//     responseCallback,
//   };
// }

// //Profile Secondary
// export function secondaryPhoneProfile(payload, responseCallback) {
//   return {
//     type: USER_SECONDARY_PHONE_OTP_VERIFY.REQUEST,
//     payload,
//     responseCallback,
//   };
// }
// export function secondaryEmailProfile(payload, responseCallback) {
//   return {
//     type: USER_SECONDARY_EMAIL_OTP_VERIFY.REQUEST,
//     payload,
//     responseCallback,
//   };
// }

export function removeProfile(payload, responseCallback) {
  return {
    type: REMOVE_CUSTOMER_PROFILE.REQUEST,
    payload,
    responseCallback,
  };
}
export function deleteUserAddress(payload, responseCallback) {
  return {
    type: DELETE_USER_ADDRESS.REQUEST,
    payload,
    responseCallback,
  };
}
export function viewProduct(payload, responseCallback) {
  return {
    type: VIEW_PRODUCT.REQUEST,
    payload,
    responseCallback,
  };
}
export function similarProduct(payload, responseCallback) {
  return {
    type: SIMILAR_PRODUCT.REQUEST,
    payload,
    responseCallback,
  };
}
// update User Vehicles //
export function updateUserVehicle(payload) {
  return {
    payload,
    type: UPDATE_USER_VEHICLE,
  };
}
