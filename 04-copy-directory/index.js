const fs = require('fs');
const dir = __dirname;
const sourceFolder = dir + '\\files';
const targetFolder = dir + '\\files-copy';

fs.mkdir(targetFolder, { recursive: true }, (err) => {
  if (err) throw err;
  fs.readdir(sourceFolder, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    for (let file of files) {
      fs.copyFile(
        `${sourceFolder}\\${file}`,
        `${targetFolder}\\${file}`,
        (err) => {
          if (err) console.log(err);
        },
      );
    }
  });
});
