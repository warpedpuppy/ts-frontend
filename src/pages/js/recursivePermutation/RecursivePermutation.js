import React, { Component } from 'react';
import './RecursivePermutation.css';
export default class RecursivePermutation extends Component {

  state = {
    num: 12345,
    arr: [],
    functionCalls: [],
    colQ: 1, 
    totalColumns: 0
  }

  componentDidMount = () => {
    let result = this.permutation(this.state.num)
    //this.setState({arr:result})
  }

 resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 400);
    });
  }

  async permutation(num, val) {
    val = val + 1 || 1
  
    this.setState({functionCalls:[...this.state.functionCalls, {type: "call", direction: "forward", value: num, col: val}], totalColumns: val >= this.state.totalColumns ? val : this.state.totalColumns})
    await this.resolveAfter2Seconds();
    

    let str = num.toString();
    let combos = [];
    if (str.length === 1) {
      
      this.setState({functionCalls:[...this.state.functionCalls, {type: "endpoint", direction: "backward", value: str, col: val}]})
        return str;
    } else {
      
        for (let i = 0; i < str.length; i++) {

            let remainder = str.slice(0,i) + str.slice(i+1)
            this.setState({functionCalls:[...this.state.functionCalls, {type: "hold", direction: "forward",value: str[i], col: val}]})
            let result = await this.permutation(remainder, val);
  
            for (let letter of result) {
             // this.setState({functionCalls:[...this.state.functionCalls, {type: "add to array", direction: "backwards",value: str[i]+letter}]})
                combos.push(str[i]+letter)
            }

        }
    }
   
    this.setState({functionCalls:[...this.state.functionCalls, {type: "final return", direction: "backwards",value: combos, col: val}]})
    return combos;
  }


  render() {
    return (
      <div> 
        RecursivePermutation 
        <table class='rp'>
          <thead>
            <tr>
          {
            [...Array(this.state.totalColumns).keys()].map( (item, index) => {
              return <th key={`head${index}`}>function call</th>
            })
          }
          </tr>
          </thead>
          <tbody>
          {
          this.state.functionCalls.map( (item, index) => {
            return <tr key={index}><td class={`${item.type} ${item.direction}`} colSpan={ item.type === 'final return' ? this.state.totalColumns : item.col }> {item.value}</td></tr>
          })
          }
          </tbody>
      
      </table></div>
    );
  }
}
