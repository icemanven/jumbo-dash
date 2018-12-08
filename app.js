const createError = require('http-errors');
const express = require('express');
const path = require('path');

const favicon = require('serve-favicon');
const logger = require('morgan');

const apiRouter = require('./routes/book');
const userRouter = require('./routes/user');
const vendorRouter = require('./routes/vendor');
const hotelRouter = require('./routes/hotel');
const habitacionRouter = require('./routes/habitacion');
const monedaRouter = require('./routes/moneda');
const servicioRouter = require('./routes/servicio');
const penalidadRouter = require('./routes/penalidad');
const paisRouter = require('./routes/pais');
const quoteRouter = require('./routes/quote');
const salesorderRouter = require('./routes/salesorder');
const invoiceRouter = require('./routes/invoice');

const app = express();
const dir = 'dist';
const appRoute = express.static(path.join(__dirname, dir), { redirect: false });
const dataBase = "jumboDash";

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://backend:JLQice13864@jumbocluster0-1mrzq.mongodb.net/${dataBase}?retryWrites=true`, // mongodb://localhost:27017/
  {useNewUrlParser: true, useCreateIndex: true,  promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(appRoute);
app.use('/', appRoute);
app.use('/api', apiRouter);
app.use('/jumboApi/usuarios', userRouter);
app.use('/jumboApi/proveedores', vendorRouter);
app.use('/jumboApi/hoteles', hotelRouter);
app.use('/jumboApi/habitaciones', habitacionRouter);
app.use('/jumboApi/monedas', monedaRouter);
app.use('/jumboApi/servicios', servicioRouter);
app.use('/jumboApi/penalidades', penalidadRouter);
app.use('/jumboApi/paises', paisRouter);
app.use('/jumboApi/docs/quote', quoteRouter);
app.use('/jumboApi/docs/salesorder', salesorderRouter);
app.use('/jumboApi/docs/invoice', invoiceRouter);
app.get('*', function (req, res, next) {
  res.sendFile(path.resolve(`${dir}/index.html`));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendStatus(err.status);
});

module.exports = app;
