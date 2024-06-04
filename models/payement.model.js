const { client } = require("../config/db");

const paymentCollection = client.db("TechBookDB").collection("payments");

const getPaymentsByEmail = async (email) => await paymentCollection.find({ email }).toArray();
const createPayment = async (paymentInfo) => await paymentCollection.insertOne(paymentInfo);

module.exports = { getPaymentsByEmail, createPayment };
