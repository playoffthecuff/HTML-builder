const fs = require('fs').promises;
const path = require('path');
const sourceFolder = path.join(__dirname, 'styles');
const extension = 'css';
const targetFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

async function createBundle(sourceFolder, extension, targetFilePath) {
  try {
    const files = await fs.readdir(sourceFolder);
    const fileStats = await Promise.all(
      files.map((file) => fs.stat(path.join(sourceFolder, file))),
    );
    const filteredFileNames = files.filter(
      (file, index) =>
        file.slice(-3) === extension && fileStats[index].isFile(),
    );
    const filesContent = await Promise.all(
      filteredFileNames.map((file) =>
        fs.readFile(path.join(sourceFolder, file), { encoding: 'utf8' }),
      ),
    );
    const data = filesContent.join('\n');
    fs.writeFile(targetFilePath, data);
  } catch (err) {
    console.log(err);
  }
}

createBundle(sourceFolder, extension, targetFilePath);
