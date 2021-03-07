import Config from '../../../../../config';
import Utils from '../../../../../services/Utils';

const AWSServices = {
    userid: undefined,
    setUserID: function (id) {
      this.userid = id;
    },
    create: async function (q) {
        let result = await fetch(`${Config.API_URL}/mongo-restful`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({character_name: `Fish ${q+1}`, character_color: Utils.randomHex(), userid: this.userid})
        })
        return result.ok ? await result.json() : result.ok ; 
    },
    read: async function () {

        let result1 = await fetch(`${Config.AWS_ENDPOINT}/get-all`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let responseJson1 = await result1.json();
        console.log("response from get all: ", responseJson1)
        
        let result = await fetch(`${Config.AWS_ENDPOINT}/get-all2`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let responseJson = await result.json();
        console.log("response from getAll2: ", responseJson)
        
        return result1.ok ? responseJson1.characters : result1.ok ; 
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


export default AWSServices;