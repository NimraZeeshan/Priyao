import httpService from "../https.service";

export const getNearbyServices = (long,lat) => {
  return httpService.get(`businessServices/nearByService/${long}/${lat}?page=1&limit=1`);
};