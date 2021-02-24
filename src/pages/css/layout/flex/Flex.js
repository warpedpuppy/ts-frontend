import React, { Component } from 'react';
import './Flex.css';
import { Form, Table } from 'react-bootstrap';
export default class Flex extends Component {

  componentDidMount = () => {
    let inputs = document.querySelectorAll("table input")
    inputs.forEach( item => {
      item.addEventListener('input', this.inputHandler)
    })
  }
  state = {flexDirection: "row", justifyContent: "inherit", alignItems: 'inherit', flexProperties: {}}
  arr = [1,2,3,4,5,6,7,8]
  flexDirection = (e) => {
    this.setState({flexDirection: e.target.value})
  }
  justifyContent = (e) => {
    this.setState({justifyContent: e.target.value})
  }
  alignItems = e => {
    this.setState({alignItems: e.target.value})
  }
  flexItemChange = (e, item, property) => {
   console.log(item, e.target.value)
   let obj = {...this.state.flexProperties};
   if (!obj[item]) obj[item] = {};
   let temp = {};
    temp[property] = e.target.value
   obj[item] = Object.assign({},obj[item], temp)

   this.setState({flexProperties: obj})
  }

  render() {
    const flexClass = this.state.flexDirection.includes('row') ? 'flex-row' : 'flex-column';
    const { flexDirection, justifyContent, alignItems, selected } = this.state;
    const flexStyle = { flexDirection, justifyContent, alignItems };
    console.log(this.state.flexProperties)
    return (
      <div>
        <div className="flex-control-panel">
        <Form>
          <Form.Label>flex direction</Form.Label>
          <Form.Control as="select" onChange={this.flexDirection}>
            <option>row</option>
            <option>column</option>
            <option>row-reverse</option>
            <option>column-reverse</option>
          </Form.Control>
          <Form.Label>justify content</Form.Label>
          <Form.Control as="select" onChange={this.justifyContent}>
            <option>inherit</option>
            <option>initial</option>
            <option>space-evenly</option>
            <option>space-around</option>
            <option>space-between</option>
            <option>center</option>
            <option>flex-end</option>
            <option>flex-start</option>
          </Form.Control>
          <Form.Label>align items</Form.Label>
          <Form.Control as="select" onChange={this.alignItems}>
            <option>inherit</option>
            <option>initial</option>
            <option>baseline</option>
            <option>stretch</option>
            <option>center</option>
            <option>flex-end</option>
            <option>flex-start</option>
          </Form.Control>
        </Form>
          <Table striped bordered size="sm">
            <thead>
              <tr>
              <th>item</th>
              <th>flex basis</th>
              <th>flex grow</th>
              <th>flex shrink</th>
              </tr>
            </thead>
            <tbody>
                {
                this.arr.map( (item, index) => {
                  return (
                  <tr key={index}>
                    <td>{item}</td>
                    <td>
                      <Form.Control as="select" onChange={ (e) => this.flexItemChange(e, index, 'flexBasis') } custom>
                        <option value="auto">auto</option>
                        <option value="100px">100px</option>
                        <option value="200px">200px</option>
                      </Form.Control>
                      </td>
                    <td>   
                      <Form.Control as="select" onChange={ (e) => this.flexItemChange(e, index, 'flexGrow') } custom>
                        <option value="-1">-1</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </Form.Control></td>
                    <td>    
                      <Form.Control as="select" onChange={ (e) => this.flexItemChange(e, index, 'flexShrink') } custom>
                        <option value="-1">-1</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </Form.Control>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
        <div className={`flex-container ${flexClass}`} style={flexStyle}>
          {
            this.arr.map( (item, index) => {
              let tempClass = this.state.flexProperties[index] ? this.state.flexProperties[index] : {} ;
              return <div key={index} style={tempClass}>{item}</div>
            })
          }
        </div>
      </div>
    );
  }
}
