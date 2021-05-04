import React from 'react'
import './AllCanvas.css'
import { isMobile, isMobileOnly } from 'react-device-detect'
import jump_game from '../animations/jumpAnimation'
import SiteContext from '../GamesContext'

export default class CanvasJump extends React.Component {
    static contextType = SiteContext;

    constructor (props) {
      super(props)
      this.jump_game = {}
      this.testFilter = this.testFilter.bind(this)
      this.loggedInCheck = this.loggedInCheck.bind(this)
      this.state = {
        filterTest: 'off',
        nightMode: 'off',
        loggedIn: true,
        showStartScreen: true
      }
    }

    pauseGame (bool) {
      if (this.jump_game.pause) {
        this.jump_game.pause(bool)
      }
    }

    componentDidMount () {
      this.context.mazeGameHandler('jump')
      if (this.state.loggedIn) {
        this.jump_game = jump_game()
        this.jump_game.init(isMobile, isMobileOnly)
      }
    }

    startGame = () => {
      this.setState({ showStartScreen: false })
      this.jump_game.startGame()
    }

    componentWillUnmount () {
      this.context.mazeGameHandler('')
      this.jump_game.stop()
    }

    loggedInCheck () {
      this.setState({ loggedIn: true })
      this.jump_game = jump_game()
      this.jump_game.init(isMobile, isMobileOnly)
    }

    testFilter () {
      this.jump_game.filterTest()
      if (this.state.filterTest === 'off') {
        this.setState({ filterTest: 'on' })
      } else {
        this.setState({ filterTest: 'off' })
      }
    }

    nightMode () {
      this.jump_game.nightMode()
      if (this.state.nightMode === 'off') {
        this.setState({ nightMode: 'on' })
      } else {
        this.setState({ nightMode: 'off' })
      }
    }

    switchPlayer () {
      this.jump_game.switchPlayer()
    }

    render () {
      this.pauseGame(this.context.mazeGameAction)
      const canvasClass = (isMobile) ? 'canvasParent isMobileOnly' : 'canvasParent' ;
      return (
        <div className={canvasClass}>
          <div id="homeCanvas" />
        </div>
      )
    }
}
