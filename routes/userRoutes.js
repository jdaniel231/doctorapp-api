const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");


// Login route
router.post("/login", userController.login);

// Register route
router.post("/register", userController.register);

//Auth route
router.post("/getUserData", authMiddleware, userController.auth);


module.exports = router;