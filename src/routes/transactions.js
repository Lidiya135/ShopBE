const express = require('express');
const router = express.Router();
const {transactionsController} = require('./../controller/transactions');

router.get('/',transactionsController.getTransactions);
router.post('/',transactionsController.insert);
router.put('/:id',transactionsController.update);
router.delete('/:id',transactionsController.delete);

module.exports = router;