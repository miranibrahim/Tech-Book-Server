const express = require("express");
const router = express.Router();
const { generateToken } = require("../controllers/auth.controller");

router.post("/jwt", generateToken);

module.exports = router;
