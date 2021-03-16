import Config from '../../../../../config';
import Utils from '../../../../../services/Utils';
import { v4 as uuidv4 } from 'uuid';
const MongoServices = {
    userid: uuidv4(),
    create: async function (q) {

        try {
            let result = await fetch(`${Config.API_URL}/mongo-restful`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({character_name: `Fish ${q+1}`, character_color: Utils.randomHex(), userid: this.userid})
            })

            let responseJson =  result.ok ? await result.json() : result.ok ; 

            let {character, query} = responseJson;
            return { character, query, response: JSON.stringify(responseJson) };
        
        } catch (e) {
            console.log(e)
        }
       
    },
    read: async function () {
        try {
            let result = await fetch(`${Config.API_URL}/mongo-restful/${this.userid}`)
            let responseJson = result.ok ? await result.json() : result.ok ; 
            let { characters, query } = responseJson;
            return { characters, query, response: JSON.stringify(responseJson) };
        } catch(e) {
            console.log(e)
        }
       
    },
    delete: async function (id) {
        try{
            let result = await fetch(`${Config.API_URL}/mongo-restful`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            })
            if (!result.ok) {
                return result.ok;
            } else {
                let {query, character} = await result.json();
                return {query, character, response: JSON.stringify(character)}
            }
        } catch (e) {
            console.log(e)
        }


    },
    update: async function (id, character_name, newColor) {
        try {
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

            let resultJSON = result.ok ? await result.json() : result.ok ; 
            let { character, query } = resultJSON;
            return { character, query, response: JSON.stringify(character) };

        } catch (e) {
            console.error(e)
        }
       
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