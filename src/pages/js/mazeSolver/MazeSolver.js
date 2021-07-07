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

 timeoutObjects = [];
  componentDidMount = () => {
  
  }
  componentWillUnmount = () => {
    this.timeoutObjects.forEach( item => {
      clearTimeout(item)
    })
  }
  runMaze = () => {
    let paths = [{path: [[0,1]]}]
    let obj = {};
    obj['a0'] = {path: [[0,1]]};
    this.findPath(paths, this.state.maze, obj)
  }
  resetMaze = () => {
    this.timeoutObjects.forEach( item => {
      clearTimeout(item)
    })
    this.setState({paths: [{path: []}]})
  }
  counter = 0;
  findPath = (paths, maze, obj) => {
    let rows = maze.length - 1;
    let cols = maze[0].length - 1;
    let anyPathHasChanged = false;
    let pathObjectArray = [];
    obj = obj || {}

    // for (let i = 0; i < paths.length; i++) {
    for (let key in obj) {
      let individualPathHasChanged = false;
      // let current = paths[i].path;
     let current = obj[key].path;
    //  let currentQ = Object.keys(obj).length;
      let [ prevRow, prevCol ] = current[current.length - 1];

      if (obj[key].type === 'failure') {

        continue;
      }
      
      if (current.length > 1 && (prevRow === 0 || prevCol === 0 || prevRow === rows || prevCol === cols)) {
        pathObjectArray.push({path:current, type:'success'})
        obj[key] = {path:current, type:'success'}
        individualPathHasChanged = true;
        continue;
      }
      //up
      if (prevRow > 0 && maze[prevRow - 1][prevCol] === 0 && !this.checkForDups(current, prevRow - 1, prevCol)) {
        pathObjectArray.push({path:[...current, [prevRow - 1,prevCol]], type:'tbd'})

        if (individualPathHasChanged) {
          let newKey = this.generateNewKey(obj)

          obj[newKey] ={path:[...current, [prevRow - 1, prevCol]], type:'tbd'}
        } else {
          obj[key] = {path:[...current, [prevRow - 1, prevCol]], type:'tbd'}
        }


        anyPathHasChanged = individualPathHasChanged = true;
       
      }
      //right
      if (prevCol <= cols - 1 && maze[prevRow][prevCol + 1] === 0  && !this.checkForDups(current, prevRow, prevCol + 1)) {
        pathObjectArray.push({path:[...current, [prevRow,prevCol + 1]], type:'tbd'});

        if (individualPathHasChanged) {

          let newKey = this.generateNewKey(obj)

          obj[newKey] = {path:[...current, [prevRow, prevCol + 1]], type:'tbd'}
        } else {
          obj[key] = {path:[...current, [prevRow, prevCol + 1]], type:'tbd'}
        }

        anyPathHasChanged = individualPathHasChanged = true;
        
      }
      //down
      if (prevRow < rows - 1 && maze[prevRow + 1][prevCol] === 0  && !this.checkForDups(current, prevRow + 1, prevCol)) {
        pathObjectArray.push({path:[...current, [prevRow + 1, prevCol]], type:'tbd'});

        if (individualPathHasChanged) {
          let newKey = this.generateNewKey(obj)

          obj[newKey] = {path:[...current, [prevRow + 1, prevCol]], type:'tbd'}
        } else {
          obj[key] = {path:[...current, [prevRow + 1, prevCol]], type:'tbd'}
        }


        anyPathHasChanged = individualPathHasChanged = true;

        
        
      }
      //left
      if (prevCol > 0 && maze[prevRow][prevCol - 1] === 0 && !this.checkForDups(current, prevRow, prevCol - 1)) {
        pathObjectArray.push({path:[...current, [prevRow, prevCol - 1]], type:'tbd'});
        
        if (individualPathHasChanged) {
         
          let newKey = this.generateNewKey(obj)
  
          obj[newKey] = {path:[...current, [prevRow, prevCol - 1]], type:'tbd'}
        } else {
          obj[key] = {path:[...current, [prevRow, prevCol - 1]], type:'tbd'}
        }


        anyPathHasChanged = individualPathHasChanged = true;
        
      }
      //no change
      if(!individualPathHasChanged) {
        pathObjectArray.push({path:current, type:'failure'})
        obj[key] = {path:current, type:'failure'}
      }
   
    
    }

    this.counter ++;

    // if (this.counter > 30)return
    this.setState({paths: obj})
    return anyPathHasChanged ? 
    this.timeoutObjects= [...this.timeoutObjects, setTimeout(() => this.findPath(pathObjectArray, maze, obj), 80)]
    : 0 ;

}


  generateNewKey = (obj) => {
    let arr = Object.keys(obj);
    let lastItem = arr[arr.length - 1];
    return `a${+lastItem.slice(1) + 1}`;
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
      <>
      <div className="maze"> 
            {
              this.state.maze.map ( (row, index) => {
                return row.map ( (column, j) => {
                        return <div key={index+j} className={`maze-item color${column}`}>&nbsp;</div>
                      })
              })
            } 
        </div>
        <div className="maze-button-div">
      <button className="maze-button" onClick={this.runMaze}>run maze</button>
      <button  className="maze-button" onClick={this.resetMaze}>reset maze</button>     
      </div>
        <section id="maze-solver">
        {
        Object.keys(this.state.paths).map((key, pathIndex) => {
          let pathObject = this.state.paths[key];
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
        </>
    );
  }
}
