import Faker from 'faker';
import Utils from '../../../../../services/Utils';
import Config from '../../../../../config';
const PostgresqlServices = {
    userid: undefined,
    setUserID: function (id) {
      this.userid = id;
    },
    create: async function () {
        let obj = {
            userid: this.userid,
            character_name: Faker.name.findName(),
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
        return responseJson.character;
  
    },
    read: async function () {
      let response = await fetch(`${Config.API_URL}/postgresql-restful/${this.userid}`)
      let responseJson = await response.json();
      return responseJson;
    },
    update: async function (id, character_name, newColor) {
      let obj = {
        id,
        character_color: newColor,
        character_name
      }
      let response = await fetch(`${Config.API_URL}/postgresql-restful`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      let responseJson = await response.json();
      return responseJson.character;
    },
    delete:  async function (id) {
      let response = await fetch(`${Config.API_URL}/postgresql-restful`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
      })
      let responseJson = await response.json();
      return responseJson.success;
    },
    deleteAllCharacters: async function () {
        await fetch(`${Config.API_URL}/postgresql-restful/delete-all`, {
            method: "DELETE", 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({userid: this.userid})
          })
    }


}
export default PostgresqlServices;