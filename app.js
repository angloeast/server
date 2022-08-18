const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const issuesApiRouter = require('./routes/api/issues');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// app.use(
//   cors({
//     origin: process.env.FRONT_END_URL,
//     optionsSuccessStatus: 200,
//   })
// );
app.use(
  cors({
    origin: 'https://issues2022.herokuapp.com',
    optionsSuccessStatus: 200,
  })
);

app.use('/api', issuesApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404);
  res.json({ error: 'Not Found' });
});

// error handler
app.use(function (err, req, res, next) {
  resJson = {
    error: req.app.get('env') === 'development' ? err : {},
    message: err.message,
  };
  res.status(err.status || 500);
  res.json(resJson);
});

module.exports = app;
