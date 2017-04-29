const fork = require('child_process').fork;
const path = require('path');

module.exports = class ParserManager {
  constructor() {
    this._processPath = path.join(__dirname, '/parser.js');

    this._processes = [];
  }

  process(data, res, next) {
    const process = this._getProcess(res, next);
    process.callback = function(data) {
      process.res.send({ data });
    };
    process.start(data);
    // TODO: save to database
  }

  /**
   * Find free process
   * Or create new one
   * 
   * @return 
   * {
   *  isBusy: boolean,
   *  res: ResObj,
   *  next: NextObj,
   *  process: ChildProcess,
   *  start: Function
   * }
   */
  _getProcess(res, next) {
    const filtered = this._processes.filter(el => !el.isBusy);    
    if (filtered.length) return filtered[0];

    const child = fork(this._processPath);
    const newProcess = {
      isBusy: false,
      res,
      next,
      process: child,
      start: function(data) {
        this.process.send({ cmd: 'start', data });
        this.isBusy = true;
      }
    };

    newProcess.process.on('error', err => {
      newProcess.next(err);
      newProcess.send({ cmd: 'stop' })
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
};
