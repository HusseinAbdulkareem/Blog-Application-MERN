const router = require("express").Router();
const {
  createCategoryCtrl,
  getAllCategoryCtrl,
  deleteCategoryCtrl,
} = require("../controllers/categorysController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const vaildateObjectld = require("../middlewares/vaildateObjectld");
// api/categorys
router
  .route("/")
  .post(verifyTokenAndAdmin, createCategoryCtrl)
  .get(getAllCategoryCtrl);

// api/categorys/:id
router
  .route("/:id")
  .delete(vaildateObjectld, verifyTokenAndAdmin, deleteCategoryCtrl);

module.exports = router;
