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
          console.log(result)
          return result;
        } catch(e) {
          console.error(e)
        } 
    },
    addChar: async function(id, name) {
        try {
            let result = await this.client.mutate({
            mutation: gql`
            mutation createCharacter {
                createCharacter(input: {
                    name: "${Faker.name.findName()}",
                    color: "${ Utils.randomHex() }"
                }) {
                    name
                    color
                }
            }`
          })
          console.log(result)
        } catch(e) {
          console.error(e)
        } 
    },
    updateName: async function(id, name) {
        try {
            let result = await this.client.mutate({
            mutation: gql`
            mutation updateCharacter {
                updateCharacter(input: {
                    id:  "${id}",
                    name: "${name}", 
                    color: "orange"
                    }) {
                    id
                    name
                    color
                    }
            }`
          })
          console.log(result)
        } catch(e) {
          console.error(e)
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
          console.log(result)
        } catch(e) {
          console.error(e)
        } 
    }
}
export default Mutations;