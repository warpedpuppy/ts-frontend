import React from 'react';
import './CharacterModule.css';
import Button from 'react-bootstrap/Button'
export default function CharacterModule(props) {
    let colorStyle = {backgroundColor: props.character_color}
    let showButtonStyle = { display: props.mode === 'update' ? 'block' : 'none'}
    function deleteHandler(e) {
        e.preventDefault();
        if (props.mode === 'delete') {
            props.deleteHandler(props.id)
        }
        return;
    }
    return (
        <div className="character-module" style={colorStyle} onClick={deleteHandler}>
            <ul>
                <li>{props.character_name}</li>
                <li>{props.character_color}</li>
                <li style={showButtonStyle}><Button onClick={e => props.changeColor(e, props.id, props.character_name)}>change color?</Button></li>
            </ul>
        </div>
    )
}
