import httpService from "../https.service";

export const getServicesBySubcategory = (id) => {
  return httpService.get(`businessServices/getServicesBySubCategory/${id}`);
};