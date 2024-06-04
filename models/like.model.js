const { client, ObjectId } = require("../config/db");
const likeCollection = client.db("TechBookDB").collection("likes");
const productCollection = client.db("TechBookDB").collection("products");

const getLikesByProductId = async (productId) =>
  await likeCollection.findOne({ product_id: productId });

const createOrUpdateLike = async (likedItem) => {
  const { product_id, user_email } = likedItem;
  const response = {};

  const existInProducts = await productCollection.findOne({
    _id: new ObjectId(product_id),
  });
  if (existInProducts) {
    response.productResult = await productCollection.updateOne(
      { _id: new ObjectId(product_id) },
      { $inc: { upvoteCount: 1 } }
    );
  }

  const existInLike = await likeCollection.findOne({ product_id });
  if (existInLike) {
    response.likeResult = await likeCollection.updateOne(
      { product_id },
      { $addToSet: { user_emails: user_email }, $inc: { voteCount: 1 } }
    );
  } else {
    response.likeResult = await likeCollection.insertOne({
      product_id,
      user_emails: [user_email],
      voteCount: 1,
    });
  }
  return response;
};

module.exports = { getLikesByProductId, createOrUpdateLike };
