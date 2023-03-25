import httpService from "../https.service";

export const userSignup = (body) => {
  return httpService.post("customerAuth/signup", body);
};
