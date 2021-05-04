import React from 'react'

const GamesContext = React.createContext({
  loggedIn: undefined,
  mazes: [],
  ids: [],
  game: '',
  activeMazeId: undefined,
  inGameMazeEdit: false,
  mazeGameAction: true
})

export default GamesContext;
