const fs = require('fs');
const { stdin, stdout } = process;
stdout.write('Hi! Leave your message below, please.\n');
stdin.on('data', (data) => {
  fs.writeFile('./02-write-file/text.txt', data, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    process.exit();
  });
});
