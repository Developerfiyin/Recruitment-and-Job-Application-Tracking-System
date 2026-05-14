const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/create", userController.createUser);
router.get("/user/all", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.put("/user/:id", userController.updateUserById);
router.delete("/user/:id", userController.deleteUserById);

module.exports = router;
