import httpService from "../https.service";

export const createBusinessReview = (body) => {
  return httpService.post("ratingReviews/createReview", body);
};