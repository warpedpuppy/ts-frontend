import React from 'react'
import PageLayout from '../../../components/layout-templates/PageLayout';
import GraphQL from './graphql/GraphQL';
import Mongo from './mongo/Mongo';
import PostgresQL from './postresql/PostgresQL';
export default class CRUD extends React.Component {
    state = {
        active: 'graphql',
        buttons: ['graphql', 'postgresql', 'mongo', 'serverless - aws']
      }
      onChange = (active) => {   
       this.setState({active})
      }
    render() {
        let activeComponent;
        if (this.state.active === 'graphql') {
          activeComponent = <GraphQL client={this.props.client} />
        } else if (this.state.active === 'mongo') {
          activeComponent = <Mongo />
        } else if (this.state.active === 'postgresql') {
          activeComponent = <PostgresQL />
        }
         return (
           <PageLayout 
            activeString={this.state.active} 
            buttons={this.state.buttons} 
            onChange={this.onChange} 
            activeComponent={activeComponent}
            />
        )
    }
   
}
