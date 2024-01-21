const fs = require('fs');
const { stdin, stdout, exit } = process;
const path = require('path');
const targetPath = path.join(__dirname, 'text.txt');

const writeStream = fs.createWriteStream(targetPath);
stdout.write('Hi! Leave your message below, please.\n');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    stdout.write('Good bye!');
    exit();
  }
  writeStream.write(data);
});
process.on('SIGINT', () => {
  stdout.write('Good bye!');
  exit();
});
stdin.on('end', () => {
  exit();
});
