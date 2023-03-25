import httpService from "../https.service";

export const getSubCategories = (id) => {
  return httpService.get(`subCategory/getSubcategoryByCategory/${id}`);
};