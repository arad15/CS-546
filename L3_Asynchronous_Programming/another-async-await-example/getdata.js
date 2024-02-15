import axios from 'axios';

const getApiData = async () => {
  //try removing the await keyword and run the application
  try {
    let {data} = await axios.get('http://api.tvmaze.com/shows');
    return data;
  } catch (e) {
    if (e.code === 'ENOTFOUND') throw 'Error: Invalid URL';
    else if (e.response)
      throw `Error: ${e.response.status}: ${e.response.statusText}`;
    else throw `Error: ${e}`;
  }
};

export {getApiData};
