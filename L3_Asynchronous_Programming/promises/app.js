import bluebird from "bluebird"; // package to Promisify a module only using callbacks
import prompt from "prompt";
import fs from "fs";
//const prompt = promisifyAll(require('prompt'));
const fsMod = bluebird.promisifyAll(fs);
const promptMod = bluebird.promisifyAll(prompt);

const getFileOperation = {
  name: "fileName",
  description: "What file do you want to open?",
};

promptMod
  .getAsync([getFileOperation]) // getAync now, not get. This is the copy without the callback parameter
  .then(function (result) {
    const fileName = result.fileName;
    if (!fileName) {
      throw "Need to provide a file name";
    }

    console.log(`About to read ${fileName} if it exists`);

    return fileName; // gets passed to the next function
  })
  .then(function (fileName) {
    // fileName in this scope can be any name
    return fsMod.readFileAsync(fileName, "utf-8").then(function (data) {
      // readFile does not have the 3rd callback param anymore, and is passed in as data
      return { fileName: fileName, fileContent: data };
    });
  })
  .then(function (fileInfo) {
    const fileName = fileInfo.fileName;
    const fileContent = fileInfo.fileContent;

    // Now we have the actual file data read
    const reversedContent = fileContent.split("").reverse().join("");

    const reversedName = `reversed_${fileName}`;

    return fsMod.writeFileAsync(reversedName, reversedContent); // 2, not 3 params (no callback function)
  })
  .then(function () {
    console.log("Finished!");

    return null;
  })
  .catch(function (err) { // occurs at any point in the then-chain where an error is caught
    if (err) {
      // Exit out, something went wrong!!!
      throw err;
    }
  });

console.log("After Prompt is run");
