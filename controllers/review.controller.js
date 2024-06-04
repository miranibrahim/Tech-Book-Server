const {
  getReviewsByProductId,
  createReview,
} = require("../models/review.model");

const getReviews = async (req, res) => {
  const id = req.params.id;
  const result = await getReviewsByProductId(id);
  res.send(result);
};

const addReview = async (req, res) => {
  const reviewItem = req.body;
  const result = await createReview(reviewItem);
  res.send(result);
};

module.exports = { getReviews, addReview };
