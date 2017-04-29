console.log("HAHAHA parser running");

process.on('message', processData);

let IS_PROCESS_STOPPED = false;

function processData(data) {
  const cmd = data.cmd;
  if (cmd === 'start') start(data);
  else if(cmd === 'stop') stop();
}

function start(data) {
  console.log("process job started");
  process.send('Hello');
  stop();
}

function stop() {
  IS_PROCESS_STOPPED = true;
}