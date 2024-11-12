const express = require("express");
const brandController = require("../controller/brand.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { brandImage } = require("../middleware/brand.middleware");

function getBrandRoutes() {
  const router = express.Router();

  router.use(express.json());

  router.post("/", authMiddleware, brandImage, brandController.addBrand);
  router.get("/", brandController.getAllBrands);
  router.get("/:id", brandController.getBrandById);
  router.delete("/:id", authMiddleware, brandController.deleteBrand);
  router.patch("/:id", authMiddleware, brandImage, brandController.updateBrand);

  return router;
}

module.exports = getBrandRoutes();