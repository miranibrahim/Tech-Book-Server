const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../models/product.model");

const getProducts = async (req, res) => {
  const result = await getAllProducts();
  res.send(result);
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  const result = await getProductById(id);
  res.send(result);
};

const addProduct = async (req, res) => {
  const productItem = req.body;
  const result = await createProduct(productItem);
  res.send(result);
};

const modifyProduct = async (req, res) => {
  const id = req.params.id;
  const items = req.body;
  const updatedProduct = { ...items };
  const result = await updateProduct(id, updatedProduct);
  res.send(result);
};

const removeProduct = async (req, res) => {
  const id = req.params.id;
  const result = await deleteProduct(id);
  res.send(result);
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  modifyProduct,
  removeProduct,
};
