const express = require('express');

const ExpressBootstrapper = require('./modules/express-bootstrapper');

const config = require('./config');

const Routes = require('./modules/routes');
const ErrorHandler = require('./middlewares/error-handler');
const ParserManager = require('./modules/parser-manager');

const DataSourceModel = require('./models/data-source-model');
const PresetModel = require('./models/preset-model');

const connectionString = process.env.MONGODB_CONNECTION_STRING || this._config.mongo.connectionString;

const dataSourceModel = new DataSourceModel(connectionString);
const presetModel = new PresetModel(connectionString);

const parserManager = new ParserManager(dataSourceModel, presetModel);
const errorHandler = new ErrorHandler();
const routes = new Routes();
const middlewares = [
  errorHandler
];
const expressBootstrapper = new ExpressBootstrapper(config, middlewares, routes, parserManager);

expressBootstrapper.start(() => {
  console.log(`App started on port: ${config.app.port}`);
});
