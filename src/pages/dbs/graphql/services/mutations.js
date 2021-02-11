import { gql } from '@apollo/client';
import Faker from 'faker';
import Utils from '../../../../services/Utils';
const Mutations = {
    client: undefined,
    setClient: function (client) {
        this.client = client;
    },
    getChars: async function (id) {
        try {
            let result = await this.client.mutate({
            mutation: gql`
            query GetCharacters {
                characters {
                  id
                  name
                  color
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
                    name: "${Faker.name.findName()}",
                    color: "${ Utils.randomHex() }"
                }) {
                    id
                    name
                    color
                }
            }`
          })
          return result.data.createCharacter;
        } catch(e) {
          // console.error(e)
        } 
    },
    updateName: async function(id, name, color) {
        try {
            let result = await this.client.mutate({
                mutation: gql`
                mutation updateCharacter {
                    updateCharacter(input: {
                          id:  "${id}",
                          name: "${name}", 
                          color: "${color}"
                        }) {
                          id
                          name
                          color
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
                    }) {
                    id
                    name
                    color
                    }
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