const readline = require('readline');

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

read.on('line', line => {
  console.log(line);
  process.exit();
});
