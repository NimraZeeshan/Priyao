import httpService from "../https.service";

export const updateProfile = (body) => {
  return httpService.patch(`customerAuth/updateProfile`,body);
};