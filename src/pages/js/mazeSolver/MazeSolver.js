import React, { Component } from 'react';
import './MazeSolver.css';

export default class MazeSolver extends Component {

  state = {
    mazes: [],
    paths: [{path: []}],
    maze2: [
      [1,0,1,1],
      [1,0,0,1],
      [1,0,1,1],
  ],
    maze: [
      [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1],
      [1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,1],
      [1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
      [1,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,1],
      [1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1],
      [1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1],
      [1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1],
      [1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1],
      [1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1],
      [1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1],
      [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      
  ]
}

 
  componentDidMount = () => {
  
  }
  runMaze = () => {
    let paths = [{path: [[0,1]]}]
    let result = this.findPath(paths, this.state.maze)
    console.log('result =', result)
  }
  resetMaze = () => {
    this.setState({paths: [{path: []}]})
  }
  findPath = (paths, maze) => {
    let rows = maze.length - 1;
    let cols = maze[0].length - 1;
    let anyPathHasChanged = false;
    let pathObjectArray = [];
    
    for (let i = 0; i < paths.length; i++) {
      let individualPathHasChanged = false;
      let current = paths[i].path;
      let [ prevRow, prevCol ] = current[current.length - 1];
      
      if (current.length > 1 && (prevRow === 0 || prevCol === 0 || prevRow === rows || prevCol === cols)) {
        pathObjectArray.push({path:current, type:'success'})
        individualPathHasChanged = true;
      }
      //up
      if (prevRow > 0 && maze[prevRow - 1][prevCol] === 0 && !this.checkForDups(current, prevRow - 1, prevCol)) {
        pathObjectArray.push({path:[...current, [prevRow - 1,prevCol]], type:'tbd'})
        anyPathHasChanged = individualPathHasChanged = true;
      }
      //right
      if (prevCol <= cols - 1 && maze[prevRow][prevCol + 1] === 0  && !this.checkForDups(current, prevRow, prevCol + 1)) {
        pathObjectArray.push({path:[...current, [prevRow,prevCol + 1]], type:'tbd'});
        anyPathHasChanged = individualPathHasChanged = true;
      }
      //down
      if (prevRow < rows - 1 && maze[prevRow + 1][prevCol] === 0  && !this.checkForDups(current, prevRow + 1, prevCol)) {
        pathObjectArray.push({path:[...current, [prevRow + 1, prevCol]], type:'tbd'});
        anyPathHasChanged = individualPathHasChanged = true;
      }
      //left
      if (prevCol > 0 && maze[prevRow][prevCol - 1] === 0 && !this.checkForDups(current, prevRow, prevCol - 1)) {
        pathObjectArray.push({path:[...current, [prevRow, prevCol - 1]], type:'tbd'});
        anyPathHasChanged = individualPathHasChanged = true;
      }
      //no change
      if(!individualPathHasChanged) {
        pathObjectArray.push({path:current, type:'failure'})
      }
    }

    this.setState({paths: pathObjectArray})
    return anyPathHasChanged ? setTimeout(() => this.findPath(pathObjectArray, maze), 40) : console.log('no options') ;

}


    
     
  checkForDups = (arr, row, col) => {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i][0] === row && arr[i][1]=== col) {
            return true;
          }
        }
        return false
      }

  

  render() {
    return (
        <section id="maze-solver">
        {
        this.state.paths.map((pathObject, pathIndex) => {
          return (
            <div className="maze" key={`po${pathIndex}`}> 
            {
              this.state.maze.map ( (row, index) => {

               

              return row.map ( (column, j) => {
                let taken = '';
                for (let i = 0; i < pathObject.path.length; i++){
                    let takenRow = pathObject.path[i][0];
                    let takenColumn = pathObject.path[i][1];
                    if (takenRow === index && takenColumn === j) {
                      taken = pathObject.type === 'success' ? 'success' : pathObject.type === 'tbd' ? 'tbd' : 'failure' ;
                    }
                  }
              
              return <div key={index+j} className={`maze-item color${column} ${taken}`}>&nbsp;</div>
            
            })


              })
            } 
            </div>
          )
        })
        }
        <button onClick={this.runMaze}>run maze</button>
        <button onClick={this.resetMaze}>reset maze</button>
        </section>
    );
  }
}
