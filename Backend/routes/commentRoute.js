const {
  createCommentCtrl,
  getAllCommentsCtrl,
  deleteCommentsCtrl,
  updateCommentCtrl,
} = require("../controllers/commentController");
const vaildateObjectld = require("../middlewares/vaildateObjectld");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

// api/comment
router
  .route("/")
  .post(verifyToken, createCommentCtrl)
  .get(verifyTokenAndAdmin, getAllCommentsCtrl);

// api/comment/:id
router
  .route("/:id")
  .delete(vaildateObjectld, verifyToken, deleteCommentsCtrl)
  .put(vaildateObjectld, verifyToken, updateCommentCtrl);

module.exports = router;
