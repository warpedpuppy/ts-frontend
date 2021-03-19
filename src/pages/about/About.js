import React, { Component } from 'react';
import './About.css';
import APIServices from '../../services/APIServices';
import TokenService from '../../services/TokenService';
import AppContext from '../../AppContext';
import Admin from './components/Admin';
export default class About extends Component {
  state = {
    code: '', 
    showLogin: false
  }
  keyPress = (e) => {
    let code = this.state.code;
    code += e.target.innerHTML
    if (code.length > 4) {
      code = code.substring(1)
    } 
    
    if (code.length === 4) {
      this.sendKeyPadData(code)
    }
    this.setState({code})
  }
  sendKeyPadData = async (code) => {
    let reponse = await APIServices.post(`/admin/keypad`, {code})
    if (reponse.success) {
      this.setState({showLogin: true})
    }
  }
  submitForm = async e => {
    e.preventDefault();
    let code = e.target.login.value;
    let response = await APIServices.post(`/admin/login`, {code})
    const { success, token } = response;
    if (success) {
      TokenService.setToken(token)
      this.setState({showLogin: true})
      this.context.logInOut(undefined, true);
    }
  }
  render() {
    if (this.context.loggedIn) {
      return ( 
          <>
            logged in: {this.context.loggedIn ? "true" : "false"}
          <button onClick={(e) => this.context.logInOut(e,false) }>log out</button>
          <Admin />
          </>
        )
      
    } else {
        return (
              <>
                <div onClick={this.showForm}>🤪😀🤪😀🤪😀🤪😀🤪</div>
                logged in: {this.context.loggedIn ? "true" : "false"}
                {  
                  !this.state.showLogin && <><div className="login-grid">
                  { [...new Array(9).keys()].map( (item, index) => {
                    return <div key={index} onClick={this.keyPress}>{item + 1}</div>
                  })}
                  </div><div>{this.state.code}</div></>
                }
                {
                  !this.context.loggedIn && this.state.showLogin && <form onSubmit={this.submitForm}><input type="password" name="login" /><input type="submit" /></form>
                }
              </>
            );
    }
  }
}
About.contextType = AppContext;