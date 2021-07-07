import React from 'react'
import './NewGrid.css'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import nextId from 'react-id-generator'
import Select from './Select'
import MazeService from '../../../services/maze-service'
import Grid from './Grid'
import SiteContext from '../../../GamesContext'

export default class NewGrid extends React.Component {
    state = {
      r: 20,
      c: 20,
      activeItem: 'hero',
      drawing: false,
      feedback: ''

    }

    static contextType = SiteContext;

    changeSize = (dimension, number) => {
      if (dimension === 'rows') {
        this.setState({ r: number })
      } else {
        this.setState({ c: number })
      }
    }

    addItem = (x, activeItem) => {
      this.setState({ activeItem })
    }

    onMouseDownHandler = () => {
      this.setState({ drawing: true, feedback: '' })
    }

    onMouseUpHandler = (e) => {
      e.stopPropagation()
      this.setState({ drawing: false })
    }

    clearMaze = () => {
      const elems = document.querySelectorAll('.newGrid .cell')
      elems.forEach((node) => {
        node.classList.remove('hero')
        node.classList.remove('wall')
        node.classList.remove('token1')
        node.classList.remove('token2')
        node.classList.remove('token3')
        node.classList.remove('token4')
      })
    }

    createObject = () => {
      const cells = document.querySelectorAll('.newGrid .cell')
      const obj = {}
      const walls = []

      cells.forEach((node) => {
        const row = node.getAttribute('rowval')
        const cell = node.getAttribute('cellval')
        const className = node.getAttribute('class')
        if (className.includes('hero') ||
                className.includes('token1') ||
                className.includes('token2') ||
                className.includes('token3') ||
                className.includes('token4')
        ) {
          obj[className.substr(5).trim()] = [parseInt(row, 10), parseInt(cell, 10)]
        } else if (className.includes('wall')) {
          walls.push([parseInt(row, 10), parseInt(cell, 10)])
        }
      })
      obj.walls = walls
      obj.c = this.state.c
      obj.r = this.state.r

      return obj
    }

    saveMazeHandler = () => {
      this.setState({ feedback: '' })

      const obj = this.createObject()

      if (obj.hero && obj.token1 && obj.token2 && obj.token3 && obj.token4) {
        MazeService.saveMaze(obj)
          .then((res) => {
            if (res.success) {
              this.context.addMazes(obj)
              this.clearMaze()
              this.setState({ feedback: <Alert variant="success">maze entered!</Alert> })
            }
          })
      } else {
        this.setState({ feedback: <Alert variant="warning">you need to add everything</Alert> })
      }
    }

    tempSaveMazeHandler = () => {
      this.setState({ feedback: '' })

      const obj = this.createObject()
      obj.id = nextId()



      if (obj.hero && obj.token1 && obj.token2 && obj.token3 && obj.token4) {
        this.context.addMazes(obj)
        this.clearMaze()
        this.setState({ feedback: <Alert variant="success">temporary maze entered!</Alert> })
      } else {
        this.setState({ feedback: <Alert variant="warning">you need to add everything</Alert> })
      }
    }

    render () {
      const button = (this.context.loggedIn)
        ? <Button variant="success" onClick={this.saveMazeHandler}>save maze</Button>
        : <Button variant="success" onClick={this.tempSaveMazeHandler}>save temporary maze</Button>
      return (
        <div>
          <fieldset>
            <legend>build a new grid</legend>
            <Select
              title="rows"
              changeSize={this.changeSize}
              currentValue={this.state.rows}
              array={Array.from(Array(51).keys()).splice(20)}
            />
            <Select
              title="cols"
              changeSize={this.changeSize}
              currentValue={this.state.cols}
              array={Array.from(Array(51).keys()).splice(20)}
            />
            <Select
              title="place"
              changeSize={this.addItem}
              currentValue={this.state.activeItem}
              array={['wall', 'hero', 'token1', 'token2', 'token3', 'token4', 'erase']}
            />
            { button }
          </fieldset>
          { this.state.feedback}
          <hr />
          <div onMouseDown={this.onMouseDownHandler} onMouseUp={this.onMouseUpHandler} className="grid newGrid">
            <Grid {...this.state} />
          </div>
        </div>

      )
    }
}
