// @flow
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const CANCEL = "CANCEL";
const FAILURE = "FAILURE";

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach((type) => {
    res[type] = `${base}_${type}`;
  });
  return res;
}
// USER ACTIONS
export const LOGIN_SUCCESSFUL = createRequestTypes("LOGIN_SUCCESSFUL");

export const MENU = createRequestTypes("MENU");
export const TABINDEX = createRequestTypes("TABINDEX");
export const ROUTE = createRequestTypes("ROUTE");
export const USER_ID = "USER_ID";

export const USER_DETAIL = "USER_DETAIL";
export const RESTUARANT_DETAIL = "RESTUARANT_DETAIL";
export const SAVE_CORDS = "SAVE_CORDS";


export const NETWORK_INFO = "NETWORK_INFO";
export const USER_SIGNUP = createRequestTypes("USER_SIGNUP");
export const USER_SIGNIN = createRequestTypes("USER_SIGNIN");
export const USER_SIGNOUT = createRequestTypes("USER_SIGNOUT");
export const UPDATE_USER_PROFILE = createRequestTypes("UPDATE_USER_PROFILE");
export const CHANGE_PASSWORD = createRequestTypes("CHANGE_PASSWORD");
export const CHANGE_PASSWORD_CUSTOME = createRequestTypes(
  "CHANGE_PASSWORD_CUSTOME"
);
export const FORGOT_PASSWORD = createRequestTypes("FORGOT_PASSWORD");
export const GET_USER = createRequestTypes("GET_USER");
export const GET_APPLICATION_SETTINGS = createRequestTypes(
  "GET_APPLICATION_SETTINGS"
);
export const GET_FAQS = createRequestTypes("GET_FAQS");
export const SEND_EMAIL = createRequestTypes("SEND_EMAIL");
export const USER_FORGOT_PASSWORD = createRequestTypes("USER_FORGOT_PASSWORD");
export const USER_UPDATE_PASSWORD = createRequestTypes("USER_UPDATE_PASSWORD");
export const UPDATE_PROFILE = createRequestTypes("UPDATE_PROFILE");
export const LOGOUT = "LOGOUT";
export const EMPTY = createRequestTypes("EMPTY");
export const CLEAR_CHECKOUT_DATA = createRequestTypes("CLEAR_CHECKOUT_DATA");
export const SAVE_ANONYMOUS_ID = "SAVE_ANONYMOUS_ID";
export const GET_USER_ADDRESS = createRequestTypes("GET_USER_ADDRESS");
export const ADD_USER_ADDRESS = createRequestTypes("ADD_USER_ADDRESS");
export const UPDATE_USER_ADDRESS = "UPDATE_USER_ADDRESS";
export const GET_PICKUP_ADDRESS = createRequestTypes("GET_PICKUP_ADDRESS");

export const GET_INVOICE_PDF = createRequestTypes("GET_INVOICE_PDF");

export const DELETE_USER_ADDRESS = createRequestTypes("DELETE_USER_ADDRESS");

export const GET_BILLING_ADDRESS = createRequestTypes("GET_BILLING_ADDRESS");
export const ADD_BILLING_ADDRESS = createRequestTypes("ADD_BILLING_ADDRESS");
export const UPDATE_BILLING_ADDRESS = createRequestTypes(
  "UPDATE_BILLING_ADDRESS"
);
export const DELETE_BILLING_ADDRESS = createRequestTypes(
  "DELETE_BILLING_ADDRESS"
);

export const GET_INVENTORY = createRequestTypes("GET_INVENTORY");
export const USER_POSITION = "USER_POSITION";

// AppINFO Actions
export const TERMS_AND_CONDITION = createRequestTypes("TERMS_AND_CONDITION");
export const ABOUT_US = createRequestTypes("ABOUT_US");
export const PRIVACY_POLICY = createRequestTypes("PRIVACY_POLICY");
export const GET_GOOGLE_MAP = createRequestTypes("GET_GOOGLE_MAP");
export const PRECRIPTION_DATA_LOAD = createRequestTypes(
  "PRECRIPTION_DATA_LOAD"
);

