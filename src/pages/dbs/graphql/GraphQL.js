import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import { useQuery, gql } from '@apollo/client';
import DisplayChars from './DisplayChars';
import Config from '../../../config';
export default class GraphQL extends Component {

    constructor(){
        super();
         this.client = new ApolloClient({
          uri: `${Config.API_URL}/graphql`,
          cache: new InMemoryCache()
        });
  
      //   this.client.query({
      //       query: gql`
      //         query GetCharacters {
      //           gi   characters {
      //                 id
      //                 name
      //                 color
      //               }
      //         }
      //       `
      //     })
      //     .then(result => console.log('result =', result))
      //     .catch(e => console.error(e))
      }


  render() {
    return (
        <ApolloProvider client={this.client}>
            {/* <h2>https://www.apollographql.com/docs/react/get-started/</h2> */}
          <DisplayChars />
        </ApolloProvider>
    );
  }
}
