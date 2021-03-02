import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import './SubMenu.css';
import { withRouter } from 'react-router-dom';
import Utils from '../../services/Utils';
class SubMenu extends React.Component {

    componentDidMount = () => {
        let obj = Utils.parseURLVars(this.props.history.location.search)
        if (!obj.category) {
            this.props.history.push({
                search: `?category=${this.props.active}`
            })
        }
    }
    clickHandler = (e) => {
        e.preventDefault();
        this.props.history.push({
            search: `?category=${e.target.innerHTML}`
          })
        this.props.onChange(e)
    }
    render () {
        return (
            <Navbar collapseOnSelect expand="lg" >
                <Navbar.Brand as={Link} to={'/'}>{ this.props.title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    {
                         this.props.menuItems.map( (item, index) => {
                            return <Nav.Link key={index} onClick={this.clickHandler}>{item}</Nav.Link> 
                        })
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
    
}
export default withRouter(SubMenu);
