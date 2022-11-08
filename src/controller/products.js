const ModelProducts = require('./../model/products');
const {response} = require('../middleware/common');
const client = require("../config/redis");

const ProductsController = {

  getProduct:(req,res,next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const sort = req.query.sort|| 'ASC';
    const sortBy = req.query.sortBy || 'id';
    const search = req.query.search || '';
    ModelProducts.selectData(sortBy, sort, limit, page, search)
    .then((result)=> response(res, 200, true, result.rows, "get data success"))
    .catch((err)=> response(res, 404, false, err, "get data fail"))
  },

  getProductsDetail:(req,res,next) => {
    ModelProducts.selectDataById(req.params.id)
    .then((result)=>{
      client.setEx(`product/${req.params.id}`,60*60,JSON.stringify(result.rows))
       response(res, 200, true, result.rows, "get data success")
    })
    .catch((err)=> response(res, 404, false, err, "get data fail"))
  },

  insert:(req,res,next) => {
    const Port = process.env.PORT;
    const Host = process.env.HOST;
    const photo = req.file.filename;
    // console.log(req.file.filename)
    const uri = `http://${Host}:${Port}/img/${photo}`
    req.body.photo = uri
    // console.log(uri)
    req.body.id = parseInt(req.body.id)
    req.body.price = parseInt(req.body.price)
    req.body.stock = parseInt(req.body.stock)
    req.body.category_id = parseInt(req.body.category_id)
    ModelProducts.insertData(req.body)
    .then((result)=> response(res, 200, true, result.rows, "input data success"))
    .catch((err)=> response(res, 404, false, err, "input data fail"))
  },

  update:(req,res,next) => {
    const Port = process.env.PORT;
    const Host = process.env.HOST;
    const photo = req.file.filename;
    // console.log(req.file.filename)
    const uri = `http://${Host}:${Port}/img/${photo}`
    req.body.photo = uri
    // console.log(uri)
    // req.body.id = parseInt(req.body.id)
    req.body.price = parseInt(req.body.price)
    req.body.stock = parseInt(req.body.stock)
    req.body.category_id = parseInt(req.body.category_id)
    ModelProducts.updateData(req.params.id,req.body)
    .then((result)=> response(res, 200, true, result.rows, "update data success"))
    .catch((err)=> response(res, 404, false, err, "update data fail"))
  },

  delete:(req,res,next) => {
    ModelProducts.deleteData(req.params.id)
    .then((result)=> response(res, 200, true, result.rows, "delete data success"))
    .catch((err)=> response(res, 404, false, err, "delete data fail"))
  },

}

exports.ProductsController = ProductsController