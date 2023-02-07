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

app.use(morgan('dev'));
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(xss());
// app.use(bodyParser());
// app.use(bodyParser({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.json({limit: '50mb'}));
const port = process.env.PORT;

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
