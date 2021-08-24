import React from 'react'
import './AllCanvas.css'
import './CanvasFly.css'
import { isMobile, isMobileOnly } from 'react-device-detect'
import FlyAnimation from '../animations/flyAnimation'
import SiteContext from '../GamesContext'
import MazeService from '../services/maze-service';
import Spinners from './Spinners';
export default class CanvasFly extends React.Component {
  constructor (props) {
    super(props)
    this.fly_anim = {}
    this.testFilter = this.testFilter.bind(this)
    this.pauseGame = this.pauseGame.bind(this)
    this.state = {
      filterTest: 'off',
      nightMode: 'off',
      loggedIn: true,
      showStartScreen: true
    }
  }

    static contextType = SiteContext;

    componentDidMount () {
      this.context.setMazeGameAction(true)
      this.context.setInGameMazeEdit(false)
      this.context.mazeGameHandler('fly')
      this.fly_anim = FlyAnimation();
      if (this.context.activeMazeId) {
        this.fly_anim.init(isMobile, isMobileOnly, this.context.activeMazeId, this)
      } else {
        MazeService.load_ids()
        .then((ids) => {
          const activeMazeId = (ids[0]) ? ids[0].id : 0
          this.context.setIdsAndActiveMazeId(ids, activeMazeId )
          this.fly_anim.init(isMobile, isMobileOnly, activeMazeId, this)
        })
        .catch(error => error)
      }
    }

    redirectHome = () => {
      this.context.mazeGameHandler('')
      this.fly_anim.stop()
      this.props.history.push('/')
    }

    startGame = () => {
      this.setState({ showStartScreen: false })
      this.fly_anim.startGame()
    }

    pauseGame (bool) {
      if (this.fly_anim.pause) {
        this.fly_anim.pause(bool)
      }
    }

    componentWillUnmount () {
      this.context.mazeGameHandler('')
      this.fly_anim.stop()
    }

    testFilter () {
      this.fly_anim.filterTest()
      if (this.state.filterTest === 'off') {
        this.setState({ filterTest: 'on' })
      } else {
        this.setState({ filterTest: 'off' })
      }
    }

    leftHit (e) {
      e.preventDefault()
      this.fly_anim.keyHandler.leftHit(e)
    }

    rightHit (e) {
      this.fly_anim.keyHandler.rightHit(e)
    }

    spaceHit (e) {
      this.fly_anim.keyHandler.spaceHit(e)
    }

    nightMode () {
      this.fly_anim.nightMode()
      if (this.state.nightMode === 'off') {
        this.setState({ nightMode: 'on' })
      } else {
        this.setState({ nightMode: 'off' })
      }
    }

    changeGrid (id) {
      if (this.fly_anim.changeGrid && (id !== this.fly_anim.id)) {
        const obj = this.context.mazes.find((maze) => maze.id === id)
        this.fly_anim.changeGrid(obj)
      }
    }

    switchPlayer () {
      this.fly_anim.switchPlayer()
    }

    render () {
      this.pauseGame(this.context.mazeGameAction)

      const canvasClass = (isMobile) ? 'canvasParent isMobileOnly' : 'canvasParent'
      if (this.context.activeMazeId) {
          if (!this.context.inGameMazeEdit) {
            return (
              <div className={canvasClass}>
                <div id="homeCanvas" className="flyCanvas" />
              </div>

            )
          }
          this.changeGrid(this.context.activeMazeId)
          // return (
          //   <div className={canvasClass}>
          //     <div id="homeCanvas" className="flyCanvas" /><div className="inGameAllGrids"><AllGrids /></div>
          //   </div>
          // )
      } else {
        return (
        <Spinners />
        )
      }
    
    }
}
