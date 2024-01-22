const fs = require('fs');
const path = require('path');
const sourceFolder = path.join(__dirname, 'files');
const targetFolder = path.join(__dirname, 'files-copy');

fs.mkdir(targetFolder, { recursive: true }, (err) => {
  if (err) throw err;
  fs.readdir(sourceFolder, (err, sourceFiles) => {
    if (err) {
      console.log(err);
      return;
    }
    for (let file of sourceFiles) {
      fs.copyFile(
        path.join(sourceFolder, file),
        path.join(targetFolder, file),
        (err) => {
          if (err) console.log(err);
        },
        fs.readdir(targetFolder, (err, targetFiles) => {
          if (err) {
            console.log(err);
            return;
          }
          for (let file of targetFiles) {
            if (!sourceFiles.includes(file)) {
              fs.unlink(path.join(targetFolder, file), () => {});
            }
          }
        }),
      );
    }
  });
});
