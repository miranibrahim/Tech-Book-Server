const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  addUser,
  promoteUserToAdmin,
  updateUserRole,
} = require("../controllers/user.controller");
const { verifyToken, verifyAdmin } = require("../middlewares/auth");

router.get("/", getUsers);
router.get("/:email", getUser);
router.post("/", addUser);
router.patch("/admin/:id", verifyToken, verifyAdmin, promoteUserToAdmin);
router.patch("/:email", verifyToken, verifyAdmin, updateUserRole);

module.exports = router;
