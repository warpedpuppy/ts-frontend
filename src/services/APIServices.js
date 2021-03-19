import Config from '../config';

const APISERVICES = {
    post: async function (path, obj) {
        try {
          let result = await fetch(Config.API_URL + path, {
              method: "POST",
              headers: {
              "Content-Type": 'application/json'
              },
              body: JSON.stringify(obj)
          })
          return await result.json();
        } catch (e) {
          return e;
        }
       
    }
}

export default APISERVICES