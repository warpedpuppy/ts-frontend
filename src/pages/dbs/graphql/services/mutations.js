import { gql } from '@apollo/client';
import Faker from 'faker';
import Utils from '../../../../services/Utils';
const Mutations = {
    client: undefined,
    userid: undefined,
    setUserID: function (id) {
      this.userid = id;
    },
    setClient: function (client) {
        this.client = client;
    },
    getChars: async function (id) {
        try {
            let result = await this.client.mutate({
            mutation: gql`
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
          })
          return result;
        } catch(e) {
          // console.error(e)
        } 
    },
    addChar: async function() {
        try {
            let result = await this.client.mutate({
            mutation: gql`
            mutation createCharacter {
                createCharacter(input: {
                    userid: "${this.userid}",
                    character_name: "${Faker.name.findName()}",
                    character_color: "${ Utils.randomHex() }"
                }) {
                    id
                    character_name
                    character_color
                    createdAt
                    updatedAt
                }
            }`
          })
          return result.data.createCharacter;
        } catch(e) {
          // console.error(e)
        } 
    },
    updateChar: async function(id, name, color) {
        try {
            let result = await this.client.mutate({
                mutation: gql`
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
              })
          return result.data.updateCharacter;
        } catch(e) {
          // console.error("update error", e)
        } 
    },
    deleteChar: async function (id) {
        try {
            let result = await this.client.mutate({
                mutation: gql`
                mutation deleteCharacter {
                    deleteCharacter(input:{
                     id:  "${id}"
                    }) 
                }`
              })
           return result.data.deleteCharacter;
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