const modelTransactions = require('./../model/transactions');
const {response} = require('../middleware/common');

const transactionsController = {

  getTransactions:(req,res,next) => {
    modelTransactions.selectData()
    .then((result)=> response(res, 200, true, result.rows, "get data success"))
    .catch((err)=> response(res, 404, false, err, "get data fail"))
  },
 
  update:(req,res,next) => {
    modelTransactions.updateData(req.params.id,req.body)
    .then((result)=> response(res, 200, true, result.rows, "get data success"))
    .catch((err)=> response(res, 404, false, err, "get data fail"))
  },

  delete:(req,res,next) => {
    modelTransactions.deleteData(req.params.id)
    .then((result)=> response(res, 200, true, result.rows, "get data success"))
    .catch((err)=> response(res, 404, false, err, "get data fail"))
  },

  insert:(req,res,next) => {
    modelTransactions.insertData(req.body)
    .then((result)=> response(res, 200, true, result.rows, "get data success"))
    .catch((err)=> response(res, 404, false, err, "get data fail"))
  },
};

exports.transactionsController = transactionsController;