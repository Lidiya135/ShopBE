const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
require('dotenv').config();
const mainRouter = require('./src/routes/index');
const { response } = require('./src/middleware/common');

const app = express();

const products = require('./src/routes/products');
const category = require('./src/routes/category');
const transactions = require('./src/routes/transactions');

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(bodyParser.json());
const port = process.env.PORT;

app.use('/products', products);
app.use('/category', category);
app.use('/transactions', transactions);

app.use('/', mainRouter);
app.use('/img', express.static('./upload'));

app.all('*', (req, res, next) => {
  response(res, 404, false, null, '404 Not Found');
});

app.get('/', (req, res, next) => {
  res.status(200).json({ status: 'success', statusCode: 200 });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
