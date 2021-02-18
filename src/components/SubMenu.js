import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import './SubMenu.css';
export default function  SubMenu (props) {
    function clickHandler(e) {
        e.preventDefault();
        props.onChange(e)
    }
    return (
        <Navbar collapseOnSelect expand="lg" >
            <Navbar.Brand as={Link} to={'/'}>{props.title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                {
                    props.menuItems.map( (item, index) => {
                        return <Nav.Link key={index} onClick={clickHandler}>{item}</Nav.Link> 
                    })
                }
      
            </Navbar.Collapse>
        </Navbar>
    )
}

