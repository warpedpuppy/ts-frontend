import React from 'react'
import Mutations from './services/mutations';
export default class EditChar extends React.Component {
   

    constructor (props) {
        super(props)
        this.state = {name: ''}
    }
    componentDidMount = () => {
        this.setState({name: this.props.name})
    }
    onChangeHandler = (e) => {
        this.setState({name: e.target.name.value})
    }
    render () {
        return (
            <form onSubmit={ e => {
                e.preventDefault();
                Mutations.updateName(this.props.id, e.target.name.value)
            }}>
                <div>name:{this.state.name} </div>
                <input type="text" name="name" value={this.state.name} onChange={this.onChangeHandler} />
                <input type="submit"></input>
            </form>
        )
    }

}
