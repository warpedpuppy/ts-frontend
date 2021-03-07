import React from 'react'
import './AbsoluteUnits.css'
import {Form, InputGroup} from 'react-bootstrap';
import AppContext from '../../../../AppContext';
import Utils from '../../../../services/Utils';
export default class AbsoluteUnits extends React.Component {
    state = {
        active: 'cm',
        expl:  '1 centimeter',
        fontSize: '1cm',
        sizes: [1,2,3,4,5,6,7,8,9,10],
        size: 1
    }
    arr = ['cm', 'mm', 'Q', 'in', 'pc', 'pt', 'px'];
    explanations = [
        '1 centimeter',
        '1 millimeter', 
        '1 quarter-millimeter',
        '1 inch',
        '1 pica (1/6th of an inch)',
        '1 point (1/72th of an inch)',
        '1 pixel (1/96th of an inch)'
    ]

   
    changeUnit = (e) => {

        let unit = e.target.innerHTML;

        let sizes = (unit === 'cm' || unit === 'pc' || unit === 'in') ? [1,2,3,4,5,6,7,8,9,10] : [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        this.setState({
            expl: this.explanations[this.arr.indexOf(e.target.innerHTML)],
            active: unit,
            sizes,  
            size: sizes[0],
            fontSize:`${sizes[0]}${unit}`
        })
    }

    recalculateSize = (e) => {
         this.setState({size: Number(e.target.value), fontSize: `${e.target.value}${this.state.active}`})
    }
    render(){
        const fontStyle = {fontSize: `${this.state.fontSize}`}
      
        return (
            <div className="absolute-units">   
             {
                    [...Array(50).keys()].map( (item, index) => {
                        const divStyle = {
                            width: `${this.state.fontSize}`, 
                            height:  `${this.state.fontSize}`,
                            top: `${Math.random()* this.context.browserHeight}px`,
                            left: `${Math.random()* this.context.browserWidth}px`,
                            animationDuration: `${(Math.random()* 1500)+1500}ms`,
                            backgroundColor: Utils.randomHex()
                        }
                        return  <div style={divStyle} className='sample-div'></div>
                    })
                }
                <ul>
                    {
                        this.arr.map( (item, index) => {
                            return <li key={index} onClick={this.changeUnit} className={ this.state.active === item ? 'active-unit' : ''}>{item}</li>
                        })
                    }
                </ul>
                <div className="unit-guide">
                    {
                        this.arr.map( (item, index) => {
                            let style1 = {display: item === this.state.active ? 'flex' : 'none' }
                            
                            return (
                                <div key={index} className='measurement-example' style={style1}>
                                <label>{ this.explanations[index] } &#8594; </label><div className={item}>&nbsp;</div>
                                </div>
                            )
                        })
                    }
                </div>
                <Form.Group>
                <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">
                font-size:
                </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="select" onChange={this.recalculateSize} value={this.state.size}>
                { this.state.sizes.map( (item, index) => <option value={item} key={index}>{item} {this.state.active}</option> ) }
                </Form.Control>
                </InputGroup>
                </Form.Group>
                <fieldset>
                <div style={fontStyle} className='sample-text'>hello world!</div>
                </fieldset>
               
            </div>
        )
    }
}
AbsoluteUnits.contextType = AppContext;