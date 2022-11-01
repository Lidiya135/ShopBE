const Pool = require('./../config/db');

const selectData= () => {
    return Pool.query(`Select products.name,products.price,products.stock,category.name as category,products.photo FROM products INNER JOIN category ON products.category_id = category.id;`);
};

const selectDatas = (sortBy, sort, limit, offset, search) => {
    return Pool.query(`Select * FROM products WHERE LOWER(name) LIKE LOWER('%${search}%') ORDER BY ${sort} ${sortBy} LIMIT ${limit} OFFSET ${offset}`);
};

const selectDataById = id => {
    return Pool.query(`Select products.name,products.price,products.stock,category.name as category FROM products INNER JOIN category ON products.category_id = category.id WHERE products.id=${id}`)
}

const insertData = (data) => {
    const {id, name, price, stock, category_id, photo} = data;
    console.log('data',data)
    return Pool.query(`INSERT INTO products(id,name,price,stock,category_id,photo)VALUES(${id},'${name}',${price},${stock},${category_id},'${photo}')`);
};

const updateData = (id, data) =>  {
    const {name, price, stock, category_id} = data;
    return Pool.query(`UPDATE products SET name='${name}',price=${price},stock=${stock},category_id=${category_id} WHERE id=${id}`);
};

const deleteData = id => {
    return Pool.query(`DELETE FROM products where id='${id}'`);
};


module.exports = {selectData, selectDatas, selectDataById, insertData, deleteData, updateData};