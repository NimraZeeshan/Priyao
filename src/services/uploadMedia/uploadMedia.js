import httpService from "../https.service";

export const uploadMedia = (body) => {
  return httpService.post("media/upload", body);
};
