import React from 'react'
import PageLayout from '../../../components/layout-templates/PageLayout';
import GraphQL from './graphql/GraphQL';
import Mongo from './mongo/Mongo';
import PostgresQL from './postresql/PostgresQL';
export default class CRUD extends React.Component {
    state = {
        active: 'graphql',
        buttons: ['graphql', 'postgresql', 'mongo']
      }
      onChange = (e) => {   
       this.setState({active: e.target.innerHTML})
      }
    render() {
        let active;
        if (this.state.active === 'graphql') {
          active = <GraphQL client={this.props.client} />
        } else if (this.state.active === 'mongo') {
          active = <Mongo />
        } else if (this.state.active === 'postgresql') {
          active = <PostgresQL />
        }
         return (
           <PageLayout activeString={this.state.active} buttons={this.state.buttons} onChange={this.onChange} active={active}/>
        )
    }
   
}
