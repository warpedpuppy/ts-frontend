import Config from '../../../../../config';
import Faker from 'faker';
import Utils from '../../../../../services/Utils';
const MongoServices = {
    userid: undefined,
    setUserID: function (id) {
      this.userid = id;
    },
    create: async function () {
        let result = await fetch(`${Config.API_URL}/mongo-restful`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({character_name: Faker.name.findName(), character_color: Utils.randomHex(), userid: this.userid})
        })
        return result.ok ? await result.json() : result.ok ; 
    },
    read: async function () {
        let result = await fetch(`${Config.API_URL}/mongo-restful/${this.userid}`)
        return result.ok ? await result.json() : result.ok ; 
    },
    delete: async function (id) {
        let result = await fetch(`${Config.API_URL}/mongo-restful`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })

        return result.ok ? await result.json() : result.ok ; 
    },
    update: async function (id, character_name, newColor) {
        let obj = {
            id,
            character_name,
            character_color: newColor
        }
        let result = await fetch(`${Config.API_URL}/mongo-restful`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

        return result.ok ? await result.json() : result.ok ; 
    },
    deleteAllCharacters: async function () {
        let result = await fetch(`${Config.API_URL}/mongo-restful/delete-all`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userid: this.userid})
        })

        return result.ok ? await result.json() : result.ok ; 
    }
}


export default MongoServices;