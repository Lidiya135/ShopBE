const Pool = require('./../config/db');

const selectData =()=>{
    return Pool.query(`SELECT * FROM category`)
}

const insertData = (data) => {
    const { name } = data;
    console.log(data)
    return Pool.query(`INSERT INTO category (name) VALUES ('${name}')`);
};

const updateData = (id, name) =>  {
    console.log(name)
    return Pool.query(`UPDATE category SET name='${name}' WHERE id='${id}'`);
};

const deleteData = (id) => {
    return Pool.query(`DELETE FROM category WHERE id='${id}'`);
};

const selectDataById =(id)=>{
    return Pool.query(`SELECT * FROM category WHERE id='${id}'`)
};


module.exports = {selectData, insertData, deleteData, updateData, selectDataById};