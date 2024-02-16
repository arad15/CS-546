import fs from "fs";
import prompt from "prompt";

const getFileOperation = {
  // asks the user for file info
  name: "fileName",
  description: "What file do you want to open?",
};

// We're going to do our first asynchronous operation!
prompt.get([getFileOperation], function (err, result) {
  console.log("Prompt has a result");
  if (err) {
    // Exit out, something went wrong!!!
    throw err;
  }

  const fileName = result.fileName; // retrive file name if error doesn't occur
  if (!fileName) {
    throw "Need to provide a file name";
  }

  console.log(`About to read ${fileName} if it exists`);

  // If it exists, we read the file
  fs.readFile(fileName, "utf-8", function (fileReadError, data) {
    // file name, encoding, function for reading
    if (fileReadError) {
      // if it can't read it
      throw fileReadError;
    }

    // Now we have the actual file data read
    const reversedContent = data.split("").reverse().join("");

    // Now we save.

    const reversedName = `reversed_${fileName}`;
    fs.writeFile(reversedName, reversedContent, function (writeError) {
      // file name, content/dating we're writing, callback function for if the writing is successful
      if (writeError) {
        throw writeError;
      }

      console.log("Finished!");
    });
  });
});

console.log("After prompt is run"); // code that has NOTHING to do with the above file operations
