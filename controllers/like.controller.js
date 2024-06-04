const {
  getLikesByProductId,
  createOrUpdateLike,
} = require("../models/like.model");

const getLikes = async (req, res) => {
  const id = req.params.id;
  const result = await getLikesByProductId(id);
  res.send(result);
};

const addOrUpdateLike = async (req, res) => {
  const likedItem = req.body;
  const result = await createOrUpdateLike(likedItem);
  res.send(result);
};

module.exports = { getLikes, addOrUpdateLike };
