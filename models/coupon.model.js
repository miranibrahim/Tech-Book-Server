const { ObjectId } = require("mongodb");
const { client } = require("../config/db");

const couponCollection = client.db("TechBookDB").collection("coupons");

const getAllCoupons = async () => await couponCollection.find().toArray();
const getCouponByCode = async (code) => await couponCollection.findOne({ couponCode: code });
const createCoupon = async (coupon) => await couponCollection.insertOne(coupon);
const deleteCoupon = async (id) => await couponCollection.deleteOne({ _id: new ObjectId(id) });

module.exports = { getAllCoupons, getCouponByCode, createCoupon, deleteCoupon };
