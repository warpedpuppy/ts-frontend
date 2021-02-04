import React, { Component } from 'react';
import './CSS.css';
import Hexadecimal from './color/hexadecimal/Hexadecimal';
import HSL from './color/hsl/HSL';
import RGB from './color/rgb/RGB';
export default class CSS extends Component {
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
      <h1 className="css-page-heading">color units</h1>
      <div className="css-page"> 
     
        <aside className="css-page-menu">
          {
            this.state.buttons.map( (item, index) => {
              console.log("here", item, this.state.active);
              return <div key={index} className={ item === this.state.active ? `active` : `` } onClick={this.onChange}>{item}</div>
            })
          }
          
        </aside>
        <main className="css-page-content">
          { active }
        </main>
      
       </div>
       </>
    );
  }
}
