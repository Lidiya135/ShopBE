const {response} = require('../middleware/common');
const {create, findEmail, insertUser, updateUser, findUser, updatePhoto, deleteUser, getUserById} = require('../model/users');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } =  require('uuid');
const {generateToken, genRefreshToken} = require('../helper/auth');
const modelUsers = require("../model/users");
const cloudinary = require('../config/cloudinary')

const usersController = {
    insert: async  (req, res, next) => {
        let {rows:[users]} = await findEmail(req.body.email)
        // console.log('role',req.params.role)
        // let role = req.params.role

        if(users){
            return response(res, 404, false, "email already use"," register fail") 
        }

        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(req.body.password);
        let data = {
            id : uuidv4(),
            email : req.body.email,
            password ,
            fullname : req.body.fullname,
            role : req.params.role,
        }
        try{
            const result = await create(data)
            if(result){
                console.log(result)
                response(res, 200, true, true, "register success")
            }
        } catch(err){
            console.log(err)
            response(res, 404, false, err," register fail")
        }
    },

    login: async (req,res,next)=>{
        // console.log('email',req.body.email)
        // console.log('password',req.body.password)
        let {rows:[users]} = await findEmail(req.body.email)
        if(!users){
            return response(res, 404, false, null," email not found")
        }
        const password = req.body.password
        const validation = bcrypt.compareSync(password,users.password)
        if(!validation){
            return response(res, 404, false, null,"wrong password")
        }
        delete users.password
        let payload = {
            id: users.id,
            email: users.email,
            role: users.role
        }
        users.token = generateToken(payload)
        users.refreshToken = genRefreshToken(payload)
        response(res, 200, false, users,"login success")
    },

    getUser: async (req, res, next) => {
        try {
          const id = req.payload.id;
          console.log(id);
          const result = await modelUsers.getUserById(id);
          response(res, 200, true, result.rows, "Success Get User By Id");
        } catch (error) {
          response(res, 400, false, error, "Get User By Id Fail");
        }
      },

      update: async (req, res, next) => {
        try {
            const id = req.params.id;
            console.log(req.file,"reqfile")
              if (req.file) {
                const image = await cloudinary.uploader.upload(req.file.path, {
                  folder: 'products_blanja',
                });
        
                req.body.photo = image.url;
              } else {
                req.body.photo = users.photo;
              }
        
            const updateDataUser = await updateUser(id, req.body)
            console.log(req.body)
            response(res, 200, true, updateDataUser.rows, 'update users success')
        } catch (err) {
            response(res, 404, false, err.message, 'update users fail ')
        }
    },
}



exports.usersController = usersController;