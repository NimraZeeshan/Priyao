import httpService from "../https.service";

export const bookAppointment = (body) => {
  return httpService.post("booking/createBooking", body);
};