const Pool = require('./../config/db');

const selectData = () =>{
    return Pool.query(`SELECT transactions.id, transactions.email, products.name as products_name, transactions.amount, transactions.total FROM transactions JOIN products ON transactions.products_id = products.id`)
};

const insertData = (data) => {
    const {id, email, products_id, amount, total} = data;
    return Pool.query(`INSERT INTO transactions(id,email,products_id,amount,total) VALUES(${id},'${email}',${products_id},${amount},${total})`);
};

const deleteData = id => {
    return Pool.query(`DELETE FROM transactions WHERE id='${id}'`);
};

const updateData = (id, data) =>  {
    const {email, amount, total} = data;
    return Pool.query(`UPDATE transactions SET email='${email}',amount='${amount}',total='${total}' WHERE id='${id}'`);
};


module.exports = {selectData, insertData, deleteData, updateData};