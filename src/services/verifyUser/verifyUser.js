import httpService from "../https.service";

export const verifyUser = (token) => {
  return httpService.patch(`customerAuth/verification/${token}`);
};