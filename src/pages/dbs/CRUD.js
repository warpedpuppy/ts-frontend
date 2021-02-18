import React from 'react'
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
          active = <GraphQL />
        } else if (this.state.active === 'mongo') {
          active = <Mongo />
        } else if (this.state.active === 'postgresql') {
          active = <PostgresQL />
        }
         return (
            <div className="page"> 
            <aside className="page-menu">
    
                  {
                    this.state.buttons.map( (item, index) => {
                      return <div key={index} className={ item === this.state.active ? `active` : `` } onClick={this.onChange}>{item}</div>
                    })
             
                  }
            </aside>
            <main className="page-content">
              { active }
            </main>
          
           </div>
        )
    }
   
}
