import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql } from '@apollo/client';
import DisplayChars from './DisplayChars';
import Config from '../../../config';
import Utils from '../../../services/Utils';
import Faker from 'faker';
export default class GraphQL extends Component {

    constructor(){
        super();
        this.state = {loaded: false}
         this.client = new ApolloClient({
          uri: `${Config.API_URL}/graphql`,
          cache: new InMemoryCache()
        });
      }

      componentDidMount = async () => {
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
          if(result) {
            this.setState({loaded: true})
          }
        } catch(e) {
          console.error(e)
        } 
         
      }

      componentWillUnmount = async () => {
        console.log("delete all characters")
          try {
            let result = await this.client.mutate({
            mutation: gql`
                mutation deleteAllCharacters {
                  deleteAllCharacters(input:{
                    empty:  true
                  }) 
                }`
          })
          console.log(result)
        } catch(e) {
          console.error(e)
        } 
      }

      deleteCharacter = async (id) => {
        console.log(id)
      
        try {
          let result = await this.client.mutate({
          mutation: gql`
            mutation deleteCharacter {
              deleteCharacter(input:{
                id:  "${id}"
              }) 
            }`
        })
        console.log(result)
      
      } catch(e) {
        console.error(e)
      } 
      }

  render() {
    return (
        <ApolloProvider client={this.client}>
        { this.state.loaded ?  <DisplayChars deleteCharacter={this.deleteCharacter} /> : ''}
        </ApolloProvider>
    );
  }
}
