import React, { Component } from 'react';
import './About.css';
import APIServices from '../../services/APIServices';
import TokenService from '../../services/TokenService';
import AppContext from '../../AppContext';
import Admin from './components/Admin';
import AboutText from './components/AboutText';
import AdminLogin from './components/AdminLogin';
export default class About extends Component {
  state = {
    code: '', 
    showLogin: false, 
    yearsWorking: 0,
    showAdmin: false
  }
  componentDidMount = () => {
    let date = new Date();
    let currentYear = date.getFullYear();
    this.setState({yearsWorking: currentYear - 2004})
  }
  toggleAdmin = () => {
    this.setState({showAdmin: !this.state.admin})
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
    let response = await APIServices.post(`/admin/keypad`, {code})

    if (response.success) {
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
          <button onClick={(e) => this.context.logInOut(e,false) }>log out</button>
          <Admin />
          </>
        )
    } else if (!this.state.showAdmin) {

        return (
            <>
            <AboutText yearsWorking={this.state.yearsWorking} />
            <span id="see-admin-login" onClick={() => this.setState({showAdmin:!this.state.showAdmin})}>🤪</span>
            </>
            )
    } else {

          return (
            
            <>
             {/* <div className="lines">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div> */}
            <AdminLogin keyPress={this.keyPress} showForm={this.showForm} code={this.state.code} showLogin={this.state.showLogin} loggedIn={this.context.loggedIn} submitForm={this.submitForm} />
              {/* <section id="admin-login">
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
                </section> */}
                <span id="see-admin-login" onClick={() => this.setState({showAdmin:!this.state.showAdmin})}>🤪</span>
              </>
            );
      }
  }
}
About.contextType = AppContext;