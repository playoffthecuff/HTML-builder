const fs = require('fs').promises;
const path = require('path');
const destinationFolder = path.join(__dirname, 'project-dist');
const destinationAssetsFolder = path.join(destinationFolder, 'assets');
const sourceComponentsFolder = path.join(__dirname, 'components');
const sourceStylesFolder = path.join(__dirname, 'styles');
const sourceAssetsFolder = path.join(__dirname, 'assets');
const targetFilePath = path.join(__dirname, 'template.html');

async function createMarkupFile(sourcePath, fileName, destinationPath) {
  try {
    fs.mkdir(destinationPath, { recursive: true });
    const dirContentArr = await fs.readdir(sourcePath);
    const contentStats = await Promise.all(
      dirContentArr.map((file) => fs.stat(path.join(sourcePath, file))),
    );
    const dirFilesArr = dirContentArr.filter(
      (file, index) =>
        file.slice(-4) === 'html' && contentStats[index].isFile(),
    );
    const contentArr = await Promise.all(
      dirFilesArr.map((fileName) =>
        fs.readFile(path.join(sourcePath, fileName), { encoding: 'utf8' }),
      ),
    );
    const dataSet = {};
    for (let i = 0; i < dirFilesArr.length; i += 1) {
      const key = `{{${dirFilesArr[i].slice(0, -5)}}}`;
      dataSet[key] = contentArr[i];
    }
    const targetFileContent = await fs.readFile(targetFilePath, {
      encoding: 'utf8',
    });
    const handledContent = targetFileContent.replace(
      /{{([^{}])+}}/g,
      (match) => dataSet[match],
    );
    fs.writeFile(path.join(destinationPath, fileName), handledContent);
  } catch (err) {
    console.log(err);
  }
}

async function compileStyles(sourcePath, fileName, destinationPath) {
  try {
    const dirContentArr = await fs.readdir(sourcePath);
    const contentStats = await Promise.all(
      dirContentArr.map((file) => fs.stat(path.join(sourcePath, file))),
    );
    const dirFilesArr = dirContentArr.filter(
      (file, index) => file.slice(-3) === 'css' && contentStats[index].isFile(),
    );
    const contentArr = await Promise.all(
      dirFilesArr.map((fileName) =>
        fs.readFile(path.join(sourcePath, fileName), { encoding: 'utf8' }),
      ),
    );
    const contentString = contentArr.join('\n');
    fs.writeFile(path.join(destinationPath, fileName), contentString);
  } catch (err) {
    console.log(err);
  }
}

async function copyAssets(sourcePath, destinationPath) {
  try {
    const dirContentArr = await fs.readdir(sourcePath, { recursive: true });
    const contentStats = await Promise.all(
      dirContentArr.map((file) => fs.stat(path.join(sourcePath, file))),
    );
    const subDirArr = dirContentArr.filter(
      (file, index) => !contentStats[index].isFile(),
    );
    const dirFilesArr = dirContentArr.filter((file, index) =>
      contentStats[index].isFile(),
    );
    await Promise.all(
      subDirArr.map((dir) =>
        fs.mkdir(path.join(destinationPath, dir), { recursive: true }),
      ),
    );
    await Promise.all(
      dirFilesArr.map((file) =>
        fs.copyFile(
          path.join(sourcePath, file),
          path.join(destinationPath, file),
        ),
      ),
    );
  } catch (err) {
    console.log(err);
  }
}

createMarkupFile(sourceComponentsFolder, 'index.html', destinationFolder);
compileStyles(sourceStylesFolder, 'style.css', destinationFolder);
copyAssets(sourceAssetsFolder, destinationAssetsFolder);
