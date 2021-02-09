import React, { Component } from 'react';
import '../../../sitewide-css/page-layout-with-menu.css';
import Grid from './grid/Grid';
import Flex from './flex/Flex';
export default class Layout extends Component {
  state = {
    active: 'flex',
    buttons: ['flex', 'grid']
  }
  onChange = (e) => {   
   this.setState({active: e.target.innerHTML})
  }
  render() {

    let active;
    if (this.state.active === 'flex') {
      active = <Flex />
    } else {
      active = <Grid />
    }
    return (
      <>
      <h1 className="page-heading">layout</h1>
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
       </>
    );
  }
}
