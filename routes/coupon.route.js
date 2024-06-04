const express = require('express');
const router = express.Router();
const { getCoupons, getCoupon, addCoupon, removeCoupon } = require('../controllers/coupon.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

router.get('/', getCoupons);
router.get('/:couponCode', getCoupon);
router.post('/', verifyToken, verifyAdmin, addCoupon);
router.delete('/:id', verifyToken, verifyAdmin, removeCoupon);

module.exports = router;
