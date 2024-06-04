const { ObjectId } = require("mongodb");
const { client } = require("../config/db");

const productCollection = client.db("TechBookDB").collection("products");

const getAllProducts = async () => await productCollection.find().toArray();
const getProductById = async (id) => await productCollection.findOne({ _id: new ObjectId(id) });
const createProduct = async (product) => await productCollection.insertOne(product);
const updateProduct = async (id, updatedProduct) => await productCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedProduct });
const deleteProduct = async (id) => await productCollection.deleteOne({ _id: new ObjectId(id) });

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