// ACTIVITIES ACTIONS
export const GET_ALL_ACTIVITIES = createRequestTypes("GET_ALL_ACTIVITIES");
export const CREATE_ACTIVITY = createRequestTypes("CREATE_ACTIVITY");
export const ACTIVITY_BOOKING_DATE = createRequestTypes(
  "ACTIVITY_BOOKING_DATE"
);
export const GET_CLASS_TYPES = createRequestTypes("GET_CLASS_TYPES");
export const GET_ALL_PACKAGES = createRequestTypes("GET_ALL_PACKAGES");
export const ADD_ACTIVITY_PACKAGES = createRequestTypes(
  "ADD_ACTIVITY_PACKAGES"
);
// card Actions
export const CREATE_CARD = createRequestTypes("CREATE_CARD");
export const GET_ALL_CARDS = createRequestTypes("GET_ALL_CARDS");
export const GET_SEARCH_CARDS = createRequestTypes("GET_SEARCH_CARDS");
export const GET_CART_ITEMS = createRequestTypes("GET_CART_ITEMS");
export const APPLY_VOUCHER_CODE = createRequestTypes("APPLY_VOUCHER_CODE");
export const CHECKOUT = createRequestTypes("CHECKOUT");
export const UPDATE_CART = createRequestTypes("UPDATE_CART");
export const REMOVE_CART = createRequestTypes("REMOVE_CART");
//NotificationActions
export const GET_ALL_NOTIFICATIONS = createRequestTypes(
  "GET_ALL_NOTIFICATIONS"
);
export const GET_NOTIFICATIONS = createRequestTypes("GET_NOTIFICATIONS");
export const DELETE_NOTIFICATIONS = createRequestTypes("DELETE_NOTIFICATIONS");
export const UPDATE_FCM_TOKEN = createRequestTypes("UPDATE_FCM_TOKEN");
export const REMOVE_FCM_TOKEN = createRequestTypes("REMOVE_FCM_TOKEN");
export const MARK_NOTIFICATIONS_READ = createRequestTypes(
  "MARK_NOTIFICATIONS_READ"
);
export const TOGGLE_NOTIFICATIONS = createRequestTypes("TOGGLE_NOTIFICATIONS");
// CartActions

export const ADD_TO_CART = createRequestTypes("ADD_TO_CART");
export const GET_USER_CART = createRequestTypes("GET_USER_CART");
export const DELETE_USER_CART_ITEM = createRequestTypes(
  "DELETE_USER_CART_ITEM"
);
export const MERGE_USER_CART = createRequestTypes("MERGE_USER_CART");
// WishlistActions
export const REMOVE_WISHLIST = createRequestTypes("REMOVE_WISHLIST");
export const GET_WISHLIST = createRequestTypes("GET_WISHLIST");
export const ADD_WISHLIST = createRequestTypes("ADD_WISHLIST");
export const MARK_WISHLIST_READ = createRequestTypes("MARK_WISHLIST_READ");
//Customer Profile
export const GET_CUSTOMER_PROFILE = createRequestTypes("GET_CUSTOMER_PROFILE");

//Single Customer Profile
export const GET_SINGLE_CUSTOMER_PROFILE = createRequestTypes(
  "GET_SINGLE_CUSTOMER_PROFILE"
);

//Remove Profile
export const REMOVE_CUSTOMER_PROFILE = createRequestTypes(
  "REMOVE_CUSTOMER_PROFILE"
);
//Create Customer Profile
export const CREATE_CUSTOMER_PROFILE = createRequestTypes(
  "CREATE_CUSTOMER_PROFILE"
);
//Update Customer Profile
export const UPDATE_CUSTOMER_PROFILE = createRequestTypes(
  "UPDATE_CUSTOMER_PROFILE"
);

