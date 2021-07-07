import React, { Component } from 'react';

export default class RecursivePermutation extends Component {
  render() {
    return (
      <div> 
          <code>
        {`
          function AllCombos(num) {
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
            let question = AllCombos(string)

            for (let letter of question) {

                combos.push(char + letter) 
            }
        
            }
            return combos;
        }

    `}
  </code> </div>
    );
  }
}
