import Utils from '../../../../../services/Utils';
import Config from '../../../../../config';
import { v4 as uuidv4 } from 'uuid';
const PostgresqlServices = {
    userid: uuidv4(),
    create: async function (q) {
        let obj = {
            userid: this.userid,
            character_name: `Fish ${q + 1}`,
            character_color: Utils.randomHex()
        }
        
        let response = await fetch(`${Config.API_URL}/postgresql-restful`, {
            method: "POST", 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        let responseJson = await response.json();
        let { character, query } = responseJson;
        return { character, query, response: JSON.stringify(responseJson) };
  
    },
    read: async function () {
      let response = await fetch(`${Config.API_URL}/postgresql-restful/user/${this.userid}`)
      console.log(response)
      let {characters, query } = await response.json();
      return {characters, query, response: JSON.stringify({characters, query }) };
    },
    getTotalRecords: async function () {
      let response = await fetch(`${Config.API_URL}/postgresql-restful/total`)
      return await response.json();
    },
    update: async function (id, character_name, newColor) {
      let obj = {
        id,
        character_color: newColor,
        character_name
      }
      let result = await fetch(`${Config.API_URL}/postgresql-restful`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      let {response, character, query} = await result.json();
      return {response, character, query};
    },
    delete:  async function (id) {
      let result = await fetch(`${Config.API_URL}/postgresql-restful`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
      })
      let { character, query } = await result.json();
      return { character, query };
    },
    deleteAllCharacters: async function () {
        await fetch(`${Config.API_URL}/postgresql-restful/delete-all`, {
            method: "DELETE", 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({userid: this.userid})
          })
    },
    empty: async function () {
       let result = await fetch(`${Config.API_URL}/postgresql-restful/empty`, { method: "DELETE" })
       return await result.json();
    }


}
export default PostgresqlServices;