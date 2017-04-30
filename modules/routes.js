const Promise = require('bluebird');
const csvjson = require('csvjson');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = class Routes {
  constructor(dataSourceModel, presetModel) {
    this._dataSourceModel = dataSourceModel;
    this._presetModel = presetModel;
  }

  init(app, parserManager) {
    app.get('/preset/:id', (req, res) => {
      const self = this;

      Promise.coroutine(function*() {
        let schema, data;

        yield self._presetModel.execute(Promise.coroutine(function*(PresetModel) {
          schema = yield PresetModel.findOne({_id: req.params.id});
          console.log("schema", schema);
        }));
        yield self._dataSourceModel.execute(Promise.coroutine(function*(DataSourceModel) {
          const result = yield DataSourceModel.find({ presetIds: req.params.id });
          data = result.map(el => el.data);
        }));
        res.render('lol', { response: JSON.stringify({ data, schema }) });
      })();
    });

    app.get('/earth', (req, res) => {
      res.render('lol', { response: "null" });
    })

    app.put('/preset/:id', (req, res) => {

    })

    app.post('/api/source-data/', (req, res) => {
      parserManager.process(req.body, res);
    })

    app.post('/earth-with-your-data', function(req, res) {
      if (!req.files)
        return res.status(400).send('No files were uploaded.');
      
      if (/\.json/.test(req.files.sampleFile.name)) {
        const data = JSON.parse(req.files.sampleFile.data.toString());
        return parserManager.processFile(data, res);
      } else if (/\.csv/.test(req.files.sampleFile.name)) {
        req.files.sampleFile.data.toString();
        const options = {
          delimiter : ','
        };
        try {
          const data = csvjson.toSchemaObject(req.files.sampleFile.data.toString(), options);
          return parserManager.processFile(data, res);
        } catch(e) {
          console.error(e);
          return res.status(500).send({message: "corrupted data, please modify your dataset"})
        }
      } else {
        res.status(400).send({message: 'Bad mimetype. Support: csv/json'});
      }
    });
  }
};
