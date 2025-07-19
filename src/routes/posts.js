const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");

router.get("/", PostController.getAllPosts);
router.get("/search", PostController.searchPosts);
router.get("/:id", PostController.getPostById);
router.post("/", PostController.createPost);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);

module.exports = router;