import React, { Component } from 'react';
import './MazeSolver.css';

export default class MazeSolver extends Component {

  state = {
    mazes: [],
    paths: [],
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
    let paths = [[[0,1]]]
    let result = this.findPath(paths, this.state.maze)
    console.log('result =', result)
  }
  counter = 0;
  paths = []
  findPath = (paths, maze) => {
    let rows = maze.length - 1;
    let cols = maze[0].length - 1;
       let newPaths = [];
        let options = false;
        let pathObjectArray = [];
        let waitPeriod = 100;
       
        for (let i = 0; i < paths.length; i++) {
          let hasChanged = false;
          let current = paths[i];
          let [ prevRow, prevCol ] = current[current.length - 1];

          if (current.length > 1 && (prevRow === 0 || prevCol === 0 || prevRow === rows || prevCol === cols)) {
            pathObjectArray.push({path:current, type:'success'})
            hasChanged = true;
          }
          //up
          if (prevRow > 0 && maze[prevRow - 1][prevCol] === 0 && !this.checkForDups(current, prevRow - 1, prevCol)) {
            let temp = [...current, [prevRow - 1,prevCol]];
            newPaths.push(temp)
            pathObjectArray.push({path:temp, type:'tbd'})
            options = true;
            hasChanged = true;

          }
          //right
          if (prevCol <= cols - 1 && maze[prevRow][prevCol + 1] === 0  && !this.checkForDups(current, prevRow, prevCol + 1)) {
            let temp = [...current, [prevRow,prevCol + 1]]
            newPaths.push(temp)
            pathObjectArray.push({path:temp, type:'tbd'})
            options = true;
            hasChanged = true;

          }
          //down
          if (prevRow < rows - 1 && maze[prevRow + 1][prevCol] === 0  && !this.checkForDups(current, prevRow + 1, prevCol)) {
            let temp = [...current, [prevRow + 1, prevCol]]
            newPaths.push(temp)
            pathObjectArray.push({path:temp, type:'tbd'})
            options = true;
            hasChanged = true;

          }
          //left
          if (prevCol > 0 && maze[prevRow][prevCol - 1] === 0 && !this.checkForDups(current, prevRow, prevCol - 1)) {
            let temp = [...current, [prevRow, prevCol - 1]]
            newPaths.push(temp)
            pathObjectArray.push({path:temp, type:'tbd'})
            options = true;
            hasChanged = true;

          }
      

          if(!hasChanged) {
            pathObjectArray.push({path:current, type:'failure'})
            newPaths.push(current);
          }
        }
        // pathObjectArray.sort( (a,b) => a.path.length - b.path.length)
        this.setState({paths: pathObjectArray})
        return options ? setTimeout(() => this.findPath(newPaths, maze), waitPeriod) : console.log('no options') ;

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
    console.log(this.state.paths)
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
          
        </section>
    );
  }
}
