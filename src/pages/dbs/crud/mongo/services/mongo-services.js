import Config from '../../../../../config';
import Utils from '../../../../../services/Utils';
import { v4 as uuidv4 } from 'uuid';
const MongoServices = {
    userid: uuidv4(),
    create: async function (q) {
        let result = await fetch(`${Config.API_URL}/mongo-restful`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({character_name: `Fish ${q+1}`, character_color: Utils.randomHex(), userid: this.userid})
        })
        let responseJson =  result.ok ? await result.json() : result.ok ; 
        return { character, query, response: JSON.stringify(responseJson) };
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