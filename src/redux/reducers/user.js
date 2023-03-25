// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";
import {
  MENU,
  USER_SIGNIN,
  USER_SIGNOUT,
  UPDATE_USER_PROFILE,
  USER_UPDATE_PASSWORD,
  USER_DETAIL,
  LOGOUT,
  USER_ID,
  GET_USER,
  SAVE_ANONYMOUS_ID,
  GET_USER_ADDRESS,
  GET_BILLING_ADDRESS,
  GET_PICKUP_ADDRESS,
  GET_CUSTOMER_PROFILE,
  UPLOAD_EMIRATES_IMAGES,
  UPLOAD_PASSPORT_IMAGES,
  UPLOAD_INSURANCE_IMAGES,
  UPLOAD_TOPUP_IMAGES,
  CREATE_CUSTOMER_PROFILE,
  USER_SIGNUP,
  UPDATE_USER_VEHICLE,
  UPDATE_USER_ADDRESS,
  LOGIN_SUCCESSFUL,
  TABINDEX,
  ROUTE,
  RESTUARANT_DETAIL,
  SAVE_CORDS,
  USER_POSITION
} from "../actions/ActionTypes";
import moment from "moment";

const initialState = Immutable({
  authorize: false,
  menu: {},
  data: {},
  access_token: "",
  profileSections: [],
  user: {},
  anonymous_id: "",
  address: [],
  billingAddress: [],
  pickupAddress: [],
  profile: {},
  profileCustomer: [],
  result: [],
  refresh_token: "",
  tokenExpireTime: null,
  userDetail: {},
  restuarantDetail: {},
  userVehicles: [],
  userAddress: [],
  route: "",
  index: 0,
});

export default (state = initialState, action) => {
  // console.log({ action });
  switch (action.type) {
    case ROUTE.SUCCESS: {
      // let showMenu = action.showMenu;
      return Immutable.merge(state, {
        route: action.payload.route,
      });
    }
    case TABINDEX.SUCCESS: {
      // let showMenu = action.showMenu;
      return Immutable.merge(state, {
        index: action.payload.num,
      });
    }
    case LOGIN_SUCCESSFUL.SUCCESS: {
      // let showMenu = action.showMenu;
      return Immutable.merge(state, {
        authorize: action.payload,
      });
    }
    case MENU.SUCCESS: {
      // let showMenu = action.showMenu;
      return Immutable.merge(state, {
        menu: action.payload,
      });
    }
    case USER_SIGNIN.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
        access_token: action.access_token,
        refresh_token: action.refresh_token,
        tokenExpireTime: moment(new Date()).add(59, "minutes").toDate(),
      });
    }
    case USER_SIGNUP.SUCCESS: {
      return Immutable.merge(state, { data: action.data });
    }
    case USER_UPDATE_PASSWORD.SUCCESS: {
      let newToken = _.cloneDeep(state.access_token);
      newToken = action.token;

      return Immutable.merge(state, {
        access_token: newToken,
      });
    }
    case UPDATE_USER_PROFILE.SUCCESS: {
      let tempData = _.cloneDeep(state.data);

      tempData = action.data;
      // console.log("check", tempData);

      return Immutable.merge(state, {
        data: tempData,
      });
    }
    case USER_ID: {
      // console.log("action", action);
      return Immutable.merge(state, {
        user_id: action?.payload,
      });
    }
    case GET_USER.SUCCESS: {
      return Immutable.merge(state, { user: { ...action.data } });
    }
    case SAVE_ANONYMOUS_ID:
      return Immutable.merge(state, { anonymous_id: action.payload.id });
    case USER_SIGNOUT.SUCCESS:
      return initialState;
    case GET_USER_ADDRESS.SUCCESS:
      return Immutable.merge(state, { address: action.payload });
    case GET_BILLING_ADDRESS.SUCCESS:
      return Immutable.merge(state, { billingAddress: action.payload });
    case GET_PICKUP_ADDRESS.SUCCESS:
      return Immutable.merge(state, { pickupAddress: action.payload });
    case GET_CUSTOMER_PROFILE.SUCCESS:
      return Immutable.merge(state, { profileCustomer: action.payload });
    case CREATE_CUSTOMER_PROFILE.SUCCESS:
      return Immutable.merge(state, { profile: action.payload });
    case UPLOAD_EMIRATES_IMAGES.SUCCESS:
      return Immutable.merge(state, { result: action.payload });
    case UPLOAD_PASSPORT_IMAGES.SUCCESS:
      return Immutable.merge(state, { result: action.payload });
    case UPLOAD_INSURANCE_IMAGES.SUCCESS:
      return Immutable.merge(state, { result: action.payload });
    case UPLOAD_TOPUP_IMAGES.SUCCESS:
      return Immutable.merge(state, { result: action.payload });

    case USER_DETAIL:
      return Immutable.merge(state, { userDetail: action.payload });
    case RESTUARANT_DETAIL:
      return Immutable.merge(state, { restuarantDetail: action.payload });
    // case SAVE_CORDS:
    //   return Immutable.merge(state, {restuarantDetail: action.payload});

    case USER_POSITION:
      return Immutable.merge(state, {userPosition: action.payload});
    case UPDATE_USER_ADDRESS:
      return Immutable.merge(state, { userAddress: action.payload });
    default:
      return state;
  }
};
