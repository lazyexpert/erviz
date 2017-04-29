console.log("HAHAHA parser running");

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

  process.send('Hello');
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

const isArray = obj => typeof obj === 'object' && obj.forEach && obj.filter;