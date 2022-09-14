const express = require('express');
const colors = require('colors');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');

const {PORT} = require('./fs/configs');

const app = express();

app.use(cors());
app.use(logger('combined'));
app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(compression());

app.listen(PORT, err => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log('\nnodejs服务已启动！'.black + '✓'.green);
  console.log(`\n监听端口: ${PORT}`.cyan);
});

// run
const run = require('./run');
run(app);
