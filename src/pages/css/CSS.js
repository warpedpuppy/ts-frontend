import React, { Component } from 'react';
import './CSS.css';
import Hexidecimal from './color/hexidecimal/Hexidecimal';
import HSL from './color/hsl/HSL';
export default class CSS extends Component {
  state = {
    active: 'hexadecimal'
  }
  onChange = (e) => {
   this.setState({active: e.target.innerHTML})
  }
  render() {

    let active;
    if (this.state.active === 'hexadecimal') {
      active = <Hexidecimal />
    } else if (this.state.active === 'hsl') {
      active = <HSL />
    }
    return (
      <>
      <h1 className="css-page-heading">color units</h1>
      <div className="css-page"> 
     
        <aside className="css-page-menu">
          <div onClick={this.onChange}>hexadecimal</div>
          <div onClick={this.onChange}>hsl</div>
          <div onClick={this.onChange}>rgb</div>
        </aside>
        <main className="css-page-content">
          { active }
        </main>
      
       </div>
       </>
    );
  }
}
