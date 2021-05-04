import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './GamesMenu.css'
import SiteContext from '../GamesContext'

class Menu extends React.Component {
    static contextType = SiteContext;

    state = {
      // buttonText: "choose maze",
      dropDown: false
    }

    goto = (url) => {
      this.props.history.push(url)
      this.setState({ dropDown: false })
    }

    chooseMaze = (e) => {
      e.preventDefault()
      // this.setState({buttonText: (this.context.inGameMazeEdit)? "choose maze" : "resume"})
      this.context.setInGameMazeEdit(!this.context.inGameMazeEdit)
      this.context.setMazeGameAction(!this.context.mazeGameAction)
    }

    hamburgerClickHandler = () => {
      this.setState({ dropDown: !this.state.dropDown })
    }

    render () {
      const text = (this.context.inGameMazeEdit) ? 'resume game' : 'choose maze'
      if (this.context.game === '') {
        const classRef = (this.state.dropDown) ? 'change' : ''
        return (
          <nav id="primary-nav">
         
            <div className="dropdown-screen" />
            <div className="hamburger" onClick={this.hamburgerClickHandler}>
              <span className={classRef} />
              <span className={classRef} />
              <span className={classRef} />
            </div>
          </nav>
        )
      } else if (this.context.game === 'swim' || this.context.game === 'fly') {
        return (
          <nav id="primary-nav">

            <div className="nav-links">

              <span onClick={() => this.goto('/games')}>exit</span>
            </div>
          </nav>
        )
      } else if (this.context.game === 'jump') {
        return (
          <nav id="primary-nav">
            <div className="nav-links">

              <span onClick={() => this.goto('/games')}>exit</span>
            </div>
            </nav>
        )
      } 
    }
}
export default withRouter(Menu)
