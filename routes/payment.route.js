const express = require("express");
const router = express.Router();
const {
  createPaymentIntent,
  getPayments,
  addPayment,
} = require("../controllers/payment.controller");
const { verifyToken } = require("../middlewares/auth");

router.post("/create-payment-intent", createPaymentIntent);
router.get("/:email", verifyToken, getPayments);
router.post("/", addPayment);

module.exports = router;
