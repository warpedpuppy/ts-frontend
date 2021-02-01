import React from 'react'

export default function RBGSlider(props) {
    return (
        <select value={props.color} onChange={(e) => props.changeColor(props.id, e.target.value)}>
        {
            props.arr.map( (item, index) => {
                let selected = item === props.color ? true : false;
                return <option value={item} key={index}>{item}</option>
            })
        }
        </select>
    )
}
