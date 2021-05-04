import React from 'react'
import Button from 'react-bootstrap/Button'
import SiteContext from '../../SiteContext'

export default class Logout extends React.Component {
    static contextType = SiteContext;

    logOutHandler = (e) => {
      e.preventDefault()
      this.context.loginHandler(false)
    }

    render () {
      return (
        <Button variant="danger" onClick={this.logOutHandler}>log out</Button>

      )
    }
}
