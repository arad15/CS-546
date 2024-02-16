import axios from "axios";

const getApiData = async () => {
  //try removing the await keyword and run the application
  try {
    // axios already returns Promises, no need to use Bluebird to Promisify it
    let { data } = await axios.get("http://api.tvmaze.com/shows"); // request api for for TV shows JSON data
    // without the await on axios.get(), it returns undefined for data (returns BEFORE data is fully retrieved)
    // we have to WAIT for the data to be processed before we output it
    return data;
  } catch (e) {
    if (e.code === "ENOTFOUND") throw "Error: Invalid URL";
    else if (e.response)
      throw `Error: ${e.response.status}: ${e.response.statusText}`;
    else throw `Error: ${e}`;
  }
};

export { getApiData };
