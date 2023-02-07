const modelTransaction = require("../model/transactions");
const { response } = require("../middleware/common");

const transactionController = {
 
  getTransByUser: async (req, res) => {
    try {
      const users_id = req.payload.id;
      console.log("id user", users_id);
      const result = await modelTransaction.selectByUser(users_id);
      response(res, 200, true, result.rows, "Get transaction success");
    } catch (err) {
      response(res, 404, false, err, "Get transaction fail");
    }
  },
  getTransDetail: (req, res) => {
    modelTransaction
      .selectById(req.params.id)
      .then((result) => 
      response(res, 200, true, result.rows, "Get detail transaction success")
      )
      .catch((err) =>
        response(res, 404, false, err, "Get detail transaction failed")
      );
  },
  insertTrans: async (req, res) => {
    try {
      const users_id = req.payload.id;
      console.log("id user", users_id);
      console.log(req.body, "bforee")
      req.body.products_id = parseInt(req.body.products_id);
      req.body.amount = parseInt(req.body.amount);
      req.body.total = parseInt(req.body.total);
      console.log(req.body, "tenbghh")
      await modelTransaction.insert(users_id, req.body);
      return response(res, 200, true, req.body, "Input transaction success");
    } catch (err) {
      console.log(err);
      return response(res, 404, false, err, "Input transaction fail");
    }
  },
};

exports.transactionController = transactionController;
