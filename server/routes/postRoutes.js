const express = require("express");
const router = express.Router();
const { getPosts, setPosts } = require("../controllers/postController");

const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getPosts).post(protect, setPosts);


module.exports = router;
