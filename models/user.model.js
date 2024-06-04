const { client, ObjectId } = require("../config/db");
const userCollection = client.db("TechBookDB").collection("users");

const getAllUsers = async () =>
  await userCollection.find().sort({ role: 1 }).toArray();
const getUserByEmail = async (email) => await userCollection.findOne({ email });
const createUser = async (user) => {
  const query = { email: user.email };
  const isExist = await userCollection.findOne(query);
  if (isExist) {
    return { message: "user exists", insertedId: null };
  }
  return await userCollection.insertOne(user);
};
const updateUserRoleById = async (id, role) =>
  await userCollection.updateOne({ _id: new ObjectId(id) }, { $set: { role } });
const updateUserRoleByEmail = async (email, role) =>
  await userCollection.updateOne({ email }, { $set: { role } });

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUserRoleById,
  updateUserRoleByEmail,
};
