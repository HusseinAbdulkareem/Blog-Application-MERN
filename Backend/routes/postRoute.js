const router = require("express").Router();
const {
  createPostCtrl,
  getAllPostCtrl,
  getSinglePostCtrl,
  getPostCountCtrl,
  DeletePostCtrl,
  updatePostCtrl,
  toggleLikeCtrl,
} = require("../controllers/PostController");
const photoUpload = require("../middlewares/photoUpload");
const { verifyToken } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/vaildateObjectld");

// api/posts
router
  .route("/")
  .post(verifyToken, photoUpload.single("image"), createPostCtrl)
  .get(getAllPostCtrl);

// api/post count
router.route("/count").get(getPostCountCtrl);

// api/post/:id
router
  .route("/:id")
  .get(validateObjectId, getSinglePostCtrl)
  .delete(validateObjectId, verifyToken, DeletePostCtrl)
  .put(validateObjectId, verifyToken, updatePostCtrl);

// api/posts/link/:id
router.route("/like/:id").put(validateObjectId, verifyToken, toggleLikeCtrl);

module.exports = router;
