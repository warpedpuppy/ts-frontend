import React, { Component } from 'react';
import '../../sitewide-css/page-layout-with-menu.css';

export default class DBS extends Component {
  state = {
    active: 'operators',
    buttons: ['operators', 'isNaN']
  }
  onChange = (e) => {   
   this.setState({active: e.target.innerHTML})
  }
  render() {

  
    return (
      <>
      <h1 className="page-heading">js</h1>
      <div className="page"> 
        <aside className="page-menu">
          {
            this.state.buttons.map( (item, index) => {
              return <div key={index} className={ item === this.state.active ? `active` : `` } onClick={this.onChange}>{item}</div>
            })
          }
        </aside>
        <main className="page-content">
         
        </main>
      
       </div>
       </>
    );
  }
}
