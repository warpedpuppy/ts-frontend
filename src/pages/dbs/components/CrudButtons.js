import React from 'react'
import Button from 'react-bootstrap/Button';
import './CrudButtons.css';
export default function CrudButtons(props) {
    return (
        <div className="button-group">
            <Button onClick={props.create}>Create</Button>
            <Button variant="success" onClick={props.read}>Read</Button>
            <Button variant="warning" onClick={props.update}>Update</Button>
            <Button variant="danger" onClick={props.delete}>Delete</Button>
        </div>
    )
}
