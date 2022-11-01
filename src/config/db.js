const { Pool } = require('pg');
const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    user: process.env.DB_USER
});

// const pool = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     password: '113579',
//     database: 'latihan',
//     port: 5432
// });

module.exports = pool;