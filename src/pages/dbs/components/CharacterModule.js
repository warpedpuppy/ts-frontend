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
        <div className="character-module" onClick={deleteHandler}>
            <div className="character-module-header" style={colorStyle} >{props.character_name}</div>
            <div className="character-module-background" style={colorStyle}></div>
            <div className="character-module-color">{props.character_color}</div>
            <button style={showButtonStyle} onClick={e => props.changeColor(e, props.id, props.character_name)}>change color?</button>
        </div>
    )
}
