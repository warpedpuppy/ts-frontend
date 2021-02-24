import React, { Component } from 'react';
import './Grid.css';
import {Form, InputGroup, Table, FormControl} from 'react-bootstrap';
export default class Grid extends Component {
  state = {gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr 1fr", category: "gridContainer", activeGridItem: 1}
  arr = [1,2,3,4,5,6,7,8,9,10,11,12]

  changeCategory = e => {
    console.log(e.target)
    this.setState({category: e.target.id})
  }

  render() {
    const {gridTemplateRows, gridTemplateColumns} = this.state;
    const parentStyle = {gridTemplateRows, gridTemplateColumns }
    let options = [];

    return (
      <div>
      <div className="grid-controls">
        <Form>
          <Form.Group>
            <Form.Check type="radio" name="category" label="grid container" id="gridContainer" onChange={this.changeCategory} />
           
            { this.state.category == "gridContainer" &&  
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
            { this.state.category === "gridItems" && 
            <div>
             <Form.Label>choose which grid item to edit:</Form.Label>
              <Form.Control as="select" onChange={this.flexDirection}>
              {
                this.arr.map( (item, index) => {
                  return <option value={item} key={index}>{item}</option>
                })
              }
            </Form.Control>
            </div>
            }
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
