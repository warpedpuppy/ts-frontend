import React from 'react';
import {Button, Form, Table} from 'react-bootstrap';
import './PlusPlus.css';

export default class PlusPlus extends React.Component {
    state = { revealAnswers: false }
    answerClass = 'plusplus-answer';
    revealAnswers = (e) => {
        e.preventDefault();
        this.setState({revealAnswers: !this.state.revealAnswers})
    }
    onInputHandler = (e) => {
    if (e.target.value === ''){
        e.target.classList.remove('correct');
        e.target.classList.remove('wrong')
    } else if (e.target.value !== e.target.dataset.answer) {
            e.target.classList.remove('correct')
           e.target.classList.add('wrong')
        } else {
            e.target.classList.remove('wrong')
            e.target.classList.add('correct')
        }
    }
    render() {
        const { revealAnswers } = this.state;
        this.answerClass = revealAnswers ? this.answerClass = 'plusplus-answer reveal' : this.answerClass = 'plusplus-answer' ;
        return (
            <div className="plusplus-container">
                <pre>
                    <Table striped bordered >
                        <thead>
                            <tr>
                            <th>&nbsp;</th>
                            <th>what will this log?</th>
                            <th>log</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="3">let i = 0;</td>
                            </tr>
                            <tr>
                                <td >console.log(i++)</td>
                                <td ><Form.Control data-answer="0" onInput={this.onInputHandler} maxLength="1" type="text" /></td>
                                <td className={this.answerClass}><span>0</span></td>
                            </tr>
                            <tr>
                                <td >console.log(i)</td>
                                <td ><Form.Control  data-answer="1" onInput={this.onInputHandler}  maxLength="1" type="text" /></td>
                                <td className={this.answerClass}><span>1</span></td>
                            </tr>
                            <tr>
                                <td >console.log(++i)</td>
                                <td ><Form.Control  data-answer="2" onInput={this.onInputHandler}  maxLength="1"  type="text" /></td>
                                <td className={this.answerClass}><span>2</span></td>
                            </tr>
                            <tr>
                                <td >console.log(i)</td>
                                <td ><Form.Control  data-answer="2" onInput={this.onInputHandler}  maxLength="1"  type="text" /></td>
                                <td className={this.answerClass}><span>2</span></td>
                            </tr>
                            <tr>
                                <td colspan="3"><Button variant="success" onClick={this.revealAnswers}>reveal answers</Button></td>
                            </tr>
                        </tbody>
                    </Table>
        
                </pre>
            </div>
        )
    }
}
