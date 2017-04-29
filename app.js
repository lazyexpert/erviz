const express = require('express');

const ExpressBootstrapper = require('./modules/express-bootstrapper');

const config = require('./config');

const Routes = require('./modules/routes');
const ErrorHandler = require('./middlewares/error-handler');
const ParserManager = require('./modules/parser-manager');

const parserManager = new ParserManager();
const errorHandler = new ErrorHandler();
const routes = new Routes();
const middlewares = [
  errorHandler
];
const expressBootstrapper = new ExpressBootstrapper(config, middlewares, routes, parserManager);

expressBootstrapper.start(() => {
  console.log(`App started on port: ${config.app.port}`);
});
