import React, { Component } from 'react';
import './RecursivePermutation.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
export default class RecursivePermutation extends Component {

  state = {
    num: 123,
    arr: [],
    functionCalls: [],
    colQ: 1, 
    totalColumns: 0,
    permutations: []
  }

  code = `function permutation(num) {
  let str = num.toString();
  let combos = [];
  if (str.length === 1) {
      return str; 
  } else {
      for (let i = 0; i < str.length; i++) {
        let remainder = str.slice(0,i) + str.slice(i+1);
        let result = permutation(remainder);
        for (let letter of result) {
              combos.push(str[i]+letter)
        }
      }
  };
  return combos;
}`

  componentDidMount = async () => {
    // HLJS.highlightAll();
    let permutations = await this.permutation(this.state.num)

    console.log(permutations)
    this.setState({permutations})
  }
  startAction = async () => {
    this.setState({functionCalls:[]}, async ()=> {
let permutations = await this.permutation(this.state.num)
    })
    // 

    // console.log(permutations)
    // this.setState({permutations: JSON.stringify(permutations), functionCalls:[]})
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
  
    this.setState({functionCalls:[...this.state.functionCalls, {type: "calling function with value:", direction: "forward", value: `permutation(${num});`, col: val, highlight: 1}]})
    await this.resolveAfter2Seconds();
    

    let str = num.toString();
    let combos = [];
    if (str.length === 1) {
      
      this.setState({functionCalls:[...this.state.functionCalls, {type: "start backwards motion with:", direction: "off backward", value: str, col: val, highlight: 5}]})
        return str;
    } else {
      
        for (let i = 0; i < str.length; i++) {

            let remainder = str.slice(0,i) + str.slice(i+1)
            this.setState({functionCalls:[...this.state.functionCalls, {type: "hold on to: ", direction: "forward",value: `${str[i]} `, col: val, highlight: 11}]})
            let result = await this.permutation(remainder, val);
  
            for (let letter of result) {
              this.setState({functionCalls:[...this.state.functionCalls, {type: "hold on to: ", direction: "forward",value: `combo result: ${str[i]}${letter}`, col: val, highlight: 11}]})
             // this.setState({functionCalls:[...this.state.functionCalls, {type: "add to array", direction: "backwards",value: str[i]+letter}]})
                combos.push(str[i]+letter)
            }

        }
    }
   
    // this.setState({functionCalls:[...this.state.functionCalls, {type: "final return", direction: "backwards",value: combos, col: val}]})
    return combos;
  }

  removeHighlight(node) {
    node.classList.remove("highlight")
  }


  render() {

    return (
      <div className="recursivePermutation-shell">
      <input type="text" defaultValue={this.state.num} />
      <button onClick={this.startAction}>click to start</button>
      <div>{this.state.permutations.join(',')}</div>
      <div className="recursivePermutation-page"> 

<SyntaxHighlighter
              style={a11yDark}
              wrapLines={true}
              showLineNumbers={true}
            >
              {this.code}
            </SyntaxHighlighter>
        <table className='rp'>
          <thead>
            <tr>
          {
            [...Array(this.state.num.toString().length).keys()].map( (item, index) => {
              return <th key={`head${index}`}></th>
            })
          }
          </tr>
          </thead>
          <tbody>
          {

          this.state.functionCalls.map( (item, index) => {
           

            var highlightRow = document.querySelector(`code > span:nth-child(${item.highlight}) > span:nth-child(1)`)
            highlightRow.classList.add("highlight");
            setTimeout(() => this.removeHighlight(highlightRow), 1400)

            return <tr key={index}><td className={`${item.type} ${item.direction}`} colSpan={ item.type === 'final return' ? this.state.totalColumns : item.col }>{item.value}</td></tr>
          })
          }
          </tbody>
      
      </table>
      
      </div>
      </div>
    );
  }
}
