import React, { Component } from 'react'
import { Link} from 'react-router-dom';
import './Menu.css';
// import UserContext from '../UserContext';
import TokenService from '../services/TokenService';
import { withRouter } from 'react-router-dom';
class Menu extends Component {

  
    
    logOutHandler = (e) => {
        e.preventDefault();
        TokenService.deleteToken();
        this.props.history.push('/')
    }
    clickHandler = (e) => {
        let route = e.target.innerText;
        this.props.history.push(`/${route}`)
        document.getElementById('main-checkbox').checked = false;
    }

    render() {

        return (
        <nav className="nav-wrapper">
            <Link to="/" className="nav-brand">trying something</Link>
            <input className="nav-hamburger" id="main-checkbox" type="checkbox" />
            <div className="nav-hamburger-spans">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="nav-links">
                <div onClick={this.clickHandler}>css</div> 
                <div onClick={this.clickHandler}>js</div>
                {/* <div onClick={this.clickHandler}>dbs</div> */}
                <div onClick={this.clickHandler}>games</div>
                {/* <div >art</div> */}
                <div onClick={this.clickHandler}>about</div>
            </div>
        </nav>
        )
    }
}
export default withRouter(Menu); 
