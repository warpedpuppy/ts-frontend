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
            console.log(str)
            for (let i = 0; i < arr.length; i ++ ) {
            let char = arr[i]
            let remainder = [...arr]
            remainder.splice(i, 1)
            let string = remainder.join('')
            let question = AllCombos(string)
            // console.log('question = ', question)
            for (let letter of question) {
                // console.log("char = ", char, "letter = ", letter)
                combos.push(char + letter) 
            }
        
            }
            return combos;
        }

        console.log(AllCombos(901))
    `}
  </code> </div>
    );
  }
}
