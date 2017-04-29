const path = require('path');
const formidable = require('formidable');
const promisify = require('promisify-node');
const Promise = require('bluebird');
const fs = promisify('fs');

module.exports = class Routes {
  init(app, parserManager) {
    app.get('/api/preset/:id', (req, res, next) => {
      // TODO: get data from DB by preset id
      const data = { lalala: 1 };
      res.send(data);
    });

    app.post('/api/source-data/', (req, res, next) => {
      parserManager.process(req.body, res, next);      
    })

   app.post('/api/upload', function(req, res) {
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
    console.log(req.files);
    res.end();
  });
  }
};
