import React from 'react'
import GraphQL from './graphql/GraphQL';
import Mongo from './mongo/Mongo';
export default class JoinPopulate extends React.Component {
    state = {
        active: 'graphql',
        buttons: ['graphql', 'postresql', 'mongo']
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
