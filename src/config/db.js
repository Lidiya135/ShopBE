const { Pool } = require(`pg`);
require(`dotenv`).config();

const connectionString = process.env.PG_CONNECT;

const pool = new Pool({ connectionString });

pool.connect((err) => {
  if (err) {
    console.log('<:: PostgreSQL Client Error', err);
  } else {
    console.log(`::> PostgreSQL Client Connected lidiya02_shop`);
  }
});

module.exports = pool;