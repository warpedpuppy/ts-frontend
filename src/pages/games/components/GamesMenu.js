import React from 'react'
import { withRouter } from 'react-router-dom'
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
      
        return (
          <nav id="games-nav">
              <span onClick={() => this.goto('/games')}>exit</span>
            </nav>
        )
    } 
  
}
export default withRouter(Menu)
