const {
  getPaymentsByEmail,
  createPayment,
} = require("../models/payement.model");
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);

const createPaymentIntent = async (req, res) => {
  const { price } = req.body;
  const amount = parseInt(price * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: paymentIntent.client_secret });
};

const getPayments = async (req, res) => {
  const email = req.params.email;
  if (req.params.email !== req.decoded.email) {
    return res.status(403).send({ message: "forbidden access" });
  }
  const result = await getPaymentsByEmail(email);
  res.send(result);
};

const addPayment = async (req, res) => {
  const paymentInfo = req.body;
  const result = await createPayment(paymentInfo);
  res.send({ paymentResult: result });
};

module.exports = { createPaymentIntent, getPayments, addPayment };
