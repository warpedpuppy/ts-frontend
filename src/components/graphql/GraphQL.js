import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';
import DisplayChars from './DisplayChars';
export default class GraphQL extends Component {

    constructor(){
        super();
         this.client = new ApolloClient({
          uri: 'http://localhost:8000/graphql',
          cache: new InMemoryCache()
        });
  
        this.client.query({
            query: gql`
              query GetCharacters {
                characters {
                  id
                  name
                  color
                }
              }
            `
          })
          .then(result => console.log(result))
          .catch(e => console.error(e))
      }


  render() {
    return (
        <ApolloProvider client={this.client}>
            <h2>https://www.apollographql.com/docs/react/get-started/</h2>
          <DisplayChars />
        </ApolloProvider>
    );
  }
}
