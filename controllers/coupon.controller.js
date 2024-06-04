const { getAllCoupons, getCouponByCode, createCoupon, deleteCoupon } = require("../models/coupon.model");

const getCoupons = async (req, res) => {
  const result = await getAllCoupons();
  res.send(result);
};

const getCoupon = async (req, res) => {
  const couponCode = req.params.couponCode;
  const result = await getCouponByCode(couponCode);
  res.send(result);
};

const addCoupon = async (req, res) => {
  const couponItem = req.body;
  const result = await createCoupon(couponItem);
  res.send(result);
};

const removeCoupon = async (req, res) => {
  const id = req.params.id;
  const result = await deleteCoupon(id);
  res.send(result);
};

module.exports = { getCoupons, getCoupon, addCoupon, removeCoupon };
