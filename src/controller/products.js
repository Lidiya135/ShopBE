const ModelProducts = require('./../model/products');
const {response} = require('../middleware/common');
// const client = require("../config/redis");
const { v4: uuidv4, stringify } = require('uuid'); 
const cloudinary = require('../config/cloudinary');

const ProductsController = {

  getProduct:(req,res,next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sort = req.query.sort|| 'asc';
    const sortBy = req.query.sortBy || 'name';
    const search = req.query.search || '';
    ModelProducts.selectData(sortBy, sort, limit, page, search)
    .then((result)=> response(res, 200, true, result.rows, "get data success"))
    .catch((err)=> response(res, 404, false, err, "get data fail"))
  },

  getProductsDetail:(req,res,next) => {
    ModelProducts.selectDataById(req.params.id)
    .then((result)=>{
      // client.setEx(`product/${req.params.id}`,60*60,JSON.stringify(result.rows))
       response(res, 200, true, result.rows, "get data success")
    })
    .catch((err)=> response(res, 404, false, err, "get data fail"))
  },

  // insert:(req,res,next) => {
  //   const Port = process.env.PORT;
  //   const Host = process.env.HOST;
  //   const photo = req.file.filename;
  //   // console.log(req.file.filename)
  //   const uri = `http://${Host}:${Port}/img/${photo}`
  //   req.body.photo = uri
  //   // console.log(uri)
  //   // req.body.id = parseInt(req.body.id)
  //   req.body.price = parseInt(req.body.price)
  //   req.body.stock = parseInt(req.body.stock)
  //   req.body.category_id = parseInt(req.body.category_id)
  //   ModelProducts.insertData(req.body)
  //   .then((result)=> response(res, 200, true, result.rows, "input data success"))
  //   .catch((err)=> response(res, 404, false, err, "input data fail"))
  // },
  insert : async (req,res,next) => {
    const id =  uuidv4()
    req.body.price = parseInt(req.body.price)
    req.body.stock = parseInt(req.body.stock)
    req.body.category_id = parseInt(req.body.category_id)
    const data = {
        id,
        name: req.body.name,
        price : req.body.price,
        stock : req.body.stock,
        category_id : req.body.category_id,
        description: req.body.description 
    }
    console.log(req.file, "reqfileeee")
    if (req.file) {
        const image = await cloudinary.uploader.upload(req.file.path, {
          folder: 'products_blanja',
        });

        data.photo = image.url;
      } else {
        data.photo = products.photo;
      }
      
    console.log(data)
    ModelProducts.insertData(data)
    .then(result => response(res,200,true,result.rows,'Insert data succes'))
    .catch(err => response(res,404,false,err,'insert data fail'))
},

  // update:(req,res,next) => {
  //   const Port = process.env.PORT;
  //   const Host = process.env.HOST;
  //   const photo = req.file.filename;
  //   console.log(photo, "filenameeee")
  //   const uri = `http://${Host}:${Port}/img/${photo}`
  //   req.body.photo = uri
  //   // console.log(uri)
  //   // req.body.id = parseInt(req.body.id)
  //   req.body.price = parseInt(req.body.price)
  //   req.body.stock = parseInt(req.body.stock)
  //   req.body.category_id = parseInt(req.body.category_id)
  //   ModelProducts.updateData(req.params.id,req.body)
  //   .then((result)=> response(res, 200, true, result.rows, "update data success"))
  //   .catch((err)=> response(res, 404, false, err, "update data fail"))
  // },

  updatee: async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id);
        req.body.price = parseInt(req.body.price)
        req.body.stock = parseInt(req.body.stock)
        req.body.category_id = parseInt(req.body.category_id)
        console.log(req.body,"beforeee")
        console.log(req.files, "reqfile")
        if (req.file) {
          const image = await cloudinary.uploader.upload(req.file.path, {
            folder: 'products_blanja',
          });
          req.body.photo = image.url;
        } else {
          req.body.photo = products.photo;
        }

        console.log(req.body, "tengh")
        
        const updateProduct = await ModelProducts.updateData(id, req.body)
        console.log(req.body)
        response(res, 200, true, updateProduct.rows, 'update users success')
    } catch (err) {
        response(res, 404, false, err.message, 'update users fail ')
    }
},

update : async (req,res,next) => {
  try{
      req.body.stock = parseInt(req.body.stock) 
      req.body.price = parseInt(req.body.price)
      req.body.category_id = parseInt(req.body.category_id)
      // console.log(req.body, "bfore")
      // console.log(req.body.file,"reqnodyfile")
      // console.log(req.file,"reqfile")
      if (req.file) {
          const image = await cloudinary.uploader.upload(req.file.path, {
            folder: 'products_blanja',
          });
  
          req.body.photo = image.url;
        } else {
          req.body.photo = products.photo;
        }

        console.log(req.body, "tngah")
      const result = await ModelProducts.updateData(req.params.id,req.body)
      console.log(req.body)
      response(res,200,true,result.rows,'update product success')
  } catch (err) {
      response(res,404,err.message,'update product fail ')
  }
},
  delete:(req,res,next) => {
    ModelProducts.deleteData(req.params.id)
    .then((result)=> response(res, 200, true, result.rows, "delete data success"))
    .catch((err)=> response(res, 404, false, err, "delete data fail"))
  },
}

exports.ProductsController = ProductsController