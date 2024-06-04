const express = require("express");
const router = express.Router();
const { getReviews, addReview } = require("../controllers/review.controller");
const { verifyToken } = require("../middlewares/auth");

router.get("/:id", getReviews);
router.post("/", verifyToken, addReview);

module.exports = router;
