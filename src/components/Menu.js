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

    render() {

        return (
        <nav className="nav-wrapper">
            <Link to="/" className="nav-brand">trying something</Link>
            <input className="nav-hamburger" type="checkbox" />
            <div className="nav-hamburger-spans">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="nav-links">
                <Link to={'/css'}>css</Link> 
                <Link to={'/js'}>js</Link>
                <Link to={'/dbs'}>dbs</Link>
                <Link to={'/games'}>games</Link>
                {/* <Nav.Link as={Link} to={'/art'}>art</Nav.Link> */}
                <Link to={'/about'}>about</Link>
            </div>
        </nav>
        )
    }
}
export default withRouter(Menu); 
