const express = require("express");
const userController = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { uploadImage } = require("../middleware/user.images.middleware");

function getUserRoutes() {
  const router = express.Router();

  router.use(express.json());
  router.post("/login", userController.loginUser);

  router.use(authMiddleware);

  router.post("/register", uploadImage, userController.registerUser);
  router.get("/roles", userController.getUserRoles);
  router.get("/", userController.getAllUsers);
  router.get("/signgnedUser", userController.getSignedUser);
  router.get("/:id", userController.getUserById);
  router.patch("/:id", uploadImage, userController.updateUser);
  router.delete("/:id", userController.deleteUser);

  return router;
}

module.exports = getUserRoutes();
