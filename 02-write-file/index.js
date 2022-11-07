const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin, stdout } = process;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//stdout.write('Hi, ');
console.log('Hi ....');

const eva = path.join(__dirname, 'eva.txt');

const written = fs.createWriteStream(eva, 'utf8');

const writeСycle = () => {rl.question('enter data: ', (answer) => {

  if(answer == 'exit') {
    stopWrite();
  }
    written.write(`${answer}\n`);
    writeСycle();

  })
};
writeСycle();

function stopWrite() {
  process.on('exit', () => stdout.write(`\n 'Удачи!'`));
  process.exit();
}

rl.on('SIGINT', function() {
  stopWrite();
});