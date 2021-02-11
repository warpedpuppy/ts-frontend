import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import DisplayChars from './DisplayChars';
import Config from '../../../config';
import Mutations from './services/mutations';
export default class GraphQL extends Component {

    constructor(){
        super();
        this.state = {loaded: true, characters: []}
         this.client = new ApolloClient({
          uri: `${Config.API_URL}/graphql`,
          cache: new InMemoryCache()
        });
        Mutations.setClient(this.client);
      }


      componentWillUnmount = async () => {
        try {
          await Mutations.deleteAllCharacters();
        } catch(e) {
          console.error(e)
        } 
      }
    

  render() {
    return (
        <ApolloProvider client={this.client}>
        <DisplayChars />
        </ApolloProvider>
    );
  }
}
