import httpService from "../https.service";

export const getBookings = (param) => {
  return httpService.get(`booking/getMyBookings?${param}=1`);
};