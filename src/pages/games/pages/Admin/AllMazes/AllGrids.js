import React from 'react'
import MazeService from '../../../services/maze-service'
import DisplayMaze from './DisplayMaze'
import './AllGrids.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SiteContext from '../../../GamesContext'
import Spinners from '../../../components/Spinners';
export default class AllGrids extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mazes: [],
      show: false,
      idToDelete: undefined
    }
  }

    static contextType = SiteContext;

    componentDidMount () {
      this.loadMazes()
    }

    handleClose = () => this.setState({ show: false });

    handleShow = (id) => {
      this.setState({ show: true, idToDelete: id })
    };

    deleteMazeHandler = () => {
      this.context.deleteMazes(this.state.idToDelete)

      MazeService.deleteMaze(this.state.idToDelete)
        .then((data) => {
          console.log(data)
        })
      this.setState({ show: false, idToDelete: undefined })
    }

    loadMazes = () => {
      if (!this.context.mazes.length) {
        MazeService.loadAllMazes()
          .then((data) => {
            this.context.addMazes(data.mazes)
          })
      }

      if(!this.context.activeMazeId){
        MazeService.load_ids()
        .then((ids) => {
          const activeMazeId = (ids[0]) ? ids[0].id : 0
          this.context.setIdsAndActiveMazeId(ids, activeMazeId )
        })
        .catch(error => error)
      }
    }

    render () {
      if(this.context.activeMazeId){
          return (
          <React.Fragment>
            <div className="all-grids">
              {
                this.context.mazes.map((mazeObject, index) => (
                  <DisplayMaze
                    key={index}
                    deleteMaze={this.handleShow}
                    {...mazeObject}
                  />
                ))
              }
            </div>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Maze Deleterizer</Modal.Title>
              </Modal.Header>
              <Modal.Body>You are sure you want to delete?</Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={this.deleteMazeHandler}>
                      confirm delete
                </Button>
                <Button variant="warning" onClick={this.handleClose}>
                      cancel delete
                </Button>
              </Modal.Footer>
            </Modal>
          </React.Fragment>
        )
      } else {
        return (<Spinners />)
      }
      
    }
}
