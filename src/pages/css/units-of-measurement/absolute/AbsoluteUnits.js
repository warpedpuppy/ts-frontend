import React, { useState } from 'react'
import './AbsoluteUnits.css'

export default function AbsoluteUnits() {
    const [active, setActive] = useState('cm');
    const [expl, setExpl] = useState('centimeters');
    const [fontSize, setFontSize] = useState('1cm')
    let arr = ['cm', 'mm', 'Q', 'in', 'pc', 'pt', 'px'];
    let explanations = [
        'centimeters',
        'millimeters', 
        'quarter-millimeters',
        'inches',
        'picas -- 1/6th of 1in',
        'points -- 1/72th of 1in',
        'pixels -- 1/96th of 1in'
    ]

    let style = {fontSize: `${fontSize}`}
    function changeUnit (e) {
        setFontSize(`1${e.target.innerHTML}`)
        setExpl(explanations[arr.indexOf(e.target.innerHTML)])
        setActive(e.target.innerHTML)
    }
    return (

        <div className="absolute-units">
            <ul>
                {
                    arr.map( (item, index) => {
                        return <li key={index} onClick={changeUnit} className={ active === item ? 'active-unit' : ''}>{item}</li>
                    })
                }
            </ul>
            <div className="unit-explanation">{ expl }</div>
            <div className="unit-guide">
                <div className="inch">1 inch</div>
                <div className="cm">1 centimeter</div>
                <div className="mm">1 millimeters</div>
                <div className="q">1 quarter millimeter</div>
                <div className="pc">1 pica</div>
                <div className="pt">1 point</div>
                <div className="px">1 pixel</div>
            </div>
           <div style={style}>hello world!</div>
        </div>
    )
}
