const path = require('path');
const formidable = require('formidable');
const promisify = require('promisify-node');
const Promise = require('bluebird');
const fs = promisify('fs');
const csvjson = require('csvjson');

module.exports = class Routes {
  init(app, parserManager) {
    app.get('/api/preset/:id', (req, res) => {
      // TODO: get data from DB by preset id
      const data = { lalala: 1 };
      res.send(data);
    });

    app.post('/api/source-data/', (req, res) => {
      parserManager.process(req.body, res);
    })

   app.post('/api/upload', function(req, res) {
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
    
    if (/json/.test(req.files.sampleFile.name)) {
      const data = JSON.parse(req.files.sampleFile.data.toString());
      return parserManager.processFile(data, res);
    } else if (/csv/.test(req.files.sampleFile.name)) {
      const options = {
        delimiter : ','
      };
      const data = csvjson.toSchemaObject(req.files.sampleFile.data.toString(), options);
      return parserManager.processFile(data, res);
    } else {
      res.status(400).send({message: 'Bad mimetype. Support: csv/json'});
    }
  });
  }
};
