const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  addProduct,
  modifyProduct,
  removeProduct,
} = require("../controllers/product.controller");
const { verifyToken, verifyAdmin } = require("../middlewares/auth");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", verifyToken, verifyAdmin, addProduct);
router.patch("/:id", verifyToken, verifyAdmin, modifyProduct);
router.delete("/:id", verifyToken, verifyAdmin, removeProduct);

module.exports = router;
