import Config from '../config';
import Utils from './Utils';
import axios from 'axios';
const MongoServices = {
    userid: undefined,
    setUserID: function (userid) {
        this.userid = userid;
    },
    create: async function (q) {
        try {
            let result = await axios.post(`${Config.API_URL}/mongo-restful`,
            {character_name: `Fish ${q+1}`, character_color: Utils.randomHex(), userid: this.userid},
            {
            headers: {
            'Content-Type': 'application/json'
            },
           
            })
            let {character, query} = result.data;
            return { character, query, response: JSON.stringify(result.data) };
        
        } catch (e) {
         
        }
       
    },
    read: async function () {
        try {
            let result = await axios(`${Config.API_URL}/mongo-restful/user/${this.userid}`)
            let { characters, query } = result.data;
            return { characters, query, response: JSON.stringify(result.data) };
        } catch(e) {
           
        }
       
    },
    getTotalRecords: async function () {
        try {
            let result = await axios(`${Config.API_URL}/mongo-restful/complete`)
            return result.statusText === "OK" ? result : false ; 
        } catch(e) {
            return false; 
        }
    },
    delete: async function (id) {
        try{
            let result = await axios.delete(`${Config.API_URL}/mongo-restful`, 
            {data: {id}},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (result.statusText !== "OK") {
                return false;
            } else {
                let {query, character} = result.data;
                return {query, character, response: JSON.stringify(result.data)}
            }
        } catch (e) {
           
        }


    },
    update: async function (id, character_name, newColor) {
        try {
             let obj = {
                id,
                character_name,
                character_color: newColor
            }
            let result = await axios.put(`${Config.API_URL}/mongo-restful`, obj, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let { character, query } = result.data;
            return { character, query, response: JSON.stringify(result.data) };

        } catch (e) {
            console.error(e)
        }
       
    },
    deleteAllCharacters: async function () {
        let result = await axios.delete(`${Config.API_URL}/mongo-restful/delete-all`, 
        {data: { userid: this.userid }},
        {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })

        return result.data ; 
    },
    empty: async function () {
        let result = await axios.delete(`${Config.API_URL}/mongo-restful/empty`)
        return result.data ; 
    }
}


export default MongoServices;