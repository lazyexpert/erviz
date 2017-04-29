const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const uuidV1 = require('uuid/v1');
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
  const token = uuidV1();
  schema.token = token;

  process.send({ data: items.map(el => {
    const data = [];
    const keys = Object.keys(el);
    keys.forEach(key => data.push(el[key]));
    const dataHash = hash.update(JSON.stringify(data));
    return {
      hash: dataHash,
      presetIds : [],
      data: data
    };
  }), schema, token });
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
    "schema" : { }
  };

  const keys = Object.keys(item);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    res.schema[key] = {
      dataType: null,
      index: i,
      visibility: false
    };
  }

  return res;
}

const isArray = obj => typeof obj === 'object' && obj.forEach && obj.filter;