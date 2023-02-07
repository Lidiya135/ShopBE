const express = require('express');
const router = express.Router();
const {categoryController} = require('./../controller/category');
// const { protect } = require("../middleware/auth");

router.get('/',categoryController.getCategory);
router.post('/',categoryController.insert);
router.put('/:id',categoryController.update);
router.delete('/:id',categoryController.delete);

// router.get('/',protect,categoryController.getCategory);
// router.post('/',protect,categoryController.insert);
// router.put('/:id',protect,categoryController.update);
// router.delete('/:id',protect,categoryController.delete);
router.get('/:id',categoryController.getCategoryById);

module.exports = router;