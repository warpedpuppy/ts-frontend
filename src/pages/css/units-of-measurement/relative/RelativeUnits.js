import React, { useState } from 'react'
import './RelativeUnits.css'
export default function RelativeUnits() {
    const [active, setActive] = useState('em');
    const [expl, setExpl] = useState('Font size of the parent, in the case of typographical properties like font-size, and font size of the element itself, in the case of other properties like width.');
    const [fontSize, setFontSize] = useState('1cm')
    let arr = ['em', 'ex', 'ch', 'rem', 'lh', 'vw', 'vh', 'vmin', 'vmax'];
    let explanations = [
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

    let style = {fontSize: `${fontSize}`}
    function changeUnit (e) {
        setFontSize(`1${e.target.innerHTML}`)
        setExpl(explanations[arr.indexOf(e.target.innerHTML)])
        setActive(e.target.innerHTML)
    }
    return (
        <div className="relative-units">
        <ul>
        {
            arr.map( (item, index) => {
                return <li key={index} onClick={changeUnit} className={ active === item ? 'active-unit' : ''}>{item}</li>
            })
        }
        </ul>
        <div className="unit-explanation">{ expl }</div>
        <div style={style}>hello</div>
    </div>
    )
}
