import httpService from "../https.service";

export const changePassword = (body) => {
  return httpService.patch("customerAuth/changePassword", body);
};
