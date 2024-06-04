const {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUserRoleById,
  updateUserRoleByEmail,
} = require("../models/user.model");

const getUsers = async (req, res) => {
  const result = await getAllUsers();
  res.send(result);
};

const getUser = async (req, res) => {
  const email = req.params.email;
  const result = await getUserByEmail(email);
  res.send(result);
};

const addUser = async (req, res) => {
  const user = req.body;
  const result = await createUser(user);
  res.send(result);
};

const promoteUserToAdmin = async (req, res) => {
  const id = req.params.id;
  const { role } = req.body;
  const result = await updateUserRoleById(id, role);
  res.send(result);
};

const updateUserRole = async (req, res) => {
  const email = req.params.email;
  const { role } = req.body;
  const result = await updateUserRoleByEmail(email, role);
  res.send(result);
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  promoteUserToAdmin,
  updateUserRole,
};
