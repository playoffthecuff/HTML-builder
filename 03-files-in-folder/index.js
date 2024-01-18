const fs = require('fs');
const dir = `${__dirname}\\secret-folder`;
console.log(`${dir}\\data.csv`);
fs.readdir(dir, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  for (let i = 0; i < files.length; i += 1) {
    fs.stat(`${dir}\\${files[i]}`, (err, stats) => {
      if (err) {
        console.log(err);
        return;
      }
      if (stats.isFile()) {
        const size = `${stats.size / 1024}kb`;
        const name = files[i].substring(0, files[i].indexOf('.'));
        const extension = files[i].slice(files[i].indexOf('.') + 1);
        console.log(`${name} - ${extension} - ${size}`);
      }
    });
  }
});
