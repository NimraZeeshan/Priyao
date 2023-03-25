import httpService from "../https.service";

export const getBusinessReviews = (id) => {
  return httpService.get(`ratingReviews/getReviews/${id}`);
};