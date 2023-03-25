import httpService from "../https.service";

export const getServicesByBusinessId = (id) => {
  return httpService.get(`businessServices/servicesByBusinessID/${id}`);
};