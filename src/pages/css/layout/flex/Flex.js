import React, { Component } from 'react';
import './Flex.css';
import { Form, Table } from 'react-bootstrap';
import Utils from '../../../../services/Utils';
export default class Flex extends Component {
  state = {flexDirection: "row", justifyContent: "inherit", alignItems: 'inherit', flexProperties: {}}
  arr = [1,2,3,4]
  colors = [];
  componentDidMount = () => {
    let obj = {};
    this.arr.forEach( (item, index) => {
      obj[index] = {flexBasis: "auto", flexGrow: "1", flexShrink: "1"}
      this.colors.push(Utils.randomHex())
    })
    this.setState({flexProperties: obj})
  }
 
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
    const { flexDirection, justifyContent, alignItems } = this.state;
    const flexStyle = { flexDirection, justifyContent, alignItems };
    return (
      <div>
        <div className="flex-control-panel">
          <div>
            <h3>flex container:</h3>
            <Form>
              <Form.Label>flex direction:</Form.Label>
              <Form.Control as="select" onChange={this.flexDirection}>
                <option>row</option>
                <option>column</option>
                <option>row-reverse</option>
                <option>column-reverse</option>
              </Form.Control>
              <Form.Label>justify content:</Form.Label>
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
              <Form.Label>align items:</Form.Label>
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
          </div>
          <div>
            <h3>flex items</h3>
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
                          <option value="300px">300px</option>
                          <option value="400px">400px</option>
                          <option value="300px">600px</option>
                          <option value="400px">800px</option>
                        </Form.Control>
                        </td>
                      <td>   
                        <Form.Control as="select" onChange={ (e) => this.flexItemChange(e, index, 'flexGrow') } custom>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </Form.Control></td>
                      <td>    
                        <Form.Control as="select" onChange={ (e) => this.flexItemChange(e, index, 'flexShrink') } custom>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </Form.Control>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </div>
        </div>
        <div className={`flex-container ${flexClass}`} style={flexStyle}>
          {
            this.arr.map( (item, index) => {
              let tempClass = this.state.flexProperties[index] ? this.state.flexProperties[index] : {} ;
              let innerDivStyle = {backgroundColor: this.colors[index]}
              return <div key={index} style={tempClass}><div style={innerDivStyle}></div><span>{item}</span></div>
            })
          }
        </div>
      </div>
    );
  }
}
