import React from 'react'
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
        this.props.onChange(e);
        document.getElementById('sub-checkbox').checked = false;
    }
    render () {
        return (
            <nav className="nav-wrapper sub">
                <div className="nav-brand">{ this.props.title}</div>
                <input className="nav-hamburger" id="sub-checkbox" type="checkbox" />
                <div className="nav-hamburger-spans sub">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="nav-links">
                    {
                         this.props.menuItems.map( (item, index) => {
                            return <div key={index} onClick={this.clickHandler}>{item}</div> 
                        })
                    }
                </div>
            </nav>
        )
    }
    
}
export default withRouter(SubMenu);
