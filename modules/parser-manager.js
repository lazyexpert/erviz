const fork = require('child_process').fork;
const path = require('path');
const Promise = require('bluebird');

module.exports = class ParserManager {
  constructor() {
    this._processPath = path.join(__dirname, '/parser.js');

    this._processes = [];

    this._saveAllDataModels = Promise.coroutine(this._saveAllDataModels.bind(this));
  }

  process(data, res) {
    const process = this._getProcess(res);
    process.callback = function(response) {
      const dataForResponse = response.data.map(el => el.data);

       // TODO: save preset to database, get Id.
       // call  this._saveAllDataModels()

      process.res.send({ data: dataForResponse, schema: response.schema });
    };
    process.start(data);
  }

  processFile(data, res) {
    const process = this._getProcess(res);
    process.callback = function(response) {
      const dataForResponse = response.data.map(el => el.data);

       // TODO: save preset to database, get Id.
       // call  this._saveAllDataModels()

      // process.res.send({ data: dataForResponse, schema: response.schema });
      process.res.redirect('/lol.html');
    };
    process.start(data);
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
    this._processes.push(child);
    return newProcess;
  }

  *_saveAllDataModels(items, presetId) {
    for (let i = 0; i < items.data.length; i++ ) {
      // check if db has such hash, add presetId to presetIds 
      // if not add this item and add preset
    }
  }  
};
