const express = require("express");
const carsController = require("../controller/cars.controller");
const { uploadImages } = require("../middleware/cars.images.middleware");
const authMiddleware = require("../middleware/auth.middleware");

function getCarsRoutes() {
  const router = express.Router();

  router.use(express.json());

  router.post("/", uploadImages, authMiddleware, carsController.addCar);
  router.get("/latest", carsController.getLastSixCars);
  router.get("/", carsController.getAllCars);
  router.get("/brandsCarCount", carsController.getBrandsWithCarCount);
  router.get("/pagination", carsController.getPagination);
  router.get("/:id", carsController.getCarById);
  router.get("/sortBrand/:id", carsController.sortCarByBrands);
  router.get("/paginationBrand/:id", carsController.sortCarByBrandsPagination);
  router.delete("/:id", authMiddleware, carsController.deleteCar);
  router.patch("/:id", uploadImages, authMiddleware, carsController.updateCar);

  return router;
}

module.exports = getCarsRoutes();
