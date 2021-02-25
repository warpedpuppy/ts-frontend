import React, { Component } from 'react';
import './Grid.css';
import {Form, InputGroup, Table, FormControl} from 'react-bootstrap';
export default class Grid extends Component {
  state = {
    gridTemplateColumns: "1fr 1fr 1fr", 
    gridTemplateRows: "1fr 1fr 1fr", 
    category: "gridItems", 
    activeGridItem: 1, 
    gridRows: {}, 
    gridColumns: {},
    rowEnd: [],
    rowQ: 0,
    colEnd: [],
    colQ: 0
  }
  arr = [1,2,3,4,5,6,7,8,9,10,11,12]

  componentDidMount = () => {

    const rowQ = this.arr.length / this.state.gridTemplateColumns.split(" ").length;
    const colQ =  this.state.gridTemplateColumns.split(" ").length;
    let gridRows = {};
    let gridColumns = {};
    let item = 1;
    for (let row = 1; row <= rowQ; row ++){
      for (let col = 1; col <= colQ; col ++){
        gridRows[item] = [row, row];
        gridColumns[item] = [col, col];
        item++;
      }
    }
    const rowEnd = [];
    for (let i = 1; i <= rowQ; i ++ ) {
      rowEnd.push(i)
    }
    const colEnd = [];
    for (let i = 1; i <= colQ; i ++ ) {
      colEnd.push(i)
    }
    this.setState({gridRows, gridColumns, rowEnd, colEnd, rowQ, colQ})
  }
  changeCategory = e => {
    console.log(e.target)
    this.setState({category: e.target.id})
  }
  changeGridRow = e => {
    let obj = {...this.state.gridRows};
    let index = Number(e.target.dataset.index);
    let value = Number(e.target.value)
    obj[this.state.activeGridItem][index] = value;

    if (index === 0) {
      let rowEnd = [];
      for (let i = value; i <= this.state.rowQ; i ++ ) {
        rowEnd.push(i)
      }
      this.setState({rowEnd}) //CAN I UNIFY THIS WITH SET STATE BELOW?
    }
    this.setState({gridRows: Object.assign({}, this.state.gridRows, obj)})
  }
  changeGridColumn = e => {
    let obj = {...this.state.gridColumns};
    let index = Number(e.target.dataset.index);
    let value = Number(e.target.value)
    obj[this.state.activeGridItem][index] = value;

    if (index === 0) {
      let colEnd = [];
      for (let i = value; i <= this.state.colQ; i ++ ) {
        colEnd.push(i)
      }
      this.setState({colEnd}) //CAN I UNIFY THIS WITH SET STATE BELOW?
    }
    this.setState({gridColumns: Object.assign({}, this.state.gridColumns, obj)})
  }


  render() {
    const {gridTemplateRows, gridTemplateColumns} = this.state;
    const parentStyle = {gridTemplateRows, gridTemplateColumns }
    const activeItemRowStart = this.state.gridRows[this.state.activeGridItem] ? this.state.gridRows[this.state.activeGridItem][0] : 1;
    const activeItemRowEnd = this.state.gridRows[this.state.activeGridItem] ? this.state.gridRows[this.state.activeGridItem][1] : 1;
    const activeItemColStart = this.state.gridColumns[this.state.activeGridItem] ? this.state.gridColumns[this.state.activeGridItem][0] : 1;
    const activeItemColEnd = this.state.gridColumns[this.state.activeGridItem] ? this.state.gridColumns[this.state.activeGridItem][1] : 1;

    return (
      <div>
      <div className="grid-controls">
        <Form>
          <Form.Group>
            <Form.Check type="radio" name="category" label="grid container" id="gridContainer" onChange={this.changeCategory} />
           
            { this.state.category === "gridContainer" &&  
            <div>
              <InputGroup className="mb-3">
            <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon3">
            grid-template-rows:
            </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="basic-url" aria-describedby="basic-addon3" />
            </InputGroup>

            <InputGroup className="mb-3">
            <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon3">
            grid-template-columns:
            </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="basic-url" aria-describedby="basic-addon3" />
            </InputGroup>
            </div>}
             
            </Form.Group>
           
          <Form.Group>
            <Form.Check type="radio"  name="category" label="grid items" id="gridItems" onChange={this.changeCategory} />
            <Table>
              <thead>
                <tr>
                <th>grid item</th>
                <th>css property</th>
                <th>start</th>
                <th>end</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan="2">
                    <Form.Control as="select" onChange={ e => this.setState({activeGridItem: Number(e.target.value)})} >
                        {
                              this.arr.map( (item, index) => {
                                  return <option value={item} key={index}>{item}</option>
                                })
                        }
                    </Form.Control>
                    </td>
                    <td>
                      grid-row
                    </td>
                    <td>
                    <Form.Control as="select" onChange={this.changeGridRow} data-index="0" value={activeItemRowStart}>
                        {
                          [...new Array(this.state.rowQ).keys()].map( (item, index) => {
                                  return <option value={item + 1} key={index}>{item + 1}</option>
                                })
                        }
                    </Form.Control>
                    </td>
                    <td>
                    <Form.Control as="select" onChange={this.changeGridRow} data-index="1" value={activeItemRowEnd}>
                        { 
                              this.state.rowEnd.map( (item, index) => {
  
                                  return <option value={item} key={index}>{item}</option>
                                })
                        }
                    </Form.Control>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      grid-column
                    </td>
                    <td>
                    <Form.Control as="select" onChange={this.changeGridColumn} data-index="0" value={activeItemColStart}>
                    {
                          [...new Array(this.state.colQ).keys()].map( (item, index) => {
                                  return <option value={item + 1} key={index}>{item + 1}</option>
                                })
                        }
                    </Form.Control>
                    </td>
                    <td>
                    <Form.Control as="select" onChange={this.changeGridColumn} data-index="1" value={activeItemColEnd}>
                    { 
                              this.state.colEnd.map( (item, index) => {
                                  return <option value={item} key={index}>{item}</option>
                                })
                        }
                    </Form.Control>
                    </td>
                  </tr>
                </tbody>
            </Table>
           
               
           
         
          
          </Form.Group>
        </Form>

      </div>
      <div className="grid-parent" style={parentStyle}>
        {
          this.arr.map( (item, index) => {
            
            let rowStart = this.state.gridRows[item] ? this.state.gridRows[item][0] : item ;
            let rowEnd = this.state.gridRows[item] ? this.state.gridRows[item][1]: item ;
            let colStart = this.state.gridColumns[item] ? this.state.gridColumns[item][0] : item ;
            let colEnd = this.state.gridColumns[item] ? this.state.gridColumns[item][1]: item ;
            let gridItemStyle = {
              gridRow: `${rowStart} / ${rowEnd}`,
              gridColumn: `${colStart} / ${colEnd}`
            }
            return <div key={index} style={gridItemStyle}> {item}</div>
          })
        }
      </div>
    </div>
    );
  }
}
