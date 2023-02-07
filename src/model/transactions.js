const Pool = require("../config/db");

const selectByUser = (users_id) =>
  Pool.query(
    `SELECT transaction.id,transaction.products_id,transaction.amount,transaction.total,transaction.users_id,transaction.seller_id,products.name,products.photo,products.price FROM transaction INNER JOIN products ON transaction.products_id=products.id
     WHERE transaction.users_id='${users_id}'`
  );

const selectById = (id) =>
  new Promise((resolve, reject) => {
    Pool.query(
      `select * from transaction where id = '${id}' `,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });

const insert = (users_id, data) => {
  const { products_id, amount, total, seller_id } = data;
  return Pool.query(
    `INSERT INTO transaction(users_id,products_id,amount,total,seller_id)VALUES('${users_id}',${products_id},${amount},${total},'${seller_id}')`
  );
};

const deleteTrans = (id) =>
  Pool.query(
    `DELETE FROM transaction where id='${id}'`
  );

module.exports = {
  selectByUser,
  selectById,
  insert,
  deleteTrans
};