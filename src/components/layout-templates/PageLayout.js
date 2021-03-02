import React from 'react'
import PropTypes from 'prop-types'
import './PageLayout.css';
import { withRouter } from 'react-router-dom';
import Utils from '../../services/Utils';
class PageLayout extends React.Component {

    componentDidMount = () => {
        let obj = Utils.parseURLVars(this.props.history.location.search)
        if (obj['sub-category']) {
            this.props.onChange(obj['sub-category'].replace(/%20/g, ' '))
        } else {
             this.props.history.push({ search: `?category=${obj.category}&sub-category=${this.props.activeString}` })
        }
       
    }
    clickHandler = (e) => {
        e.preventDefault();
        let obj = Utils.parseURLVars(this.props.history.location.search)
        this.active = e.target.innerHTML;
        this.props.history.push({
            search: `?category=${obj.category}&sub-category=${e.target.innerHTML}`
          })
        this.props.onChange(e.target.innerHTML)
    }
    render () {
         return (
            <div className="page"> 
            <aside className="page-menu">
                {
                    this.props.buttons.map( (item, index) => {
                        return <div key={index} className={ item === this.props.activeString ? `active` : `` } onClick={this.clickHandler}>{item}</div>
                    })
                }
            </aside>
            <main className="page-content">
            { this.props.activeComponent }
            </main>
        </div>
        )
    }
   
}

export default withRouter(PageLayout);
PageLayout.propTypes = {
    activeString: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    buttons: PropTypes.array.isRequired,
  }