//Emirates Images Upload
export const UPLOAD_EMIRATES_IMAGES = createRequestTypes(
  "UPLOAD_EMIRATES_IMAGES"
);
//Upload Images Get
export const GET_UPLOAD_IMAGES = createRequestTypes("GET_UPLOAD_IMAGES");
//Passport Images Upload
export const UPLOAD_PASSPORT_IMAGES = createRequestTypes(
  "UPLOAD_PASSPORT_IMAGES"
);
//Insurance Images Upload
export const UPLOAD_INSURANCE_IMAGES = createRequestTypes(
  "UPLOAD_INSURANCE_IMAGES"
); //Topup Images Upload
export const UPLOAD_TOPUP_IMAGES = createRequestTypes("UPLOAD_TOPUP_IMAGES");

//OTP Verify
export const USER_OTP_VERIFY = createRequestTypes("USER_OTP_VERIFY");

//PROFILE PRIMARY
//OTP PHONE Verify
export const USER_PRIMARY_PHONE_OTP_VERIFY = createRequestTypes(
  "USER_PRIMARY_PHONE_OTP_VERIFY"
);
export const USER_PRIMARY_PHONE_OTP_VERIFICATION = createRequestTypes(
  "USER_PRIMARY_PHONE_OTP_VERIFICATION"
);
//OTP EMAIL Verify
export const USER_PRIMARY_EMAIL_OTP_VERIFY = createRequestTypes(
  "USER_PRIMARY_EMAIL_OTP_VERIFY"
);

export const USER_PRIMARY_EMAIL_OTP_VERIFICATION = createRequestTypes(
  "USER_PRIMARY_EMAIL_OTP_VERIFICATION"
);

//PROFILE SECONDARY
//OTP PHONE Verify
export const USER_SECONDARY_PHONE_OTP_VERIFY = createRequestTypes(
  "USER_SECONDARY_PHONE_OTP_VERIFY"
);

export const USER_SECONDARY_PHONE_OTP_VERIFICATION = createRequestTypes(
  "USER_SECONDARY_PHONE_OTP_VERIFICATION"
);
//OTP EMAIL Verify
export const USER_SECONDARY_EMAIL_OTP_VERIFY = createRequestTypes(
  "USER_SECONDARY_EMAIL_OTP_VERIFY"
);

export const USER_SECONDARY_EMAIL_OTP_VERIFICATION = createRequestTypes(
  "USER_OTP_VERIFICATION"
);

//Resend OTP
export const USER_RESEND_OTP_VERIFY = createRequestTypes(
  "USER_RESEND_OTP_VERIFY"
);
//Resend OTP
export const USER_RESEND_PRIMARY_PHONE_OTP_VERIFY = createRequestTypes(
  "USER_RESEND_PRIMARY_PHONE_OTP_VERIFY"
);
//Resend OTP
export const USER_RESEND_PRIMARY_EMAIL_OTP_VERIFY = createRequestTypes(
  "USER_RESEND_PRIMARY_EMAIL_OTP_VERIFY"
);
//Resend OTP
export const USER_RESEND_SECONDARY_PHONE_OTP_VERIFY = createRequestTypes(
  "USER_RESEND_SECONDARY_PHONE_OTP_VERIFY"
);
//Resend OTP
export const USER_RESEND_SECONDARY_EMAIL_OTP_VERIFY = createRequestTypes(
  "USER_RESEND_SECONDARY_EMAIL_OTP_VERIFY"
);

export const FETCH_PRESCRIPTION = createRequestTypes("FETCH_PRESCRIPTION");
export const SEND_SELECTED_ACTIVITIES = createRequestTypes(
  "SEND_SELECTED_ACTIVITIES"
);
export const CREATE_ORDER_REVIEW = createRequestTypes("CREATE_ORDER_REVIEW");
export const CANCEL_ORDER = createRequestTypes("CANCEL_ORDER");
export const CHANGE_DELIVERY_DATE = createRequestTypes("CHANGE_DELIVERY_DATE");
export const VIEW_PRODUCT = createRequestTypes("VIEW_PRODUCT");

export const SIMILAR_PRODUCT = createRequestTypes("SIMILAR_PRODUCT");
