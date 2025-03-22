const express = require("express");
const { registerUser, loginUser, currentUserInfo } = require("../Controlllers/userControllers");
const validateToken = require("../Middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken ,currentUserInfo);

module.exports = router;