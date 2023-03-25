import httpService from "../https.service";

export const userInfo = () => {
  return httpService.get(`customerAuth/getMe`);
};