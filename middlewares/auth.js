const jwt = require("jsonwebtoken");
const { client } = require("../config/db");
const userCollection = client.db("TechBookDB").collection("users");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "forbidden" });
  }
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
  const user = await userCollection.findOne({ email });
  if (user?.role !== "admin") {
    return res.status(403).send({ message: "forbidden" });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
