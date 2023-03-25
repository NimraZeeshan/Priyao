import httpService from "../https.service";

export const search = (type,text) => {
  return httpService.get(`businessServices/globalSearch?searchType=${type}&searchValue=${text}`);
};
