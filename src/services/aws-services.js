import Config from '../config';
import Utils from './Utils';
import axios from 'axios';
const AWSServices = {
    userid: undefined,
    setUserID: function(userid){
        this.userid = userid;
    },
    create: async function (q) {
        let obj = {character_name: `Fish ${q+1}`, character_color: Utils.randomHex(), userid: this.userid};
        let result = await axios.post(`${Config.AWS_ENDPOINT}/create`, obj, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let { character, query } =  result.data;
        return { character: character.rows[0], query, response:  character[0]};
    },
    read: async function () {
        let result = await axios(`${Config.AWS_ENDPOINT}/get-all?userid=${this.userid}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let { characters, query } =  result.data;
        return { characters, query, response: characters }; 
    },
    getTotalRecords: async function () {
        let result = await axios(`${Config.AWS_ENDPOINT}/get-total`)
        return result.data;
    },
    delete: async function (id) {
        let result = await axios.delete(`${Config.AWS_ENDPOINT}/delete`, {data: {id}}, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let { character, query } = result.data;
        return { character, query, response: character }; 
    },
    update: async function (id, character_name, newColor) {
        let obj = {
            id,
            character_name,
            character_color: newColor
        }
        let result = await axios.put(`${Config.AWS_ENDPOINT}/update`, obj, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let { character, query } = result.data;
        return { character, query, response: character }; 
    },
    deleteAllCharacters: async function () {

        let result = await axios.delete(`${Config.AWS_ENDPOINT}/delete-all`, {data: {userid: this.userid}}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let json = result.data;
        return result.statusText === "OK" ? json : false ; 
    },
    empty: async function () {
        let result = await axios.delete(`${Config.AWS_ENDPOINT}/empty`)
        let json = result.data;
        return result.statusText === "OK" ? json : false ; 
    }
}


export default AWSServices;