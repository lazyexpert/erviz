/**
 * This file is launched as a subprocess
 */
const crypto = require('crypto');
process.on('message', processData);

let IS_PROCESS_STOPPED = false;

function processData(data) {
  const cmd = data.cmd;

  const handlers = {
    'start': start.bind(this, data),
    'stop': stop.bind(this)
  };
  handlers[data.cmd]();
}

/**
 * 1) Find array not deeper than 1 level
 * 2) Create preset with metadata for each fields index
 * 3) Refactor data set into:
 * {
 *  id: "",
 *  hash: "",
 *  presetIds: [""],
 *  data: [1,2,3]
 * }
 * 4) return new schema and data, corresponding to it
 */
function start(data) {
  console.log('process job started');
  const items = getItems(data);
  const schema = createSchema(items[0]); 

  process.send({ data: items.map(el => {
    const data = [];
    const keys = Object.keys(el);
    keys.forEach(key => data.push(el[key]));

    const md5sum = crypto.createHash('md5');
    md5sum.update(JSON.stringify(data));
    const dataHash = md5sum.digest('hex');
    return {
      hash: dataHash,
      presetIds : [],
      data
    };
  }), schema });
  stop();
}

function stop() {
  IS_PROCESS_STOPPED = true;
}

function getItems(data) {
  if (isArray(data)) return data;

  const keys = Object.keys(data);
  let maxArray = [];
  
  for (let key in data) {
    if (isArray(data[key]) && data[key].length > maxArray.length) {
      maxArray = data[key];
    }
  }

  return maxArray;  
}

function createSchema(item) {
  const res = {
    "meta": {
      "title": "Example dataSource preset",
      "createdAt": Date.now(),
      "description": "Example of the datasource description"
    },
    "mySchema" : { }
  };

  const keys = Object.keys(item);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    res.mySchema[key] = {
      dataType: null,
      index: i,
      visibility: false
    };
  }

  return res;
}

const isArray = obj => typeof obj === 'object' && obj.forEach && obj.filter;