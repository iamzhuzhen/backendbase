require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const fs = require('fs'); 
const appInit = require('./init.js')
const app = express();
appInit.init(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});


const httpServer = http.createServer(app);
const httpsServer = https.createServer({ key: fs.readFileSync('./cert/privatekey.pem', 'utf8'), cert: fs.readFileSync('./cert/certificate.crt', 'utf8') }, app);


httpServer.listen(process.env.PORT, function() { console.log('HTTP Server is running on: http://localhost:%s', process.env.PORT); }); 
httpsServer.listen(process.env.SSLPORT, function() { console.log('HTTPS Server is running on: https://localhost:%s', process.env.SSLPORT); });

module.exports = app;
