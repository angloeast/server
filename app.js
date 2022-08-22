const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');

const issuesApiRouter = require('./routes/api/issues');
const searchApiRouter = require('./routes/api/search');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy({
  policy: 'cross-origin'
}));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(cors());

app.use('/api', issuesApiRouter);
app.use('/api', searchApiRouter);

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
