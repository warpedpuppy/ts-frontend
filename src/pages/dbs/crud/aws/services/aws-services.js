import Config from '../../../../../config';
import Utils from '../../../../../services/Utils';
import { v4 as uuidv4 } from 'uuid';
const AWSServices = {
    userid: uuidv4(),
    create: async function (q) {
        let obj = {character_name: `Fish ${q+1}`, character_color: Utils.randomHex(), userid: this.userid};
        let result = await fetch(`${Config.AWS_ENDPOINT}/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        })
        let { character, query } =  await result.json();
        return { character: character[0], query, response:  character[0]};
    },
    read: async function () {
        let result = await fetch(`${Config.AWS_ENDPOINT}/get-all?userid=${this.userid}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let { characters, query } =  await result.json();
        return { characters, query, response: characters }; 
    },
    delete: async function (id) {
        let result = await fetch(`${Config.AWS_ENDPOINT}/delete`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        // return result.ok ? await result.json() : result.ok ; 
        let { character, query } =  await result.json();
        return { character, query, response: character }; 
    },
    update: async function (id, character_name, newColor) {
        let obj = {
            id,
            character_name,
            character_color: newColor
        }
        let result = await fetch(`${Config.AWS_ENDPOINT}/update`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        // return result.ok ? await result.json() : result.ok ; 
        let { character, query } =  await result.json();
        return { character, query, response: character }; 
    },
    deleteAllCharacters: async function () {
        let result = await fetch(`${Config.AWS_ENDPOINT}/delete-all`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userid: this.userid})
        })

        return result.ok ? await result.json() : result.ok ; 
    }
}


export default AWSServices;