const fork = require('child_process').fork;
const path = require('path');
const Promise = require('bluebird');

module.exports = class ParserManager {
  constructor(dataSourceModel, presetModel) {
    this._processPath = path.join(__dirname, '/parser.js');

    this._processes = [];

    this._dataSourceModel = dataSourceModel;
    this._presetModel = presetModel;

    this._savePreset = Promise.coroutine(this._savePreset.bind(this));
    this._saveAllDataModels = Promise.coroutine(this._saveAllDataModels.bind(this));
  }

  process(data, res) {
    const myProcess = this._getProcess(res);
    myProcess.callback = function(response) {
      const dataForResponse = response.data.map(el => el.data);

      self._savePreset(response, function() {
        myProcess.res.send({ data: dataForResponse, schema: response.mySchema, token: response.token });
      }.bind(self));
    };

    myProcess.start(data);
  }

  processFile(data, res) {
    const self = this;

    const myProcess = this._getProcess(res);
    myProcess.callback = function(response) {
      const dataForResponse = response.data.map(el => el.data);
      self._savePreset(response, function() {
        res.render('lol', { response: JSON.stringify({ data: dataForResponse, schema: response.mySchema, token: response.token }) });
      }.bind(self));
    };

    myProcess.start(data);
  }

  *_savePreset(response, cb) {
    const self = this;
    this._presetModel.execute(Promise.coroutine(function*(Preset) {
      const presetModel = new Preset(response.schema);
      const id = presetModel._id;
      yield presetModel.save();
      yield self._saveAllDataModels(response.data, id);
      cb();
    }));
  }
  /**
   * Find free process
   * Or create new one
   * 
   * @return 
   * {
   *  isBusy: boolean,
   *  res: ResObj,
   *  process: ChildProcess,
   *  start: Function
   * }
   */
  _getProcess(res) {
    const filtered = this._processes.filter(el => !el.isBusy);    
    if (filtered.length) return filtered[0];

    const child = fork(this._processPath);
    const newProcess = {
      isBusy: false,
      res,
      process: child,
      start: function(data) {
        this.process.send({ cmd: 'start', data });
        this.isBusy = true;
      }
    };

    newProcess.process.on('error', err => {
      newProcess.send({ cmd: 'stop' })
      throw err;      
    });

    newProcess.process.on('message', data => {
      console.log('Main: received message from child.')

      if (newProcess.callback)
        newProcess.callback(data);
      newProcess.isBusy = false;
    });
    this._processes.push(newProcess);
    return newProcess;
  }

  *_saveAllDataModels(items, presetId) {
    for (let i = 0; i < items.length; i++ ) {
      // check if db has such hash, add presetId to presetIds 
      // if not add this item and add preset
    }
  }  
};
