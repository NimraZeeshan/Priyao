import httpService from "../https.service";

export const getBusinessInfo = (id,long,lat) => {
  return httpService.get(`businessDetails/${id}?personLng=${long}&personLat=${lat}`);
};