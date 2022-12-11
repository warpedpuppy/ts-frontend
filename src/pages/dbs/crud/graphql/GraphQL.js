import React from 'react';
import Mutations from '../../../../services/graphql-services';
import Config from '../../../../config';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import CrudBody from '../components/CrudBody';
import AppContext from '../../../../AppContext';

export default class GraphQL extends React.Component {

	state = {client: undefined}

    componentDidMount = () => {
      this.client = new ApolloClient({
        uri: `${Config.API_URL}/graphql`,
        cache: new InMemoryCache()
      });
	  this.setState({client: this.client})
      Mutations.setClient(this.client, this.context.userID);
    }

   render () {
      if (!this.state.client) return <div>loading. . . </div>
      return (
        <ApolloProvider client={this.client}>
          <CrudBody service={Mutations} />
        </ApolloProvider>
        )
    }
}
GraphQL.contextType = AppContext;
