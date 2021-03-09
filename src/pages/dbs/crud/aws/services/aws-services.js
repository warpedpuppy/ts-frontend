import Config from '../../../../../config';
import Utils from '../../../../../services/Utils';

const AWSServices = {
    userid: undefined,
    setUserID: function (id) {
      this.userid = id;
    },
    create: async function (q) {
        let obj = {character_name: `Fish ${q+1}`, character_color: Utils.randomHex(), userid: this.userid};
        console.log(obj)
        let result = await fetch(`${Config.AWS_ENDPOINT}/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        })
        console.log(result)
        return result.ok ? await result.json() : result.ok ; 
    },
    read: async function () {

        console.log("READ CLICKED!")

        console.log("dbconnect")
        let resultdbconnect = await fetch(`https://exc1dtat2e.execute-api.us-east-1.amazonaws.com/dev/api/dbconnect`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let responseJsondbconnect = await resultdbconnect.json();
        console.log("response from dbconnect: ", responseJsondbconnect)

        try {
             let result2c = await fetch(`https://exc1dtat2e.execute-api.us-east-1.amazonaws.com/dev/api/db-connect-with-specified-origin`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let responseJson2c = await result2c.json();
        console.log("response from connect with specified origin: ", responseJson2c)
        } catch (e) {
            console.log("response from specified origin failed -- which is correct")
        }
       

        

        let result2 = await fetch(`https://exc1dtat2e.execute-api.us-east-1.amazonaws.com/dev/api/db-connect-with-middleware`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let responseJson2 = await result2.json();
        console.log("response from connect with middleware: ", responseJson2)


        let result2b = await fetch(`https://exc1dtat2e.execute-api.us-east-1.amazonaws.com/dev/api/db-connect-with-middleware-and-db-call`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let responseJson2b = await result2b.json();
        console.log("response from connect with middleware and db call: ", responseJson2b)




        console.log("READ FROM AWS")
        let result = await fetch(`${Config.AWS_ENDPOINT}/test-endpoint-new`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let responseJson = await result.json();
        console.log("response from get all: ", responseJson)



        console.log("READ FROM AWS")
        let result1 = await fetch(`${Config.AWS_ENDPOINT}/get-all`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let responseJson1 = await result1.json();
        console.log("response from get all: ", responseJson1)
        return result1.ok ? responseJson1.characters : result1.ok ; 
    },
    delete: async function (id) {
        let result = await fetch(`${Config.AWS_ENDPOINT}/mongo-restful`, {
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
        let result = await fetch(`${Config.AWS_ENDPOINT}/mongo-restful`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

        return result.ok ? await result.json() : result.ok ; 
    },
    deleteAllCharacters: async function () {
        let result = await fetch(`${Config.AWS_ENDPOINT}/delete-all`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userid: this.userid})
        })

        return result.ok ? await result.json() : result.ok ; 
    }
}


export default AWSServices;