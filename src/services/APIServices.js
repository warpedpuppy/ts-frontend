import Config from '../config';
import axios from 'axios';
const APISERVICES = {
    post: async function (path, obj) {
        try {
          let result = await axios.post(Config.API_URL + path, obj, {
              headers: {
              "Content-Type": 'application/json'
              }
          })
          return result.data;
        } catch (e) {
          return e;
        }
       
    }
}

export default APISERVICES