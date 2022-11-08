const express = require('express');
const router = express.Router();
const {ProductsController} = require('./../controller/products');
const { stock } = require('./../helper/stock')
const { protect } = require("../middleware/auth");
const upload  = require("../middleware/upload");
const {hitCache,clearCache}  = require("../middleware/redis");


router.get('/',protect,ProductsController.getProduct);
router.get('/:id',protect,hitCache,ProductsController.getProductsDetail);
router.post('/',protect,upload.single('photo'),ProductsController.insert);
router.put('/:id',protect,clearCache,ProductsController.update);
router.delete('/:id',protect,clearCache,ProductsController.delete);

module.exports = router;