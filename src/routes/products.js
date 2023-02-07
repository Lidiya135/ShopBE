const express = require('express');
const router = express.Router();
const {ProductsController} = require('./../controller/products');
// const { stock } = require('./../helper/stock');
const { protect } = require("../middleware/auth");
const upload= require("../middleware/upload");
// const {hitCache,clearCache}  = require("../middleware/redis");

// router.get('/',ProductsController.getProduct);
// router.get('/:id',ProductsController.getProductsDetail);
router.put('/:id',upload.single('photo'),ProductsController.update);
router.post('/',upload.single('photo'),ProductsController.insert);
router.delete('/:id',ProductsController.delete);

router.get('/',protect,ProductsController.getProduct);
router.get('/:id',protect,ProductsController.getProductsDetail);
// router.post('/',protect,upload.single('photo'),ProductsController.insert);
// router.put('/:id',protect,upload.single('photo'),ProductsController.update);
router.delete('/:id',protect,ProductsController.delete);

module.exports = router;