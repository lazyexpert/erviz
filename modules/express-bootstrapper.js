const path = require('path');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
mongoose.Promise = Promise;
const fileUpload = require('express-fileupload');

module.exports = class ExpressBootstrapper {
  constructor(config, middlewares, routes, parserManager) {
    this._app = express();
    this._middlewares = middlewares;
    this._routes = routes;
    this._config = config;
    this._parserManager = parserManager;

    this.start = Promise.coroutine(this.start.bind(this));
  }

  *start(onload) {
    this._app.use(helmet.hidePoweredBy());
    this._app.use(helmet.xssFilter());

    this._app.set('view engine', 'ejs');  
    this._app.use(fileUpload());
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({extended: false}));

    const connectionString = process.env.MONGODB_CONNECTION_STRING || this._config.mongo.connectionString;
    mongoose.createConnection(connectionString, { server: { poolSize: this._config.mongo.poolSize }});
    this._app.use(express.static('public'));

    this._initMiddlewares();
    this._routes.init(this._app, this._parserManager);
    this._app.listen(this._config.app.port, onload);
  }

  _initMiddlewares() {
    this._middlewares.forEach(middleware => this._app.use(middleware.handler));
  }
};
