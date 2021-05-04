import React from 'react'
import Button from 'react-bootstrap/Button';
import './CrudButtons.css';
export default function CrudButtons(props) {
    return (
        <div className="button-group">
            <Button id="create-button" onClick={props.create} disabled={props.disabled}>Create</Button>
            <Button variant="success" onClick={props.read} disabled={props.disabled}>Read</Button>
            <Button variant="warning" onClick={props.update} disabled={props.disabled}>Update</Button>
            <Button variant="danger" onClick={props.delete} disabled={props.disabled}>Delete</Button>
        </div>
    )
}
