// @flow
import Immutable from "seamless-immutable";
import {
  TERMS_AND_CONDITION,
  PRIVACY_POLICY,
  ABOUT_US,
  GET_APPLICATION_SETTINGS,
  GET_FAQS,
  GET_GOOGLE_MAP,
  PRECRIPTION_DATA_LOAD,
} from "../actions/ActionTypes";

const initialState = Immutable({
  termsData: [],
  privacyData: [],
  aboutData: [],
  appSettingsData: {},
  faqsData: [],
  serverTime: {},
  googleMapData: {},
  prescription_refresh: { load: null },
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case GET_FAQS.SUCCESS:
      return Immutable.merge(state, {
        faqsData: action.data,
      });
    case GET_APPLICATION_SETTINGS.SUCCESS:
      return Immutable.merge(state, {
        appSettingsData: action.data.appInfo,
        serverTime: action.data.serverTime,
      });
    case TERMS_AND_CONDITION.SUCCESS:
      return Immutable.merge(state, {
        termsData: action.data,
      });
    case ABOUT_US.SUCCESS:
      return Immutable.merge(state, {
        aboutData: action.data,
      });
    case PRIVACY_POLICY.SUCCESS:
      return Immutable.merge(state, {
        privacyData: action.data,
      });
    case GET_GOOGLE_MAP.SUCCESS:
      return Immutable.merge(state, {
        googleMapData: action.data,
      });
    case PRECRIPTION_DATA_LOAD.SUCCESS:
      return Immutable.merge(state, {
        prescription_refresh: action.data,
      });
    default:
      return state;
  }
};
