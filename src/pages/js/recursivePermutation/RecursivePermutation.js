import React, { Component } from 'react';

export default class RecursivePermutation extends Component {

  state = {
    num: 1234,
    arr: []
  }

  componentDidMount = () => {
    let result = this.AllCombos(this.state.num)
    this.setState({arr:result})
  }

  AllCombos(num) {
    let str = num.toString();
    let arr = str.split('')
    let combos = [];
   
    if (str.length  < 2) {
      return str
    }
    for (let i = 0; i < arr.length; i ++ ) {
      let char = arr[i]
      let remainder = [...arr]
      remainder.splice(i, 1)
      let string = remainder.join('')
      let question = this.AllCombos(string)
    
      for (let letter of question) {
        console.log(char, letter)
        combos.push(char + letter) 
      }
    }

    return combos;
  }


  render() {
    return (
      <div> RecursivePermutation {
       this.state.arr.map( (item, index) => {
         return <div key={index}>{item}</div>
       }) 
        
      }</div>
    );
  }
}
