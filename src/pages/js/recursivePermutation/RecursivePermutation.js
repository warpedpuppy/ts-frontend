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
    totalColumns: 3,
    permutations: [],
    timerObjects: []
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
    //let permutations = await this.permutation(this.state.num)

    // console.log(permutations)
    // this.setState({permutations})
  }
  startAction = async () => {
    this.state.timerObjects.forEach( item => {
      clearTimeout(item)
    })
    this.setState({permutations: [], functionCalls:[], totalColumns: this.state.num.toString().length}, async ()=> {
      if (this.state.num < 10)return;
      let permutations = await this.permutation(this.state.num);
      this.setState({permutations})
    })
    // 

    // console.log(permutations)
    // this.setState({permutations: JSON.stringify(permutations), functionCalls:[]})
  }

 resolveAfter2Seconds() {
    return new Promise(resolve => {

      let to = setTimeout(() => {
        resolve('resolved');
      }, 400);
      this.setState({timerObjects: [...this.state.timerObjects, to]})

    });
  }

  async permutation(num, val) {
    val = val + 1 || 1
  
    this.setState({functionCalls:[...this.state.functionCalls, {type: "calling function with value:", direction: "forward", value: `permutation(${num});`, col: val, highlight: 1}]})
    await this.resolveAfter2Seconds();
    

    let str = num.toString();
    let combos = [];
    if (str.length === 1) {
      
      this.setState({functionCalls:[...this.state.functionCalls, {type: "start backwards motion with: wiggle", direction: "off backward", value: str, col: val, highlight: 5}]})
        return str;
    } else {
      
        for (let i = 0; i < str.length; i++) {

            let remainder = str.slice(0,i) + str.slice(i+1)
            this.setState({functionCalls:[...this.state.functionCalls, {type: "hold on to: wiggle", direction: "forward",value: `${str[i]} `, col: val, highlight: 11}]})
            let result = await this.permutation(remainder, val);
  
            for (let letter of result) {
              this.setState({functionCalls:[...this.state.functionCalls, {type: "hold on to: combo", direction: "forward",value: `combo result:${str[i]}${letter}`, col: val, highlight: 11}]})
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
      <div className="permutation-controls">
        <input type="text" defaultValue={this.state.num} onChange={e => this.setState({num: e.target.value})}/>
        <button onClick={this.startAction}>click to start</button>
      </div>
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
            [...Array(this.state.totalColumns).keys()].map( (item, index) => {
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

            if (item.col !== 1 && item.value.includes("combo")) {
              return <></>
              // return <tr key={index}><td className={`${item.type} ${item.direction}`} colSpan={ item.type === 'final return' ? this.state.totalColumns : item.col }>&nbsp;</td></tr>
            } else {
              let totalCols = this.state.totalColumns;
              let colsBefore = [...Array(item.col - 1).keys()].map( (item, j) => {
                return <td key={`pre${j}`}>&nbsp;</td>
              });
              let colsAfter = [...Array(totalCols - item.col).keys()].map( (item, k) => {
                return <td key={`post${k}`}>&nbsp;</td>
              });;



                 return( <tr key={index}>
                   {colsBefore}
                   <td className={`${item.type} ${item.direction}`} data-colSpan={ item.type === 'final return' ? this.state.totalColumns : item.col }>
              <span className={`${item.type} ${item.direction}`}>{item.value}</span></td>
                    {colsAfter}
              </tr>)
            }
         
          })
          }
          </tbody>
      
      </table>
      
      </div>
      </div>
    );
  }
}
