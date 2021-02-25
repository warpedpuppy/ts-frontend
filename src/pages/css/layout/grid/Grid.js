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
    let gridRows = {};
    let gridColumns = {};
    this.arr.forEach( item => {
      gridRows[item] = [item, item];
      gridColumns[item] = [item, item];
    })

    const rowQ = this.arr.length / this.state.gridTemplateColumns.split(" ").length;
    const colQ =  this.state.gridTemplateColumns.split(" ").length;
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
   console.log(this.state.colEnd)

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
                    <Form.Control as="select">
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
                    <Form.Control as="select" onChange={this.changeGridRow} data-index="0">
                        {
                          [...new Array(this.state.rowQ).keys()].map( (item, index) => {
                                  return <option value={item + 1} key={index}>{item + 1}</option>
                                })
                        }
                    </Form.Control>
                    </td>
                    <td>
                    <Form.Control as="select" onChange={this.changeGridRow} data-index="1">
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
                    <Form.Control as="select" onChange={this.changeGridColumn} data-index="0">
                    {
                          [...new Array(this.state.colQ).keys()].map( (item, index) => {
                                  return <option value={item + 1} key={index}>{item + 1}</option>
                                })
                        }
                    </Form.Control>
                    </td>
                    <td>
                    <Form.Control as="select" onChange={this.changeGridColumn} data-index="1">
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
            return <div key={index}> {item}</div>
          })
        }
      </div>
    </div>
    );
  }
}
