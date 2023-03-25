import httpService from "../https.service";

export const userLogin = (body) => {
  return httpService.post("customerAuth/login", body);
};