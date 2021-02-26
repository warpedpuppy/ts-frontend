import React, { Component } from 'react';
import './Grid.css';
import {Form, InputGroup, Table } from 'react-bootstrap';
import Utils from '../../../../services/Utils';
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
    colQ: 0,
    gridGap: "20px"
  }
  arr = [1,2,3,4,5,6,7,8,9,10,11,12]
  colors = [];
  potentialColumns = [1,2,3,4,5,6];
  gaps = ["10px", "20px", "30px", "40px", "50px"]

  componentDidMount = () => {

    
    const colQ =  this.state.gridTemplateColumns.split(" ").length;
    const rowQ = Math.ceil(this.arr.length / colQ);
    let gridRows = {};
    let gridColumns = {};
    let item = 1;
    for (let row = 1; row <= rowQ; row ++){
      for (let col = 1; col <= colQ; col ++){
        gridRows[item] = [row, row + 1];
        gridColumns[item] = [col, col + 1];
        this.colors.push(Utils.randomHex())
        item++;
      }
    }
    const rowEnd = [];
    for (let i = 1; i <= rowQ + 1; i ++ ) {
      rowEnd.push(i)
    }
    const colEnd = [];
    for (let i = 1; i <= colQ + 1; i ++ ) {
      colEnd.push(i)
    }
    this.setState({gridRows, gridColumns, rowEnd, colEnd, rowQ, colQ})
  }
  changeColQ = e => {
    let colQ = Number(e.target.value);
    let gridTemplateColumns = '';
    const colEnd = [];
    for (let i = 0; i < colQ; i ++) {
      gridTemplateColumns += '1fr ';
      colEnd.push(i + 1)
    }
    const rowQ = Math.ceil(this.arr.length / colQ);
    let gridRows = {};
    let gridColumns = {};
    let item = 1;
    for (let row = 1; row <= rowQ; row ++){
      for (let col = 1; col <= colQ; col ++){
        gridRows[item] = [row, row + 1];
        gridColumns[item] = [col, col + 1];
        item++;
      }
    }


    this.setState({gridTemplateColumns, colQ, gridRows, gridColumns, colEnd})
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
    const parentStyle = {gridTemplateRows, gridTemplateColumns, gridGap: this.state.gridGap }
    const activeItemRowStart = this.state.gridRows[this.state.activeGridItem] ? this.state.gridRows[this.state.activeGridItem][0] : 1;
    const activeItemRowEnd = this.state.gridRows[this.state.activeGridItem] ? this.state.gridRows[this.state.activeGridItem][1] : 1;
    const activeItemColStart = this.state.gridColumns[this.state.activeGridItem] ? this.state.gridColumns[this.state.activeGridItem][0] : 1;
    const activeItemColEnd = this.state.gridColumns[this.state.activeGridItem] ? this.state.gridColumns[this.state.activeGridItem][1] : 1;

    return (
      <div>
      <div className="grid-controls">
        <Form>
          <h3>Grid Parent</h3>
          <Form.Group>
            
            <InputGroup className="mb-3">
            <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon3">
            grid-template-columns:
            </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="select" onChange={this.changeColQ} value={this.state.colQ}>
            {
                  this.potentialColumns.map( (item, index) => {
                      return <option value={item} key={index}>{item}</option>
                    })
            }
            </Form.Control>
            </InputGroup>

            <InputGroup className="mb-3">
            <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon3">
            grid-gap:
            </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="select" value={this.state.gridGap} onChange={ e => this.setState({gridGap: e.target.value})} >
                {
                      this.gaps.map( (item, index) => {
                          return <option value={item} key={index}>{item}</option>
                        })
                }
            </Form.Control>
            </InputGroup>
            </Form.Group>
           </Form>
           <Form>
           <h3>Grid Children</h3>
          <Form.Group>
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
            let zIndex = item ===this.state.activeGridItem ? 1 : -1 ;
            let gridItemStyle = {
              gridRow: `${rowStart} / ${rowEnd}`,
              gridColumn: `${colStart} / ${colEnd}`,
              backgroundColor: this.colors[index],
              zIndex
            }
            return <div key={index} style={gridItemStyle}> {item}</div>
          })
        }
      </div>
    </div>
    );
  }
}
