const express = require("express");
const router = express.Router();
const { getLikes, addOrUpdateLike } = require("../controllers/like.controller");
const { verifyToken } = require("../middlewares/auth");

router.get("/:id", getLikes);
router.post("/", verifyToken, addOrUpdateLike);

module.exports = router;
