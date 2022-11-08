const Pool = require("./../config/db");

const create = (data) => {
    const {id,email,password,fullname,role} = data;
    return new Promise ((resolve,reject)=>
    Pool.query(`INSERT INTO users(id,email,password,fullname,role) VALUES('${id}','${email}','${password}','${fullname}','${role}')`,(err,result)=>{
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

const insertData = (data) =>{
    const {id, email, fullname, password, role} = data
    return pool.query(`INSERT INTO users(id, name, email, password, phone)VALUES('${id}', '${name}', '${email}', '${fullname}', '${password}', '${role}' )`)
}

const updateData = (id, data) =>{
    const {name, email, fullname, password, role} = data
    return pool.query(`UPDATE users SET name='${name}', email='${email}', '${fullname}', password='${password}', '${role}' WHERE id=${id}`)
}

const deleteData = (id) =>{
    return pool.query(`DELETE FROM users WHERE id='${id}'`)
}

module.exports = {create,findEmail,insertData,updateData,deleteData}