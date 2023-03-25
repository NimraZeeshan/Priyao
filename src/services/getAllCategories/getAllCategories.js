import httpService from "../https.service";

export const getAllCategories = () => {
  return httpService.get(`category`);
};