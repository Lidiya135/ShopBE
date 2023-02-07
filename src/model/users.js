const Pool = require("./../config/db");

const create = (data) => {
    const {email,password,fullname,role} = data;
    return new Promise ((resolve,reject)=>
    Pool.query(`INSERT INTO users(email,password,fullname,role) VALUES('${email}','${password}','${fullname}','${role}')`,(err,result)=>{
    if(!err){
         resolve(result)
    } else {
        reject(err)
    }
}))
}

const findEmail = (email) => {
    return new Promise ((resolve,reject)=>
    Pool.query(`SELECT * FROM users where email='${email}'`,(err,result)=>{
    if(!err){
        resolve(result)
    } else {
        reject(err)
    }
}))
}

const insertUser = (data) =>{
    const {id, email, fullname, password, role, phone, id_status, gender, birth, user_address} = data
    return Pool.query(`INSERT INTO users(id, fullname, email, password, role, phone, id_status, gender, birth, user_address)VALUES('${id}', '${email}', '${fullname}', '${password}', '${role}', '${phone}', '${id_status}', '${gender}', '${birth}', '${user_address}' )`)
}

const updateUser = (id, data) =>{
    const {fullname, email, phone, photo, gender, birth,  user_address} = data;
    return Pool.query(`UPDATE users SET fullname='${fullname}', email='${email}', phone='${phone}', photo='${photo}', gender='${gender}', birth='${birth}', user_address='${user_address}' WHERE id='${id}'`)
}

const findUser = (id) =>
  new Promise((resolve, reject) =>
    Pool.query(
        `SELECT * FROM users where id='${id}'`,
        (err, result) => {
            if (!err) {
            resolve(result);
        } else {
            reject(err);
            }
        }
    )
);

const updatePhoto = (id, data) => {
    const { photo } = data;
    return Pool.query(`UPDATE users SET photo='${photo}' WHERE id='${id}'`);
  };

const deleteUser = (id) =>{
    return Pool.query(`DELETE FROM users WHERE id='${id}'`)
}

const getUserById = (id) =>{
    // console.log(id,"my id")
    return Pool.query(`SELECT * FROM users WHERE id = '${id}'`)
   
}

module.exports = {create, findEmail, insertUser, updateUser, findUser, updatePhoto, deleteUser, getUserById}