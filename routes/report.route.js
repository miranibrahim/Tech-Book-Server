const express = require("express");
const router = express.Router();
const {
  getReports,
  getReport,
  addOrUpdateReport,
  removeReport,
} = require("../controllers/report.controller");
const { verifyToken } = require("../middlewares/auth");

router.get("/", getReports);
router.get("/:id", getReport);
router.post("/", verifyToken, addOrUpdateReport);
router.delete("/moderator/:id", verifyToken, removeReport);

module.exports = router;
