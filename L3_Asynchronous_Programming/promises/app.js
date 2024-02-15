import bluebird from 'bluebird';
import prompt from 'prompt';
import fs from 'fs';
//const prompt = promisifyAll(require('prompt'));
const fsMod = bluebird.promisifyAll(fs);
const promptMod = bluebird.promisifyAll(prompt);

const getFileOperation = {
  name: 'fileName',
  description: 'What file do you want to open?'
};

promptMod
  .getAsync([getFileOperation])
  .then(function (result) {
    const fileName = result.fileName;
    if (!fileName) {
      throw 'Need to provide a file name';
    }

    console.log(`About to read ${fileName} if it exists`);

    return fileName;
  })
  .then(function (fileName) {
    return fsMod.readFileAsync(fileName, 'utf-8').then(function (data) {
      return {fileName: fileName, fileContent: data};
    });
  })
  .then(function (fileInfo) {
    const fileName = fileInfo.fileName;
    const fileContent = fileInfo.fileContent;

    // Now we have the actual file data read
    const reversedContent = fileContent.split('').reverse().join('');

    const reversedName = `reversed_${fileName}`;

    return fsMod.writeFileAsync(reversedName, reversedContent);
  })
  .then(function () {
    console.log('Finished!');

    return null;
  })
  .catch(function (err) {
    if (err) {
      // Exit out, something went wrong!!!
      throw err;
    }
  });

console.log('After Prompt is run');
