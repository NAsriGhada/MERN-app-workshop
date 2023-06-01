const express = require("express");
const router = express.Router();
const { Register, Login, getMe } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", Register);
router.post("/login", Login);
router.get("/me", protect, getMe);

module.exports = router;
