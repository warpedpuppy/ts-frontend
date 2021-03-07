import React from 'react'
import './FontSpecific.css'
export default class  RelativeUnits extends React.Component {

    state = {
        active: 'medium',
        expl: '',
    }
    arr = ['xx-small', 'x-small', 'small','medium', 'large', 'x-large', 'xx-large', 'xxx-large','larger', 'smaller'];
    explanations = [
        '',
        '', 
        '',
        '',
        '',
        ''
    ]

    changeUnit = (e) => {
        this.setState({
            active: e.target.innerHTML,
            expl: this.explanations[this.arr.indexOf(e.target.innerHTML)]
        })
    }
    recalculateSize = (e) => {
        this.setState({fontSize: `${this.state.active}`})
   }
    render () {
        let style = {fontSize: this.state.active}
        return (
        <div className="relative-units">
        <ul>
        {
            this.arr.map( (item, index) => {
                return <li key={index} onClick={this.changeUnit} className={ this.state.active === item ? 'active-unit' : ''}>{item}</li>
            })
        }
        </ul>
        <div className="unit-explanation">{ this.state.expl }</div>

     
        <fieldset>
        <div style={style}>hello</div>
        </fieldset>
    </div>
    )
    }
    
}
