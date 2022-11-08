const Pool = require('./../config/db');

const selectData= (sortBy, sort, limit, page, search) => {
    return Pool.query(`Select products.id,products.name,products.price,products.stock,category.name as category,products.photo FROM products INNER JOIN category ON products.category_id = category.id WHERE products.name ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${(page-1)*limit}`);
};

const selectDataById = id => {
    return Pool.query(`Select products.name,products.price,products.stock,category.name as category FROM products INNER JOIN category ON products.category_id = category.id WHERE products.id=${id}`)
};

const insertData = (data) => {
    const {id, name, price, stock, category_id, photo} = data;
//    console.log('data',data)
    return Pool.query(`INSERT INTO products(id,name,price,stock,category_id,photo)VALUES(${id},'${name}',${price},${stock},${category_id},'${photo}')`);
};

const updateData = (id, data) =>  {
    const {name, price, stock, category_id, photo} = data;
    // console.log('data',data)
    return Pool.query(`UPDATE products SET name='${name}',price=${price},stock=${stock},category_id=${category_id},photo='${photo}' WHERE id=${id}`);
};

const deleteData = id => {
    return Pool.query(`DELETE FROM products where id='${id}'`);
};


module.exports = {selectData, selectDataById, insertData, deleteData, updateData};