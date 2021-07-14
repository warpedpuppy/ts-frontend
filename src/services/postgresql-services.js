import Config from '../config';
import Utils from './Utils';
import axios from 'axios';
const PostgresqlServices = {
    userid: undefined,
    setUserId: function (userid) {
      this.userid = userid;
    },
    create: async function (q) {
        let obj = {
            userid: this.userid,
            character_name: `Fish ${q + 1}`,
            character_color: Utils.randomHex()
        }
        
        let response = await axios.post(`${Config.API_URL}/postgresql-restful`, obj, {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        // let responseJson = await response.json();
        let { character, query } = response.data;
        return { character, query, response: JSON.stringify(response.data) };
  
    },
    read: async function () {
      let response = await axios(`${Config.API_URL}/postgresql-restful/user/${this.userid}`)
      let {characters, query } = response.data;
      return {characters, query, response: JSON.stringify({characters, query }) };
    },
    getTotalRecords: async function () {
      let response = await axios(`${Config.API_URL}/postgresql-restful/total`)
      return await response.data;
    },
    update: async function (id, character_name, newColor) {
      let obj = {
        id,
        character_color: newColor,
        character_name
      }
      let result = await axios.put(`${Config.API_URL}/postgresql-restful`, obj, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let {response, character, query} = result.data;
      return {response, character, query};
    },
    delete:  async function (id) {
      let result = await axios.delete(`${Config.API_URL}/postgresql-restful`, {data: {id}}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(result)
      let { character, query } = result.data;
      return { character, query };
    },
    deleteAllCharacters: async function () {
        await axios.delete(`${Config.API_URL}/postgresql-restful/delete-all`,{data: {userid: this.userid}}, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
    },
    empty: async function () {
       let result = await axios.delete(`${Config.API_URL}/postgresql-restful/empty`)
       return result.data;
    }


}
export default PostgresqlServices;