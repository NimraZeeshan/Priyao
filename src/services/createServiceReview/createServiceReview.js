import httpService from "../https.service";

export const createServiceReview = (body) => {
  return httpService.post("ratingReviews/servicesReviews", body);
};