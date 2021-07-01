import { gql } from '@apollo/client';
import Utils from './Utils';
const Mutations = {
    client: undefined,
    userid: undefined,
    setClient: function (client, userid) {
        this.client = client;
        this.userid = userid;
    },
    read: async function (id) {
        try {
            let query = `
            query GetCharacters {
                characters(input: {
                  userid:"${this.userid}",
                })  {
                  id
                  character_name
                  character_color
                  createdAt
                  updatedAt
                }
              }`
          let response = await this.client.mutate({ mutation: gql`${query}` })
          return { query, response, characters: response.data.characters };
        } catch(e) {
          // console.error(e)
        } 
    },
    create: async function(q) {
       let character_name = `Fish ${q + 1}`;
        try {
            let query = `
            mutation createCharacter {
                createCharacter(input: {
                    userid: "${this.userid}",
                    character_name: "${character_name}",
                    character_color: "${ Utils.trueRandomHex() }"
                }) {
                    id
                    character_name
                    character_color
                    createdAt
                    updatedAt
                }
            }`
            let response = await this.client.mutate({ mutation: gql`${query}` })
            return { character: response.data.createCharacter, query, response: response.data };
        } catch(e) {
          // console.error(e)
        } 
    },
    update: async function(id, name, color) {
        try {
            let query = `
            mutation updateCharacter {
                updateCharacter(input: {
                      id:  "${id}",
                      character_name: "${name}", 
                      character_color: "${color}"
                    }) {
                      id
                      character_name
                      character_color
                    }
            }`
          let response = await this.client.mutate({mutation: gql`${query}`})
          return {query, response, character: response.data.updateCharacter};
        } catch(e) {
          // console.error("update error", e)
        } 
    },
    delete: async function (id) {
        try {
          let query = `
          mutation deleteCharacter {
              deleteCharacter(input:{
               id:  "${id}"
              }) 
          }`
            let response = await this.client.mutate({mutation: gql`${query}` })
           return {query, response, character: response.data.deleteCharacter};
        } catch(e) {
          // console.error(e)
        } 
    },
    deleteAllCharacters: async function() {
        try {
            return await this.client.mutate({
            mutation: gql`
                mutation deleteAllCharacters {
                  deleteAllCharacters(input:{
                    userid: "${this.userid}",
                    empty:  true
                  }) 
                }`
          })
        } catch(e) {
          // console.error(e)
        } 
      }
}
export default Mutations;