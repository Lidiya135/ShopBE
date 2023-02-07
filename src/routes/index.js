const express = require('express');
const router = express.Router();
const ProductRouter = require('../routes/products');
const UsersRouter = require('../routes/users');
const TransactionsRouter = require('../routes/transactions');
const CategoryRouter = require('../routes/category');

router.use('/category', CategoryRouter);
router.use('/products', ProductRouter);
router.use('/users',UsersRouter);
router.use('/transactions',TransactionsRouter);

module.exports = router;