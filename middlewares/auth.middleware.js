const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../models/user.model");

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "forbidden" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "forbidden" });
    }
    req.decoded = decoded;
    next();
  });
};

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const user = await getUserByEmail(email);
  const isAdmin = user?.role === "admin";
  if (!isAdmin) {
    return res.status(403).send({ message: "forbidden" });
  }
  next();
};

const verifyModerator = async (req, res, next) => {
  const email = req.decoded.email;
  const user = await getUserByEmail(email);
  const isModerator = user?.role === "moderator";
  if (!isModerator) {
    return res.status(403).send({ message: "forbidden" });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin, verifyModerator };
