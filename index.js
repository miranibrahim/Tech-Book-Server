const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// Routes
const couponRoutes = require("./routes/coupon.route");
const paymentRoutes = require("./routes/payment.route");
const productRoutes = require("./routes/product.route");
const reportRoutes = require("./routes/report.route");
const reviewRoutes = require("./routes/review.route");
const userRoutes = require("./routes/user.route");
const likeRoutes = require("./routes/like.route");
const authRoutes = require("./routes/auth.route");

app.use("/coupons", couponRoutes);
app.use("/payments", paymentRoutes);
app.use("/products", productRoutes);
app.use("/reports", reportRoutes);
app.use("/reviews", reviewRoutes);
app.use("/users", userRoutes);
app.use("/likes", likeRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("server is running!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
