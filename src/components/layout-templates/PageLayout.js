import React from 'react'
import PropTypes from 'prop-types'
export default function PageLayout(props) {
    return (
        <div className="page"> 
        <aside className="page-menu">
            {
                props.buttons.map( (item, index) => {
                    return <div key={index} className={ item === props.activeString ? `active` : `` } onClick={props.onChange}>{item}</div>
                })
            }
        </aside>
        <main className="page-content">
          { props.active }
        </main>
       </div>
    )
}
PageLayout.propTypes = {
    activeString: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    buttons: PropTypes.array.isRequired,
    // active: PropTypes.func.isRequired

  }
