import React from 'react'
export default class EditChar extends React.Component {
   

    updateName = async (e) => {
          e.preventDefault();
          let bool = await this.props.updateCharacter(this.props.id, e.target.name.value, this.props.color) 
          if (bool) {
            let classList = e.target.parentElement.parentElement.classList;
            if (!classList.contains("edit")){classList.add('edit')} else {classList.remove('edit')}
          }
    }
    render () {
        return (
            <form onSubmit={this.updateName}>
                <div>name:{this.props.name} </div>
                <input type="text" name="name" defaultValue={this.props.name} />
                <input type="submit"></input>
            </form>
        )
    }

}
