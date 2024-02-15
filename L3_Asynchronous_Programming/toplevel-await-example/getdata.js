import axios from 'axios';
let {data} = await axios.get('http://api.tvmaze.com/shows');
export {data};
