import React from 'react'

export default function RBGSlider(props) {
    return (
        <select onChange={(e) => props.changeColor(props.id, e.target.value)}>
        {
            props.arr.map( (item, index) => {
                return <option key={index}>{item}</option>
            })
        }
        </select>
    )
}
