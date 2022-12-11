import React from 'react'
import './AllCanvas.css'
import { isMobile, isMobileOnly } from 'react-device-detect'
import swim_game from '../animations/swimAnimation'
import SiteContext from '../GamesContext'

export default class CanvasSwim extends React.Component {
    static contextType = SiteContext;

    constructor (props) {
      super(props)
      this.swim_game = {}
      this.testFilter = this.testFilter.bind(this)
      this.loggedInCheck = this.loggedInCheck.bind(this)
      this.state = {
        filterTest: 'off',
        nightMode: 'off',
        loggedIn: true,
        showStartScreen: true
      }
    }

    redirectHome = () => {
      this.context.mazeGameHandler('')
      this.swim_game.stop()
      this.props.history.push('/')
    }

    pauseGame (bool) {
      if (this.swim_game.pause) {
        this.swim_game.pause(bool)
      }
    }

    componentDidMount () {
      this.context.setInGameMazeEdit(false)
      this.context.setMazeGameAction(true)
      this.context.mazeGameHandler('swim')
      this.swim_game = swim_game()

	  this.swim_game.init(isMobile, isMobileOnly, this)

    //   if (this.context.activeMazeId) {
    //     this.swim_game.init(isMobile, isMobileOnly, this.context.activeMazeId, this)
    //   } else {
    //     MazeService.load_ids()
    //     .then((ids) => {
    //       const activeMazeId = ids.length === 0 ? ids[0].id : 0
    //       this.context.setIdsAndActiveMazeId(ids, activeMazeId )
    //       this.swim_game.init(isMobile, isMobileOnly, activeMazeId, this)
    //     })
    //     .catch(error => error)
    //   }
      
    }

    startGame = () => {
      this.setState({ showStartScreen: false })
      this.swim_game.startGame()
    }

    componentWillUnmount () {
      this.context.mazeGameHandler('')
      this.swim_game.stop()
    }

    loggedInCheck () {
      this.setState({ loggedIn: true })
      this.swim_game = swim_game()
      this.swim_game.init(isMobile, isMobileOnly)
    }

    changeGrid (id) {
      if (this.swim_game.changeGrid && (id !== this.swim_game.id)) {
        const obj = this.context.mazes.find((maze) => maze.id === id)
        this.swim_game.changeGrid(obj)
      }
    }

    testFilter () {
      this.swim_game.filterTest()
      if (this.state.filterTest === 'off') {
        this.setState({ filterTest: 'on' })
      } else {
        this.setState({ filterTest: 'off' })
      }
    }

    nightMode () {
      this.swim_game.nightMode()
      if (this.state.nightMode === 'off') {
        this.setState({ nightMode: 'on' })
      } else {
        this.setState({ nightMode: 'off' })
      }
    }

    switchPlayer () {
      this.swim_game.switchPlayer()
    }

    render () {
      this.pauseGame(this.context.mazeGameAction)

      const canvasClass = (isMobile) ? 'canvasParent isMobileOnly' : 'canvasParent'

	  return (
		<div className={canvasClass}>
		  <div id="homeCanvas" className="flyCanvas" />
		</div>

	  )
    }
}
