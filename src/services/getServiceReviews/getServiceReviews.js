import httpService from "../https.service";

export const getServiceReviews = (id) => {
  return httpService.get(`ratingReviews/getServiceReviews/${id}`);
};