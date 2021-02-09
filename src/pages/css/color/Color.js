import React, { Component } from 'react';
import '../../../sitewide-css/page-layout-with-menu.css';
import Hexadecimal from './hexadecimal/Hexadecimal';
import HSL from './hsl/HSL';
import RGB from './rgb/RGB';
export default class Color extends Component {
  state = {
    active: 'hexadecimal',
    buttons: ['hexadecimal', 'hsl', 'rgb']
  }
  onChange = (e) => {   
   this.setState({active: e.target.innerHTML})
  }
  render() {

    let active;
    if (this.state.active === 'hexadecimal') {
      active = <Hexadecimal />
    } else if (this.state.active === 'hsl') {
      active = <HSL />
    } else {
      active = <RGB />
    }
    return (
      <>
      <h1 className="page-heading">color units</h1>
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
