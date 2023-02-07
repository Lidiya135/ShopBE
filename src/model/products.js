const Pool = require('./../config/db');

const selectData= (sortBy, sort, limit, page, search) => {
    return Pool.query(`Select products.id,products.name,products.price,products.description,products.stock,category.name as category,products.photo FROM products INNER JOIN category ON products.category_id = category.id WHERE products.name ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${(page-1)*limit}`);
};

const selectDataById = id => {
    return Pool.query(`Select products.name,products.price,products.stock,products.description,products.photo,category.name as category FROM products INNER JOIN category ON products.category_id = category.id WHERE products.id=${id}`)
};

const insertData = (data) => {
    const {name, price, stock, category_id, photo, description} = data;
//    console.log('data',data)
    return Pool.query(`INSERT INTO products(name,price,stock,category_id,photo,description)VALUES('${name}',${price},${stock},${category_id},'${photo}', '${description}')`);
};

// const updateData = (id, data) =>  {
//     const {name, price, stock, category_id, photo, description} = data;
//     console.log('data',data)
//     return Pool.query(`UPDATE products SET name='${name}',price='${price}',stock='${stock}',category_id='${category_id}',photo='${photo}',description='${description}' WHERE id='${id}'`);
// };

const updateData = (id,data) => {
    console.log(data)
    const {name,price,stock,category_id,photo} = data;
    return new Promise ((resolve,reject)=>
        Pool.query(`UPDATE products SET name='${name}',price='${price}',stock='${stock}',category_id='${category_id}',photo='${photo}' WHERE id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err.message)
            }
        })
    )
  }

const findProductsById = (id) => {
    return Pool.query(`SELECT * FROM products WHERE id = '${id}'`)
  };
  

const deleteData = id => {
    return Pool.query(`DELETE FROM products where id='${id}'`);
};


module.exports = {selectData, selectDataById, insertData, deleteData, updateData, findProductsById};