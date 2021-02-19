import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';
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
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to={'/'}>trying something</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                <Nav.Link as={Link} to={'/css'}>css</Nav.Link> 
                <Nav.Link as={Link} to={'/js'}>js</Nav.Link>
                <Nav.Link as={Link} to={'/dbs'}>dbs</Nav.Link>
                <Nav.Link as={Link} to={'/about'}>about</Nav.Link>
            </Navbar.Collapse>
        </Navbar>
        )
    }
}
export default withRouter(Menu); 
