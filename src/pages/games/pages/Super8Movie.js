import React, { Component } from 'react'
import './Super8Movie.css';

export default class Super8Movie extends Component {
    render() {
        return (
            <div>
                <video controls>
                    <source src="https://walthermidcoast.s3.amazonaws.com/rafi_super8.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        )
    }
}
