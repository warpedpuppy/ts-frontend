import React from 'react'
import './RelativeUnits.css'
import {Form, InputGroup} from 'react-bootstrap';
import Utils from '../../../../services/Utils';
export default class  RelativeUnits extends React.Component {

    state = {
        active: 'em',
        expl: 'Font size of the parent, in the case of typographical properties like font-size, and font size of the element itself, in the case of other properties like width.',
        fontSize: '1em',
        sizes: [1,2,3,4,5,6,7,8,9,10]
    }
    poem = 'Safe upon the solid rock the ugly houses stand:Come and see my shining palace built upon the sand!';
    arr = ['em', 'ex', 'ch', 'rem', 'lh', 'vw', 'vh', 'vmin', 'vmax'];
    explanations = [
        'Font size of the parent, in the case of typographical properties like font-size, and font size of the element itself, in the case of other properties like width.',
        'x-height of the element\'s font.', 
        'The advance measure (width) of the glyph "0" of the element\'s font.',
        'Font size of the root element.',
        'Line height of the element.',
        '1% of the viewport\'s width.',
        '1% of the viewport\'s height.',
        '1% of the viewport\'s smaller dimension.',
        '1% of the viewport\'s larger dimension.'
    ]

    changeUnit = (e) => {

        this.setState({
            active: e.target.innerHTML,
            fontSize: `1${e.target.innerHTML}`,
            expl: this.explanations[this.arr.indexOf(e.target.innerHTML)]
        })
    }
    recalculateSize = (e) => {
        this.setState({size: Number(e.target.value), fontSize: `${e.target.value}${this.state.active}`})
   }
    render () {
        let style = {fontSize: `${this.state.fontSize}`}
        let stripes = {background: `repeating-linear-gradient( 45deg, #FFFFFF, ${Utils.randomHex()} ${this.state.fontSize})`}
        return (
        <div className="relative-units">
        <div id="relative-units-background" style={stripes}></div>
        <ul>
        {
            this.arr.map( (item, index) => {
                return <li key={index} onClick={this.changeUnit} className={ this.state.active === item ? 'active-unit' : ''}>{item}</li>
            })
        }
        </ul>
        <div className="unit-explanation">{ this.state.expl }</div>

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
        <div style={style}> {
        this.poem.split('').map( (letter, index) => {
        if (letter === ":" ) {
            return <span key={index}>{letter}<br /></span>
        }
        return <span key={index}>{letter}</span>})
        
        }</div>
        </fieldset>
    </div>
    )
    }
    
}
