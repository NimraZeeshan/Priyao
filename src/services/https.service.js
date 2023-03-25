import axios from "axios";
import util from "../config/utills/utils.helper";
// import utilsHelper from '../config/utills/utils.helper';
import {
  V1_BASE_URL,
  BASE_URL,
  BASE_PATH,
  REFRESH_TOKEN_URL,
  API_TIMEOUT,
} from "./config";

const instance = axios.create({
  baseURL: BASE_URL + BASE_PATH,
  headers: { "Content-Type": "application/json" },
  timeout: API_TIMEOUT,
});
// console.log("before interceptor");
instance.interceptors.request.use(async (config) => {
  var token = util.getCurrentUserAccessToken();
  // try {
  //   var currentSession = await Auth.currentSession()

  // } catch (error) {
    console.log('TOKEN---',token)
  // }
  // var token = currentSession ? currentSession.getIdToken()?.getJwtToken() : null;
  // console.log({ config });
  if (
    token
    // &&
    // config?.headers?.Authorization &&
    // config?.headers?.Authorization?.includes('Bearer')
  ) {
    // console.log("tokenhttpservice", tokennsss);
    // console.log("tokenhttpservice", token);

    config.headers = { ...config.headers, authorization: token };
  }
  return config;
});
export default instance;
