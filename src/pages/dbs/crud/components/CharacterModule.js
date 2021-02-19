import React from 'react';
import './CharacterModule.css';

export default function CharacterModule(props) {
    let colorStyle = {backgroundColor: props.character_color}
    let showUpdateStyle = { display: props.mode === 'update' ? 'block' : 'none'}
    let showDeleteStyle = { display: props.mode === 'delete' ? 'block' : 'none'}
    function clickHandler (e) {
        e.preventDefault();
        if (props.mode === 'delete') {
            props.deleteHandler(props.id)
        } else if (props.mode === 'update') {
            props.changeColor(e, props.id, props.character_name)
        }
        return;
    }
    return (
        <div className="character-module" onClick={clickHandler}>
            <div className="character-module-header" style={colorStyle} >{props.character_name}</div>
            <div className="character-module-background" style={colorStyle}></div>
            <div className="character-module-color">{props.character_color}</div>
            <div className="character-module-update" style={showUpdateStyle}>update color!</div>
            <div className="character-module-delete" style={showDeleteStyle}>delete!</div>
        </div>
    )
}
