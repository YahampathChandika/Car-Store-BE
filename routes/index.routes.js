const express = require("express");

const carsRoute = require("./cars.routes");
const userRoutes = require("./user.routes");
const inquiryRoutes = require("./inquiry.routes");
const brandRoutes = require("./brand.routes");

function routes() {
  const router = express.Router();

  router.use("/users", userRoutes);
  router.use("/cars", carsRoute);
  router.use("/inquiries", inquiryRoutes);
  router.use("/brands", brandRoutes);
  

  return router;
}

module.exports = routes();
