const modelCategory = require('./../model/category');
const {response} = require('../middleware/common');

const categoryController = {

  getCategory:(req,res,next) => {
    modelCategory.selectData()
    .then((result)=> response(res, 200, true, result.rows, "get data success"))
    .catch((err)=> response(res, 404, false, err, "get data fail"))
  },

  insert:(req,res, next) => {
    console.log(req.body.name)
    modelCategory.insertData(req.body)
    .then((result)=> response(res, 200, true, result.rows, "input data success"))
    .catch((err)=> response(res, 404, false, err, "input data fail"))
  },
  
  update:(req,res,next) => {
    modelCategory.updateData(req.params.id,req.body.name)
    .then((result)=> response(res, 200, true, result.rows, "update data success"))
    .catch((err)=> response(res, 404, false, err, "update data fail"))
  },

  delete:(req,res,next) => {
    modelCategory.deleteData(req.params.id)
    .then((result)=> response(res, 200, true, result.rows, "delete data success"))
    .catch((err)=> response(res, 404, false, err, "delete data fail"))
  },

  getCategoryById:(req,res,next) => {
    modelCategory.selectDataById(req.params.id)
    .then((result)=> response(res, 200, true, result.rows, "get data success"))
    .catch((err)=> response(res, 404, false, err, "get data fail"))
  },
};

exports.categoryController = categoryController;