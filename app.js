const express = require('express');

const ExpressBootstrapper = require('./modules/express-bootstrapper');

const config = require('./config');

const Routes = require('./modules/routes');

const routes = new Routes();
const middlewares = [

];
const expressBootstrapper = new ExpressBootstrapper(config.app.port, middlewares, routes);

expressBootstrapper.start(() => {
  console.log(`App started on port: ${config.app.port}`);
});
