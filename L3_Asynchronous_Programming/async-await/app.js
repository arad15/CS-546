import bluebird from 'bluebird';
import prompt from 'prompt';
import fs from 'fs';
const fsPromise = bluebird.promisifyAll(fs);
const promptPromise = bluebird.promisifyAll(prompt);

// We declare an async function that we will run below, so that we may use await.
async function main() {
  const getFileOperation = {
    name: 'fileName',
    description: 'What file do you want to open?'
  };

  // Gets result of user input
  let promptResult = await promptPromise.getAsync([getFileOperation]);
  console.log(promptResult);
  const fileName = promptResult.fileName;

  if (!fileName) {
    throw 'Need to provide a file name';
  }

  console.log(`About to read ${fileName} if it exists`);

  const fileContent = await fsPromise.readFileAsync(fileName, 'utf-8');

  const reversedContent = fileContent.split('').reverse().join('');

  const reversedName = `reversed_${fileName}`;

  // Now we have the actual file data read
  console.log('before write');
  await fsPromise.writeFileAsync(reversedName, reversedContent);
  console.log('Finished!');

  return null;
}

// Now we run it
main().catch((err) => {
  console.log(err);
});

console.log('After prompt');
