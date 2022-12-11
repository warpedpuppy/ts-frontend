import React from 'react'
import './Games.css'
import { Switch, Route } from 'react-router-dom'
import GamesContext from './GamesContext'
import Home from './pages/Home'
import Menu from './components/GamesMenu'
import CanvasJump from './components/canvasJump'
import CanvasFly from './components/canvasFly'
import CanvasSwim from './components/canvasSwim'
import Admin from './pages/Admin'
import MazeService from './services/maze-service'
import TokenService from './services/token-service'


export default class Games extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: TokenService.hasAuthToken(),
      mazes: [],
      ids: [],
      game: '',
      activeMazeId: undefined,
      inGameMazeEdit: false,
      mazeGameAction: true
    }
  }
  mounted = false;

  componentDidMount () {
    this.mounted = true;
    MazeService.load_ids()
      .then((ids) => {
        if (this.mounted) {
           const activeMazeId =  ids.length === 0 ? ids[0].id : 0
        	this.setState({ ids, activeMazeId })
        }
       
      })
      .catch(error => error)
  }
  componentWillUnmount = () => {
    this.mounted = false;
  }

  setIdsAndActiveMazeId = (ids, activeMazeId) => {
    this.setState({ ids, activeMazeId })
  }

  addMazes = (mazes) => {
    if (Array.isArray(mazes)) {
      this.setState({ mazes })
    } else {
      const newMazes = [...this.state.mazes, mazes]

      this.setState({ mazes: newMazes })
    }
  }

  deleteMazes = (mazeID) => {
    this.setState({ mazes: this.state.mazes.filter((maze) => mazeID !== maze.id) })
  }

  deleteMazes = (mazeID) => {
    this.setState({ mazes: this.state.mazes.filter((maze) => mazeID !== maze.id) })
  }

  mazeGameHandler = (game) => {
    this.setState({ game })
  }

  setActiveMazeId = (activeMazeId) => {
    this.setState({ activeMazeId })
  }

  setInGameMazeEdit = (inGameMazeEdit) => {
    this.setState({ inGameMazeEdit })
  }

  setMazeGameAction = (mazeGameAction) => {
    this.setState({ mazeGameAction })
  }

  loginHandler = (loggedIn) => {
    this.setState({ loggedIn })

    if (!loggedIn) {
      TokenService.clearAuthToken()
    }
  }

  render () {
    const contextValue = {
      loggedIn: this.state.loggedIn,
      mazes: this.state.mazes,
      addMazes: this.addMazes,
      deleteMazes: this.deleteMazes,
      ids: this.state.ids,
      loginHandler: this.loginHandler,
      game: this.state.game,
      mazeGameHandler: this.mazeGameHandler,
      activeMazeId: this.state.activeMazeId,
      setActiveMazeId: this.setActiveMazeId,
      inGameMazeEdit: this.state.inGameMazeEdit,
      setInGameMazeEdit: this.setInGameMazeEdit,
      mazeGameAction: this.state.mazeGameAction,
      setMazeGameAction: this.setMazeGameAction,
      setIdsAndActiveMazeId: this.setIdsAndActiveMazeId
    }

    return (
      <GamesContext.Provider value={contextValue}>
          <header><Menu /></header>
          <section id="games-wrapper">
            <Switch>
              <Route exact path="/games" render={ () => <Home history={this.props.history} /> }/>
              <Route path="/games/jump-game" component={CanvasJump} />
              <Route exact path="/games/jump-game" component={CanvasJump} />
              <Route exact path="/games/fly-game" render={({ history }) => <CanvasFly history={history} />} />
              <Route exact path="/games/swim-game" render={({ history }) => <CanvasSwim history={history} />} />
              <Route exact path="/games/admin" component={Admin} />
            </Switch>
          </section>
      </GamesContext.Provider>
    )
  }
}
